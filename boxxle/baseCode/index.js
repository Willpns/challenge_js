import { Levels } from './level.js';

const gameboard = document.getElementById('gameboard');
const resetButton = document.getElementById('resetButton');
const nextLevelButton = document.getElementById('nextLevelButton');
const levelIndicator = document.createElement('div'); 

levelIndicator.id = 'level-indicator';
levelIndicator.style.position = 'absolute';
levelIndicator.style.top = '10px';
levelIndicator.style.left = '10px';
levelIndicator.style.fontSize = '20px';
levelIndicator.style.fontWeight = 'bold';
levelIndicator.style.color = '#333';
document.body.appendChild(levelIndicator);

const keys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
};

let currentLevel = 0;
let playerPosition = { x: 0, y: 0 };
let playerDirection = 'down';
let fixedLevel = [];
let dynamicLevel = [];
const levelTransitionDelay = 500; 

function initGame(level) {
    fixedLevel = level.map(row => row.map(cell => (cell === 4 || cell === 1 ? cell : 0)));
    dynamicLevel = level.map(row => row.map(cell => (cell === 2 || cell === 3 ? cell : 0)));
    updateLevelIndicator(); 
    renderGame();
}

function updateLevelIndicator() {
    levelIndicator.textContent = `Level : ${currentLevel + 1}`; 
}

function renderGame() {
    gameboard.innerHTML = '';
    gameboard.style.gridTemplateColumns = `repeat(${fixedLevel[0].length}, 1fr)`;
    gameboard.style.gridTemplateRows = `repeat(${fixedLevel.length}, 1fr)`;

    fixedLevel.forEach((row, y) => {
        row.forEach((fixedCell, x) => {
            const tileContainer = document.createElement('div');
            tileContainer.className = 'tile-container';

            if (fixedCell === 4) {
                const targetTile = document.createElement('div');
                targetTile.className = 'target';
                tileContainer.appendChild(targetTile);
            } else if (fixedCell === 1) {
                const wallTile = document.createElement('div');
                wallTile.className = 'wall';
                tileContainer.appendChild(wallTile);
            }

            const dynamicCell = dynamicLevel[y][x];
            if (dynamicCell !== 0) {
                const mainTile = document.createElement('div');
                mainTile.className = getClassName(dynamicCell, fixedCell);
                tileContainer.appendChild(mainTile);

                if (dynamicCell === 3) playerPosition = { x, y };
            }

            gameboard.appendChild(tileContainer);
        });
    });
}

function getClassName(dynamicCell, fixedCell) {
    if (dynamicCell === 2 && fixedCell === 4) {
        return 'box-on-target';
    }
    if (dynamicCell === 3) { 
        return `player player-${playerDirection}`;
    }
    if (dynamicCell === 2) {
        return 'box';
    }
    return '';
}

function movePlayer(direction) {
    const { x, y } = playerPosition;
    let targetX = x;
    let targetY = y;

    if (direction === 'up') targetY--;
    if (direction === 'down') targetY++;
    if (direction === 'left') targetX--;
    if (direction === 'right') targetX++;

    if (canMoveTo(targetX, targetY)) {
        playerDirection = direction;

        if (dynamicLevel[targetY][targetX] === 2) {
            const pushX = targetX + (targetX - x);
            const pushY = targetY + (targetY - y);

            if (canMoveTo(pushX, pushY, true)) {
                dynamicLevel[targetY][targetX] = 0;
                dynamicLevel[pushY][pushX] = 2;
            } else {
                return;
            }
        }

        dynamicLevel[y][x] = 0;
        dynamicLevel[targetY][targetX] = 3;
        playerPosition = { x: targetX, y: targetY };

        renderGame();

        if (isLevelComplete()) {
            setTimeout(goToNextLevel, levelTransitionDelay); 
        }
    }
}

function canMoveTo(x, y, isBoxPush = false) {
    if (x < 0 || y < 0 || y >= fixedLevel.length || x >= fixedLevel[0].length) {
        return false;
    }

    const fixedCell = fixedLevel[y][x];
    const dynamicCell = dynamicLevel[y][x];

    if (fixedCell === 1) {
        return false;
    }

    if (dynamicCell === 2) {
        if (!isBoxPush) {
            const pushX = x + (x - playerPosition.x);
            const pushY = y + (y - playerPosition.y);
            return canMoveTo(pushX, pushY, true);
        }
        return false;
    }

    return true;
}

function isLevelComplete() {
    for (let y = 0; y < fixedLevel.length; y++) {
        for (let x = 0; x < fixedLevel[y].length; x++) {
            if (fixedLevel[y][x] === 4 && dynamicLevel[y][x] !== 2) {
                return false; 
            }
        }
    }
    return true; 
}

function goToNextLevel() {
    currentLevel++;
    if (currentLevel >= Levels.length) {
        alert('Félicitations ! Vous avez terminé tous les niveaux !');
        currentLevel = 0; 
    }
    initGame(Levels[currentLevel]);
}

function resetLevel() {
    initGame(Levels[currentLevel]);
}

resetButton.addEventListener('click', resetLevel);
nextLevelButton.addEventListener('click', goToNextLevel);

document.addEventListener('keydown', (event) => {
    const direction = keys[event.keyCode];
    if (direction) {
        movePlayer(direction);
    }
});

initGame(Levels[currentLevel]);