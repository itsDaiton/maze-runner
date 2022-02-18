let canvas;
let context;
let player;
let maze;
let mazeHeight;
let mazeWidth;
let mazeOffset;

var selectedValue;
var selectedText;
var size;

var timer;
var minutes;
var seconds;
var totalSeconds;

let modalParagraph;

//funkce, která vrací náhodné číslo od 0 po zadaný parametr
function getRandomNumber(range) {
    return Math.floor(Math.random() * range)
}

//funkce, která zajištuje reset časovač a překleslení bludiště v případě nové hry
function refresh() {
    //získáme hodnoty ze selectu obtížnosti
    var e = document.getElementById("maze-select");
    selectedValue = e.options[e.selectedIndex].value;
    selectedText = e.options[e.selectedIndex].text;
    
    //podle toho jakou jsem získali hodnotu, tak velké budou buňky
    switch(selectedText) {
        case "Easy":
            size = 50;
            break;
        case "Medium":
            size = 40;
            break;
        case "Hard":
            size = 30;
            break;
        case "Very Hard":
            size = 25;
            break;
    }
   
    //vytvoření hráče a bludiště
    player = new Player();
    maze = new Maze(selectedValue, selectedValue, size);

    //při restartu hry se restartuje časovač, pokud k tomu již nedošlo
    if(timer != null) {
        window.clearTimeout(timer);
        timer = null;
    }
    
    //reset časovače
    totalSeconds = 0;
    //časovač se znova spustí při začátku hry
    timer = window.setInterval(startTimer, 1000);

    //časovač vypisuje aktuální hodnotu do html elementu
    seconds.innerHTML = pad(totalSeconds % 60);
    minutes.innerHTML = pad(parseInt(totalSeconds/60));
}

//funkce pro pohyb hráče a kolize
function movemenentAndCollisions(e) {
    //pohyb je dovolen pouze, pokud běží timer, tj. v případě, kdy hra není ukončena
    if (timer != null) {
        switch(e.keyCode) {
            //v případě, když hráče zmáčkne "A" nebo "šipku do leva"
            case 37:
            case 65:
                //pokud vlevo není zeď, hráč se posune o jedno políčko doleva, tj. zmenší se mu sloupec o 1
                if (!maze.cells[player.column][player.row].wallLeft) {
                    player.column -= 1;
                }
                break;
            case 38:
            case 87:
                if (!maze.cells[player.column][player.row].wallTop) {
                    player.row -= 1;
                }
                break;
            case 39:
            case 68:
                if (!maze.cells[player.column][player.row].wallRight) {
                    player.column += 1;
                }
                break;
            case 40:
            case 83:
                if (!maze.cells[player.column][player.row].wallBottom) {
                    player.row += 1;
                }
                break;
            default:
                break;
        }
        //při pohybu se kontroluje, jestli hráč již nevyhrál
        maze.checkForVictory();
        //při pohybu se překresluje bludiště a poloha hráče v bludišti
        maze.drawMaze();
    }  
}

//funkce, která přičítá sekundy v časovači a vykresluje aktuální čas do html elementu
function startTimer() {
    ++totalSeconds;
    seconds.innerHTML = pad(totalSeconds % 60);
    minutes.innerHTML = pad(parseInt(totalSeconds/60));
}

//funkce, která v případě, že čas je jednociferný (čísla 0-9), tak k číslu přidá na začátek 0, aby simulovala digitální hodiny
function pad(val)
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
        }
    else
    {
        return valString;
    }
}

//validace formu přes jquery validate knihovnu
function validateForm() {
    $('#form-submit').validate({
        //políčko jméno musí být vyplněné
        rules: {
            name: "required",
        },
        messages: {
            name: "*Tento údaj je povinný.",
        },
        //v případě, že se form validuje, pošle se přes AJAX do souboru "data.php"
        submitHandler: function() {
            $.ajax({
                type: "POST",
                url: "data.php",
                chace: false,
                data: $('form#form-submit').serialize(),
                success: function(response) {
                    $("#formSubmit").html(response)
                    $("#modalForm").modal('hide');         
                },
                error: function() {
                    alert("Error!");
                }    
            });
        }
    });
}

//funkce, která smaže data z inputu v případě, že modal okno zavřeme
function resetInputData() {
    $('#modalForm').on('hidden.bs.modal', function() {
        $(this).find('form').trigger('reset');
    });
}

//funkce, která načítá data ze souboru "data.php", který je uložen na serveru
function loadJSON() {
    var button = document.getElementById("button-scoreboard");
    button.onclick = function() {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                //data jsou ve formátu JSON
                var players = JSON.parse(xhr.response);
                var result = document.getElementById("mod-content");
                result.innerHTML = "";
                if(players.length == 0) {
                    result.innerHTML = "Tabulka her je prázdná."
                }
                else {
                    for (let i = 0; i < (players.length); i++) {
                        //načtená data se pomocí cyklu vypíšou do modal okna
                        result.innerHTML += "🎮 <b>" + players[i].Name + "</b><br>🕒 <b>" + pad(parseInt((players[i].Time)/60)) + ":" + pad(players[i].Time % 60)  + "</b><b><br>⚙️ " + players[i].Difficulty + "<br></b><hr>";
                    }     
                }                    
            }
            else {
                alert("Server error: " + xhr.status);
            }
        }
        //načtení modal okna s výsledky AJAX requestu
        $('#modal-scores').modal('show');     
    }
    xhr.open("GET", "https://eso.vse.cz/~posd03/4IZ268/maze-runner/data/data.json")
    xhr.send();   
    }
}

//funkce, která po stisknutí tlačítka načte nápovědu
function showInfo() {
    var button = document.getElementById("button-help");
    button.onclick = function() {
        $('#modal-info').modal('show');      
    }
}

//všechny funkce se provedeou až po načtení DOMu
$(document).ready(function() {  
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    minutes = document.getElementById("minutes");
    seconds = document.getElementById("seconds");

    modalParagraph = document.getElementById("modal-para");

    document.getElementById("maze-create").addEventListener("click", refresh);
    document.addEventListener("keydown", movemenentAndCollisions);

    refresh();

    resetInputData();

    loadJSON();

    showInfo();
    
    //po kliknutí na tlačítko se provede validace formuláře
    $(function () {
        $('body').on('click', '.button-submit', function (e) {  
            validateForm();    
        });
    });  
});