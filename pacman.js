const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let pacman = { x: 10, y: 10, direction: 'RIGHT' };
let ghosts = [{ x: 5, y: 5 }];
let foodCount = 5;
let score = 0;
let gameOver = false;

function drawGhosts() {
    ctx.fillStyle = 'red';
    ghosts.forEach(ghost => {
        ctx.fillRect(ghost.x * gridSize, ghost.y * gridSize, gridSize, gridSize);
    });
}

function drawPacman() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2, gridSize / 2, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2);
    ctx.fill();
}

function drawFood() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < foodCount; i++) {
        const x = Math.floor(Math.random() * tileCount);
        const y = Math.floor(Math.random() * tileCount);
        ctx.fillRect(x * gridSize, y * gridSize, gridSize / 2, gridSize / 2);
    }
}

function movePacman() {
    if (pacman.direction === 'LEFT') pacman.x--;
    if (pacman.direction === 'RIGHT') pacman.x++;
    if (pacman.direction === 'UP') pacman.y--;
    if (pacman.direction === 'DOWN') pacman.y++;
  
    // Check for game over
    if (pacman.x < 0 || pacman.x >= tileCount || pacman.y < 0 || pacman.y >= tileCount) {
        gameOver = true;
    }
  
    // Check ghost collision
    ghosts.forEach(ghost => {
        if (ghost.x === pacman.x && ghost.y === pacman.y) {
            gameOver = true;
        }
    });
}

function updateGame() {
    if (gameOver) {
        document.getElementById('gameOver').style.display = 'block';
        return;
    }
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePacman();
    drawFood();
    drawPacman();
    drawGhosts();
    requestAnimationFrame(updateGame);
}

//000


// Add event listeners to buttons
document.getElementById('up').addEventListener('click', () => movePacman('up'));
document.getElementById('down').addEventListener('click', () => movePacman('down'));
document.getElementById('left').addEventListener('click', () => movePacman('left'));
document.getElementById('right').addEventListener('click', () => movePacman('right'));



//000

document.addEventListener('keydown', (event) => {
    if (!gameOver) {
        if (event.key === 'ArrowLeft') pacman.direction = 'LEFT';
        if (event.key === 'ArrowRight') pacman.direction = 'RIGHT';
        if (event.key === 'ArrowUp') pacman.direction = 'UP';
        if (event.key === 'ArrowDown') pacman.direction = 'DOWN';
    }
});

function restartGame() {
    pacman = { x: 10, y: 10, direction: 'RIGHT' };
    ghosts = [{ x: 5, y: 5 }];
    foodCount = 5;
    score = 0;
    gameOver = false;
    document.getElementById('gameOver').style.display = 'none';
    updateGame();
}

updateGame();