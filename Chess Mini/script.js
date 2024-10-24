const board = document.getElementById('chessBoard');
const pieces = {
    white: {
        king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙'
    },
    black: {
        king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟'
    }
};

const initialBoardSetup = [
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    [], [], [], [],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
];

// Generate board
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const square = document.createElement('div');
        const isLight = (i + j) % 2 === 0;
        square.classList.add(isLight ? 'light' : 'dark');
        
        if (i < 2 || i > 5) {
            const pieceColor = i < 2 ? 'white' : 'black';
            const pieceType = initialBoardSetup[i][j];
            const piece = document.createElement('span');
            piece.innerHTML = pieces[pieceColor][pieceType];
            piece.classList.add('piece');
            square.appendChild(piece);
        }
        
        board.appendChild(square);
    }
}
