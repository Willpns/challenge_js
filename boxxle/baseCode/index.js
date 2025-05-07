import { Levels } from './level.js';

const gameboard = document.getElementById('gameboard');
const keys = {
    37: 'left',  // Flèche gauche
    38: 'up',    // Flèche haut
    39: 'right', // Flèche droite
    40: 'down',  // Flèche bas
};
let currentLevel = 0;
let playerPosition = { x: 0, y: 0 };
let playerDirection = 'down';

function initGame(level) {
    gameboard.innerHTML = ''; 
    gameboard.style.gridTemplateColumns = `repeat(${level[0].length}, 1fr)`;
    gameboard.style.gridTemplateRows = `repeat(${level.length}, 1fr)`;

    level.forEach((row, y) => {
        row.forEach((cell, x) => {
            const tileContainer = document.createElement('div');
            tileContainer.className = 'tile-container';

            if (Levels[currentLevel][y][x] === 4) {
                const targetTile = document.createElement('div');
                targetTile.className = 'target';
                tileContainer.appendChild(targetTile);
            }

            const mainTile = document.createElement('div');
            mainTile.className = getClassName(cell, x, y);
            tileContainer.appendChild(mainTile);

            gameboard.appendChild(tileContainer);

            if (cell === 3) playerPosition = { x, y };
        });
    });
}

function getClassName(value, x, y) {
    if (value === 2 && Levels[currentLevel][y][x] === 4) {
        return 'box-on-target'; 
    }
    if (value === 3 && Levels[currentLevel][y][x] === 4) {
        return `player player-${playerDirection} player-on-target`; 
    }
    if (value === 3) {
        return `player player-${playerDirection}`; 
    }
    switch (value) {
        case 0: return 'empty'; 
        case 1: return 'wall';  
        case 2: return 'box';   
        default: return '';
    }
}

function movePlayer(direction) {
    const level = Levels[currentLevel];
    const { x, y } = playerPosition;
    let targetX = x;
    let targetY = y;

    if (direction === 'up') targetY--;
    if (direction === 'down') targetY++;
    if (direction === 'left') targetX--;
    if (direction === 'right') targetX++;

    if (canMoveTo(level, targetX, targetY)) {
        playerDirection = direction;

        if (level[targetY][targetX] === 2) {
            const pushX = targetX + (targetX - x);
            const pushY = targetY + (targetY - y);

            if (canMoveTo(level, pushX, pushY, true)) {
                level[targetY][targetX] = Levels[currentLevel][targetY][targetX] === 4 ? 4 : 0; 
                level[pushY][pushX] = 2; 
            } else {
                return; 
            }
        }

        level[y][x] = Levels[currentLevel][y][x] === 4 ? 4 : 0; 
        level[targetY][targetX] = 3; 
        playerPosition = { x: targetX, y: targetY };

        initGame(level);
    }
}

function canMoveTo(level, x, y, isBoxPush = false) {
    if (x < 0 || y < 0 || y >= level.length || x >= level[0].length) return false;
    const tile = level[y][x];

    if (tile === 0 || tile === 4) return true;

    if (tile === 2 && !isBoxPush) return true;

    return false;
}

document.addEventListener('keydown', (event) => {
    const direction = keys[event.keyCode];
    if (direction) {
        movePlayer(direction);
    }
});

initGame(Levels[currentLevel]);