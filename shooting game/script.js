
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameInterval;
let gamePaused = false;
let gameOver = false;

document.getElementById('highScoreBoard').innerText = `High Score: ${highScore}`;

const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 60,
    width: 30,
    height: 30,
    color: 'cyan',
    speed: 6, // Increased player movement speed
};

const bullets = [];
const targets = [];

function startGame() {
    gameOver = false;
    gamePaused = false;
    score = 0;
    updateScore();
    player.x = canvas.width / 2 - 15;
    bullets.length = 0;
    targets.length = 0;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 1000 / 60);
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'inline-block';
    document.getElementById('restartButton').style.display = 'none';
}

function pauseGame() {
    gamePaused = !gamePaused;
    if (gamePaused) {
        clearInterval(gameInterval);
        document.getElementById('restartButton').style.display = 'inline-block';
    } else {
        startGame();
    }
}

function restartGame() {
    gameOver = false;
    gamePaused = false;
    document.getElementById('gameOverText').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'inline-block';
    document.getElementById('restartButton').style.display = 'none';
    startGame();
}

function updateScore() {
    document.getElementById('scoreBoard').innerText = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById('highScoreBoard').innerText = `High Score: ${highScore}`;
    }
}

function gameLoop() {
    if (gamePaused || gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBullets();
    drawTargets();

    updateBullets();
    updateTargets();

    checkCollisions();
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function drawTargets() {
    ctx.fillStyle = 'yellow';
    targets.forEach(target => {
        ctx.fillRect(target.x, target.y, target.width, target.height);
    });
}

function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

function updateTargets() {
    if (Math.random() < 0.02) {
        const size = Math.random() * 30 + 20;
        targets.push({
            x: Math.random() * (canvas.width - size),
            y: -size,
            width: size,
            height: size,
            speed: Math.random() * 1 + 0.2, // Slower target speed
        });
    }

    targets.forEach((target, index) => {
        target.y += target.speed;
        if (target.y > canvas.height) {
            targets.splice(index, 1);
        }
    });
}

function checkCollisions() {
    targets.forEach((target, targetIndex) => {
        if (target.x < player.x + player.width &&
            target.x + target.width > player.x &&
            target.y < player.y + player.height &&
            target.y + target.height > player.y) {
            endGame();
        }
    });

    bullets.forEach((bullet, bulletIndex) => {
        targets.forEach((target, targetIndex) => {
            if (bullet.x < target.x + target.width &&
                bullet.x + bullet.width > target.x &&
                bullet.y < target.y + target.height &&
                bullet.y + bullet.height > target.y) {
                bullets.splice(bulletIndex, 1);
                targets.splice(targetIndex, 1);
                score++;
                updateScore();
            }
        });
    });
}

function endGame() {
    clearInterval(gameInterval);
    gameOver = true;
    ctx.fillStyle = 'red';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'inline-block';
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        player.x -= player.speed;
    }
    if (e.key === 'ArrowRight') {
        player.x += player.speed;
    }
    if (e.key === ' ') {
        bullets.push({
            x: player.x + player.width / 2 - 2.5,
            y: player.y,
            width: 5,
            height: 10,
            speed: 5, // Slower bullet speed
        });
    }
});

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('pauseButton').addEventListener('click', pauseGame);
document.getElementById('restartButton').addEventListener('click', restartGame);

