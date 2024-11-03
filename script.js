const colors = ["yellow", "purple", "pink", "blue", "green"];

function generateBingoBoard() {
    const board = [];
    const usedColors = Array.from({ length: 5 }, () => Array(5).fill(0));

    for (let i = 0; i < 5; i++) {
        board[i] = [];
        for (let j = 0; j < 5; j++) {
            let color;
            do {
                color = colors[Math.floor(Math.random() * colors.length)];
            } while (usedColors[i].filter(c => c === color).length >= 2 || 
                     usedColors.map(row => row[j]).filter(c => c === color).length >= 2);
            
            board[i][j] = color;
            usedColors[i][j] = color;
        }
    }
    
    return board;
}

function renderBingoBoard() {
    const board = generateBingoBoard();
    const bingoBoardDiv = document.getElementById("bingo-board");
    bingoBoardDiv.innerHTML = ""; // Clear previous content

    for (let i = 0; i < 5; i++) {
        const row = document.createElement("div");
        row.className = "row"; // Optional: Add a class for styling
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.className = "cell"; // Optional: Add a class for styling
            cell.style.backgroundColor = board[i][j];
            
            // Event Listener für den Klick
            cell.addEventListener("click", () => {
                cell.style.backgroundColor = "gray"; // Setzt die Hintergrundfarbe auf grau
            });

            row.appendChild(cell);
        }
        bingoBoardDiv.appendChild(row);
    }
}

// Call renderBingoBoard to display the Bingo board on page load
window.onload = renderBingoBoard;
