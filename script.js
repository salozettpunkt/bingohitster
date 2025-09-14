const colors = ['#ffcc33', 'purple', '#d6336c', 'blue', 'green'];
const bingoSize = 5;

function generateBingoBoard() {
    const bingoBoard = document.getElementById('bingo-board');
    bingoBoard.innerHTML = '';

    // 1. Erstelle eine Liste mit exakt 5 Kopien von jeder Farbe
    let colorPool = [];
    colors.forEach(color => {
        for (let i = 0; i < 5; i++) {
            colorPool.push(color);
        }
    });

    // 2. Mische die Liste (Fisher-Yates Shuffle)
    for (let i = colorPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colorPool[i], colorPool[j]] = [colorPool[j], colorPool[i]];
    }

    // 3. Befülle das Bingo-Board mit den Farben
    let index = 0;
    for (let i = 0; i < bingoSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < bingoSize; j++) {
            const randomColor = colorPool[index];
            index++;

            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.backgroundColor = randomColor;

            // Speichere Originalfarbe
            cell.setAttribute('data-original-color', randomColor);

            // Klick-Event
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

// Starte das Bingo-Board beim Laden der Seite
window.onload = generateBingoBoard;

