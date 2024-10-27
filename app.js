const chessboard = document.getElementById('chessboard');

//  the initial board state with pieces using chess notation

const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

//  chess pieces
const pieceSymbols = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

let selectedPiece = null;
let selectedSquare = null;

// Create the chessboard grid
function createChessBoard() {
    chessboard.innerHTML = '';  // Clear the previous board
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
            square.dataset.row = row;
            square.dataset.col = col;

            const piece = initialBoard[row][col];
            if (piece) {
                const pieceElement = document.createElement('span');
                pieceElement.classList.add('piece');
                pieceElement.textContent = pieceSymbols[piece];
                square.appendChild(pieceElement);
            }

            square.addEventListener('click', () => onSquareClick(square));
            chessboard.appendChild(square);
        }
    }
}

// Handle square clicks (piece selection and movement)
function onSquareClick(square) {
    const row = square.dataset.row;
    const col = square.dataset.col;
    const clickedPiece = initialBoard[row][col];

    if (selectedPiece) {
        movePiece(row, col);
    } else if (clickedPiece) {
        selectPiece(square, clickedPiece);
    }
}

// Select a piece to move
function selectPiece(square, piece) {
    selectedPiece = piece;
    selectedSquare = square;
    square.classList.add('selected');  // Highlight the selected square
}

// Move a selected piece to a new square
function movePiece(targetRow, targetCol) {
    const fromRow = selectedSquare.dataset.row;
    const fromCol = selectedSquare.dataset.col;

    // Update the board state
    initialBoard[targetRow][targetCol] = selectedPiece;
    initialBoard[fromRow][fromCol] = '';

    // Reset selection
    selectedPiece = null;
    selectedSquare.classList.remove('selected');
    selectedSquare = null;

    createChessBoard();  // Re-render the board after the move
}

// Initialize the game
createChessBoard();
