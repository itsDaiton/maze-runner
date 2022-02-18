class Cell {
    constructor(column, row) {
        //sloupec a řádek na kterém bude umístěna buňka
        this.column = column;
        this.row = row;

        //skutečnosti, jestli buňka má nebo již nemá stěny
        this.wallTop = true;
        this.wallRight = true;
        this.wallBottom = true;
        this.wallLeft = true; 

        //skutečnost, jestli byla buňka v algoritmu již navštívena
        this.visited = false;
    }
}