const colors = ['#ffcc33', 'purple', '#d6336c', 'blue', 'green'];
const bingoSize = 5;

function generateBingoBoard() {
    const bingoBoard = document.getElementById('bingo-board');
    bingoBoard.innerHTML = '';

    for (let i = 0; i < bingoSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < bingoSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Setze eine zufällige Hintergrundfarbe
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            cell.style.backgroundColor = randomColor;

            // Klick-Event für das Feld
            cell.addEventListener('click', () => {
                cell.style.backgroundColor = 'gray'; // Klicke, um es grau zu machen
                checkBingo(); // Überprüfen, ob ein Bingo erzielt wurde
            });

            row.appendChild(cell);
        }
        bingoBoard.appendChild(row);
    }
}

function checkBingo() {
    const bingoBoard = document.getElementById('bingo-board').children;
    let bingo = false;

    // Überprüfen von Reihen
    for (let i = 0; i < bingoSize; i++) {
        let rowBingo = true;
        for (let j = 0; j < bingoSize; j++) {
            if (bingoBoard[i].children[j].style.backgroundColor !== 'gray') {
                rowBingo = false;
                break;
            }
        }
        if (rowBingo) bingo = true;
    }

    // Überprüfen von Spalten
    for (let j = 0; j < bingoSize; j++) {
        let colBingo = true;
        for (let i = 0; i < bingoSize; i++) {
            if (bingoBoard[i].children[j].style.backgroundColor !== 'gray') {
                colBingo = false;
                break;
            }
        }
        if (colBingo) bingo = true;
    }

    // Überprüfen der Diagonalen
    let diag1Bingo = true;
    let diag2Bingo = true;
    for (let i = 0; i < bingoSize; i++) {
        if (bingoBoard[i].children[i].style.backgroundColor !== 'gray') {
            diag1Bingo = false;
        }
        if (bingoBoard[i].children[bingoSize - i - 1].style.backgroundColor !== 'gray') {
            diag2Bingo = false;
        }
    }
    if (diag1Bingo || diag2Bingo) bingo = true;

    // Zeige Bingo-Nachricht, wenn Bingo erzielt wurde
    if (bingo) {
        document.getElementById('bingo-message').style.display = 'block';
    }
}

// Bingo-Board erzeugen
generateBingoBoard();
