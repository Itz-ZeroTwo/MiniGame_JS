const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const difficultySelect = document.getElementById('difficulty');
const message = document.getElementById('message');

let box1Color = 'green';
let gameInterval;
let difficultySpeeds = {
    easy: 3000,
    medium: 2000,
    hard: 1000,
    extreme: 500
};
let moveStep = 20;  // Movement step size
let gameRunning = false;

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);
document.addEventListener('keydown', moveBox2);

function startGame() {
    if (gameRunning) return;

    gameRunning = true;
    startBtn.textContent = 'Pause';
    let difficulty = difficultySpeeds[difficultySelect.value];

    gameInterval = setInterval(() => {
        toggleBox1Color();
    }, difficulty);
}

function toggleBox1Color() {
    if (box1Color === 'green') {
        box1Color = 'red';
        box1.style.backgroundColor = 'red';
    } else {
        box1Color = 'green';
        box1.style.backgroundColor = 'green';
    }
}

function moveBox2(e) {
    if (!gameRunning) return;

    if (e.key === 'ArrowRight' && box1Color === 'green') {
        let newLeft = box2.offsetLeft + moveStep;
        if (newLeft + box2.offsetWidth <= box1.offsetLeft) {
            box2.style.left = `${newLeft}px`;
        }

        // Check win condition
        if (box2.offsetLeft + box2.offsetWidth >= box1.offsetLeft) {
            gameWon();
        }
    } else if (box1Color === 'red') {
        gameLost();
    }
}

function gameWon() {
    gameRunning = false;
    clearInterval(gameInterval);
    message.textContent = 'You Won!';
    message.classList.add('win-animation');
}

function gameLost() {
    gameRunning = false;
    clearInterval(gameInterval);
    message.textContent = 'Game Over!';
    message.classList.add('lose-animation');
}

function resetGame() {
    clearInterval(gameInterval);
    box2.style.left = '10px';  // Reset to the left corner
    box1.style.backgroundColor = 'green';
    box1Color = 'green';
    message.textContent = '';
    message.classList.remove('win-animation', 'lose-animation');
    gameRunning = false;
    startBtn.textContent = 'Start';
}
