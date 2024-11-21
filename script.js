const colors = ['#ffcc33', 'purple', '#d6336c', 'blue', 'green'];
const bingoSize = 5;

function generateBingoBoard() {
    const bingoBoard = document.getElementById('bingo-board');
    bingoBoard.innerHTML = '';

    // Initialisiere Arrays für Zeilen- und Spaltenzählung
    const rowColorCounts = Array.from({ length: bingoSize }, () => ({}));
    const colColorCounts = Array.from({ length: bingoSize }, () => ({}));

    for (let i = 0; i < bingoSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < bingoSize; j++) {
            let availableColors = [...colors];

            // Filtere Farben, die die Grenze in der Zeile oder Spalte überschreiten würden
            availableColors = availableColors.filter(
                color =>
                    (rowColorCounts[i][color] || 0) < 2 &&
                    (colColorCounts[j][color] || 0) < 2
            );

            // Wähle eine zufällige Farbe aus den verbleibenden
            const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

            // Aktualisiere die Zählung für Zeile und Spalte
            rowColorCounts[i][randomColor] = (rowColorCounts[i][randomColor] || 0) + 1;
            colColorCounts[j][randomColor] = (colColorCounts[j][randomColor] || 0) + 1;

            // Erstelle die Zelle
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.backgroundColor = randomColor;

             // Speichere die ursprüngliche Farbe als Attribut
            cell.setAttribute('data-original-color', randomColor);
            
             // Klick-Event für das Feld
            cell.addEventListener('click', () => {
                const currentColor = cell.style.backgroundColor;
                if (currentColor === 'gray') {
                    // Wiederherstellen der Originalfarbe
                    cell.style.backgroundColor = cell.getAttribute('data-original-color');
                } else {
                    // Setzen auf grau
                    cell.style.backgroundColor = 'gray';
                }
                checkBingo();
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
