### Objectives
In this project you will create a browser-based puzzle game.

### Getting started
You will need to create a public repository with the name `boxxle`.
You can find a very very basic, <a href="https://drive.google.com/file/d/1ootsYGHMz-KbK_ZJldk-i1__M3oAYPFX/view?usp=sharing" download> html </a>, <a href="https://drive.google.com/file/d/1k42Zsl7VpDnne5zaYnL3L0uKHe5KtX7R/view?usp=sharing" download> index.js </a>, <a href="https://drive.google.com/file/d/1-ClHs7YETMasE1rlsWhoRNY5M_tOwoaT/view?usp=sharing" download> level.js </a> and <a href="https://drive.google.com/file/d/1EB6C3hi_9VXlnLepytbi2LIbrNdhz6O-/view?usp=drive_link" download> the css file </a> to start with if you want, you can also start from zero.

You will find a <a href="https://drive.google.com/file/d/1k42Zsl7VpDnne5zaYnL3L0uKHe5KtX7R/view?usp=sharing" download> levels.js </a> file, all your map generation will be based on this file.

It contain multidimensional array that represent levels.
All number have signification :

- 0 = Empty
- 1 = Wall
- 2 = Box
- 3 = Player
- 4 = Where box must be to complete the level

### Core features
- You will use a `requestAnimationFrame` recursive loop.
- You must use a `CSS grid` to implement the game.
- An HTML element representing a box to move, must be created or moved each time it is in colision with player.
- HTML elements are created each time a level is generated.
- When an arrow key is pressed, the player must move.
- Player and Box cant go through wall and box.
- Game cant start if there is no Boxer in the level.
- When a box is on a correct position, element must change color.
- You must do a reset button that allow player to restart the level.  

### Bonuses
- Let the user choose which controls he wants to set.
- Implement animation for the Boxxer
- Different sounds can be added to enhance the game
- A step counter to see how many step you do to complete a level.
- Whatever settings you want to implement before the start of the game (volume,color, etc)


### Notions
- [Grid css](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Tuto animation JS with requestAnimationFrame](https://grafikart.fr/tutoriels/animation-requestanimationframe-764)
- [How to make a game loop](https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe)
- [MDN - requestAnimationFrame](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame)
- [Deep-Copy](https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig) (Take time to understand)

### Demo

![boxxle](https://user-images.githubusercontent.com/43090824/221142099-1eee9a6c-50ae-4146-ac95-a71178e8a667.gif)

Have fun and good luck.
