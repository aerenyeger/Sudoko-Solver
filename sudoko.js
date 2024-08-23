document.getElementById('reset-button').addEventListener('click', onClick);

// Generate the Sudoku grid
const grid = document.getElementById('sudoku-grid');

function onClick(){
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.querySelector(`.cell-${row}-${col}`).value = '';
        }
    }
}

    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.classList.add(`cell-${row}-${col}`);
            td.appendChild(input);
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }

// Solve button functionality
document.getElementById('solve-button').addEventListener('click', () => {
    const board = getBoard();
    if (solveSudoku(board)) {
        fillBoard(board);
    } else {
        alert('No solution exists!');
    }
});

// Get the current state of the board
function getBoard() {
    const board = [];
    for (let row = 0; row < 9; row++) {
        const boardRow = [];
        for (let col = 0; col < 9; col++) {
            const cellValue = document.querySelector(`.cell-${row}-${col}`).value;
            boardRow.push(cellValue === '' ? 0 : parseInt(cellValue, 10));
        }
        board.push(boardRow);
    }
    return board;
}

// Fill the board with the solution
function fillBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.querySelector(`.cell-${row}-${col}`).value = board[row][col] === 0 ? '' : board[row][col];
        }
    }
}

// Check if placing a number is safe
function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num || board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
            return false;
        }
    }
    return true;
}

// Solve the Sudoku using backtracking
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
