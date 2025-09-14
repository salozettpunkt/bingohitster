const colors = ['#ffcc33', 'purple', '#d6336c', 'blue', 'green'];
const bingoSize = 5;

function generateBingoBoard() {
    const bingoBoard = document.getElementById('bingo-board');
    bingoBoard.innerHTML = '';

    let board = [];
    let success = false;

    while (!success) {
        success = true;
        board = Array.from({ length: bingoSize }, () => Array(bingoSize).fill(null));

        // Pool mit 5 Kopien jeder Farbe
        let colorPool = [];
        colors.forEach(color => {
            for (let i = 0; i < 5; i++) {
                colorPool.push(color);
            }
        });

        // Versuche, Board zu füllen
        for (let i = 0; i < bingoSize; i++) {
            for (let j = 0; j < bingoSize; j++) {
                let possibleColors = shuffle([...new Set(colorPool)]).filter(color => {
                    return (
                        countInRow(board, i, color) < 2 &&
                        countInCol(board, j, color) < 2 &&
                        colorPool.includes(color)
                    );
                });

                if (possibleColors.length === 0) {
                    success = false;
                    break;
                }

                const chosen = possibleColors[Math.floor(Math.random() * possibleColors.length)];
                board[i][j] = chosen;
                colorPool.splice(colorPool.indexOf(chosen), 1);
            }
            if (!success) break;
        }
    }

    // Render Board
    for (let i = 0; i < bingoSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < bingoSize; j++) {
            const color = board[i][j];
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.backgroundColor = color;
            cell.setAttribute('data-original-color', color);

            cell.addEventListener('click', () => {
                const currentColor = cell.style.backgroundColor;
                if (currentColor === 'gray') {
                    cell.style.backgroundColor = cell.getAttribute('data-original-color');
                } else {
                    cell.style.backgroundColor = 'gray';
                }
                checkBingo();
            });

            row.appendChild(cell);
        }
        bingoBoard.appendChild(row);
    }
}

// Hilfsfunktionen
function countInRow(board, row, color) {
    return board[row].filter(c => c === color).length;
}

function countInCol(board, col, color) {
    return board.map(r => r[col]).filter(c => c === color).length;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.onload = generateBingoBoard;

