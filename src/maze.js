class Maze {
    constructor(columns, rows, cellSize) {
        //počet sloupců a řádků, tj. velikost celého bludiště
        this.columns = columns;
        this.rows = rows;
        //velikost buňky
        this.cellSize = cellSize; 
        this.finishColor = "crimson";
        this.backgroundColor = "#DCDCDC";

        //pole, do kterého se budou přidávat buňky
        this.cells = [];

        //metoda, která obsahuje implementaci algoritmu "Depth-first search" zdroj:https://en.wikipedia.org/wiki/Maze_generation_algorithm
        this.createMaze();   
    }

    createMaze() {
        mazeHeight = this.cellSize * this.rows;
        mazeWidth = this.cellSize * this.columns;
        mazeOffset = 10;

        //nakreslení canvas podle velikosti bludiště
        canvas.height = mazeHeight + (mazeOffset * 2);
        canvas.width = mazeWidth + (mazeOffset * 2);
        canvas.style.height = mazeHeight + (mazeOffset * 2);
        canvas.style.width = mazeWidth + (mazeOffset * 2);

        //naplnění pole s buňkami
        for (let i = 0; i < this.columns; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.rows; j++) {
                //pole naplníme instancemi třídy Cell, tj. buňkami
                this.cells[i][j] = new Cell(i, j);
            }
        }

        //--- Algoritmus rekurzivní implementace (DEPTH FIRST SEARCH) ---

        //deklerace zásobníku
        let stack = [];

        //1. část algoritmu - vybereme náhodnou buňku, kterou pak vložíme do zásobníku
        let randomColumn = getRandomNumber(this.columns);
        let randomRow = getRandomNumber(this.rows);

        //vložení náhodné buňky do zásobníku
        stack.push(this.cells[randomColumn][randomRow]);

        //konkrétní buňka v cyklu algoritmu
        let currentCell;
        //buňka, která bude do algoritmu vybráná jako další
        let nextCell;
        //soused buňky u kterého bude rušit stěnu
        let neighbour;
        //jeden ze 4 sousedů
        let option;

        while(this.hasAnyUnvisitedCells(this.cells)) {
            //jako současnou buňku nastavíme poslední prvek v zásobníku (metoda LIFO)
            currentCell = stack[stack.length - 1];
            //2. část algoritmu - nastavíme vybranou buňku jako navštívenou
            currentCell.visited = true;

            //3. část alogoritmu - vybereme jednoho z nenavštívených sousedů, zrušíme u něj zeď a posuneme se na toho daného souseda a opakujeme, dokud všechy buňky nebyly navštívené  
            if(this.hasAnyUnvisitedNeighbours(currentCell)) {
                nextCell = null; //v případě, že buňka má nenavštívené sousedy, není potřeba vybírat následující buňku
                neighbour = false; //zatím nastavíme u promněnné false, protože jsem ještě nevybrali souseda, u kterého zrušíme stěnu
                do {
                    option = getRandomNumber(4); //vybereme náhodně jednoho ze 4 sousedů
                    switch(option) {
                        case 0:
                            //podmínka, které kontroluje jestli nebyla horní buňka navštívena
                            if(currentCell.row !== 0 && !this.cells[currentCell.column][currentCell.row - 1].visited) {
                                //pokud navšívena nebyla, tak zrušíme zdi u obou buňek a přesuneme se na danou buňku a nastavíme proměnnou "neighbour" na true, protože jsem vybrali souseda
                                currentCell.wallTop = false;
                                nextCell = this.cells[currentCell.column][currentCell.row - 1];
                                nextCell.wallBottom = false;
                                neighbour = true;
                            }
                            break;
                        case 1:
                            if(currentCell.column !== (this.columns - 1) && !this.cells[currentCell.column + 1][currentCell.row].visited) {
                                currentCell.wallRight = false;
                                nextCell = this.cells[currentCell.column + 1][currentCell.row];
                                nextCell.wallLeft = false;
                                neighbour = true;
                            }
                            break;
                        case 2:
                            if(currentCell.row !== (this.rows - 1) && !this.cells[currentCell.column][currentCell.row + 1].visited) {
                                currentCell.wallBottom = false;
                                nextCell = this.cells[currentCell.column][currentCell.row + 1];
                                nextCell.wallTop = false;
                                neighbour = true;
                            }
                            break;
                        case 3:
                            if(currentCell.column !== 0 && !this.cells[currentCell.column - 1][currentCell.row].visited) {
                                currentCell.wallLeft = false;
                                nextCell = this.cells[currentCell.column - 1][currentCell.row];
                                nextCell.wallRight = false;
                                neighbour = true;
                            }
                            break;
                    }
                    //v případě, že jsem vybrali souseda pro zrušení zdí, do zásobníku přídáme toho daného souseda, tj. další buňku 
                    if(neighbour) {
                        stack.push(nextCell);
                    }
                //v případě, že jsem našli nenavštíveného souseda, tak cyklus ukončíme    
                } while(!neighbour)
            }
            //pokud už buňka nemá sousedy, které by mohla navštívit, odstraníme ji ze zásobníku
            else {
                currentCell = stack.pop();
            }
        }

        //metoda, která se stará o vykreslování veškeré grafiky na canvas
        this.drawMaze();
    }

    //metoda, která kontroluje, jestli při vykreslování bludiště existuje nějaká buňka, která je zatím nenavštívená
    //v případě, že jsou všechny buňky navštívené, algoritmus končí a bludiště je vygenerováno
    hasAnyUnvisitedCells() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                if(!this.cells[i][j].visited) {
                    return true;
                }
            }
        }
    }

    //metoda, která kontroluje, jestli má dáná buňka nějaké nenavštívené sousedy
    //v případě, že nemá, odstraníme ji ze zásobníku a pokračujeme v algoritmu na další buňku
    hasAnyUnvisitedNeighbours(cell) {
        return ((cell.column !== 0 && !this.cells[cell.column - 1][cell.row].visited) || //kontrola jestli má buňka levého souseda a zároveň není navštívený
            (cell.column !== (this.columns - 1) && !this.cells[cell.column + 1][cell.row].visited) || //kontrola, jestli má buňka pravého souseda a zároveň není navštívený
            (cell.row !== 0 && !this.cells[cell.column][cell.row - 1].visited) || //kontrola, jestli má buňka horního souseda a zároveň není navštívený
            (cell.row !== (this.rows - 1) && !this.cells[cell.column][cell.row + 1].visited)); //kontrola jestli má buňka dolního souseda a zároveň není navštívený
    }

    drawMaze() { 
        //pozadí bludšitě
        context.fillStyle = this.backgroundColor;
        context.fillRect(mazeOffset, mazeOffset, mazeHeight, mazeWidth);

        //vykreslení cíle bludiště   
        context.fillStyle = this.finishColor;
        context.fillRect(mazeOffset + (((this.columns - 1) * this.cellSize) + 4), mazeOffset + (((this.rows - 1) * this.cellSize) + 4), this.cellSize - 8, this.cellSize - 8);  
          
        //vykreslování bludšitě podle získaných dat z algoritmu
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                //vykreslení všech pravých zdí               
                if (this.cells[i][j].wallRight) {
                    context.beginPath();
                    context.moveTo(mazeOffset + ((i + 1) * this.cellSize), mazeOffset + (j * this.cellSize));
                    context.lineTo(mazeOffset + ((i + 1) * this.cellSize), mazeOffset + ((j + 1) * this.cellSize));
                    context.stroke();      
                }
                //vykreslení všech dolních zdí         
                if (this.cells[i][j].wallBottom) {
                    context.beginPath();
                    context.moveTo(mazeOffset + (i * this.cellSize), mazeOffset + ((j + 1) * this.cellSize));
                    context.lineTo(mazeOffset + ((i + 1) * this.cellSize), mazeOffset + ((j + 1) * this.cellSize));
                    context.stroke();
                }
                //vykreslení všech levých zdí 
                if (this.cells[i][j].wallLeft) {
                    context.beginPath();
                    context.moveTo(mazeOffset + (i * this.cellSize), mazeOffset + (j * this.cellSize));
                    context.lineTo(mazeOffset + (i * this.cellSize), mazeOffset + ((j + 1) * this.cellSize));
                    context.stroke();
                }    
                //vykreslení všech horních zdí          
                if (this.cells[i][j].wallTop) {
                    context.beginPath();
                    context.moveTo(mazeOffset + (i * this.cellSize), mazeOffset + (j * this.cellSize));
                    context.lineTo(mazeOffset + ((i + 1) * this.cellSize), mazeOffset + (j * this.cellSize));
                    context.stroke();
                }             
            }
        }      
           
        //update pozice hráče podle toho, na jakém sloupci a řádku se nachází
        //tato metoda se volá při pohybu po bludišti
        context.fillStyle = player.color;
        context.fillRect(mazeOffset + ((player.column * this.cellSize) + 4), mazeOffset + ((player.row * this.cellSize) + 4), this.cellSize - 8, this.cellSize - 8);   
    }

    //metoda, která kontroluje, jestli hráč nevyhrál
    checkForVictory() {
        //podmínka, která kontroluje, jestli se hráč nenachází v pravém dolním rohu, tj. v cíli
        if(player.column == this.columns - 1 && player.row == this.rows - 1) {
            //v případě výhry se časovač stopne a resetuje
            window.clearTimeout(timer);
            timer = null;

            modalParagraph.innerHTML = "Úspěšně si dokončil/a bludiště!<br/>⚙️ <b>" + selectedText + "</b><br/>🕒 <b>" + minutes.innerHTML + ":" + seconds.innerHTML + "</b>";
            modalParagraph.innerHTML += "<br/><br/>Ulož si svůj čas a porovnej si ho s ostatními hráči.<br>Stačí jen vyplnit svoje uživatelské jméno!"

            //do hidden inputů se nastaví data, která se posílají na server

            $("#difficulty").val(selectedText);
            $("#time").val(totalSeconds);

            //zobrazení okna, kde má uživatel na výběr uložit svůj čas nebo odejít
            $('#modalForm').modal('show');
        }
    }
}