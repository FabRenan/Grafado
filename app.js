
var height = 6; //Quantidade de tentativas
var width = 5; //Quantidade de letras de cada palavra

var row = 0; //tentativa atual (palavra X)
var col = 0;

var gameOver = false;
var lista = ['POSTE', 'CASCA', 'ROLHA', 'SAGAZ', 'NOBRE', 'VIGOR', 'IDEIA', 'PODER', 'MORAL', 'JUSTO', 'ANEXO'];
var word = lista[Math.ceil(Math.random() * (lista.length - 1))];
//var word = '(listaa)'; //palavra


window.onload = function(){
    intialize();
}


function intialize() {

    // Fazendo o corpo do jogo
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // teste    <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }


    document.addEventListener("keyup", (e) => {
        if (gameOver) return; 

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
            row += 1; //comecar nova linha
            col = 0; //nova linha sem nada
        }


        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }

    })
}


function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //está na posição correta?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        } //está na palavra?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        } //não está na palavra
        else {
            currTile.classList.add("absent");
        }

        if (correct == width) {
            gameOver = true;
        }

    }
}