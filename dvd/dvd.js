let posX = 100; 
let posY = 100; 
let velocityX = 1; 
let velocityY = 1; 
const dvdElement = document.getElementById("dvd"); 

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function moov() {
    const screenWidth = window.innerWidth; 
    const screenHeight = window.innerHeight;

    posX += velocityX;
    posY += velocityY;

    if (posX + 300 >= screenWidth || posX <= 0) {
        velocityX *= -1; 
        dvdElement.style.fill = getRandomColor(); 
    }
    if (posY + 200 >= screenHeight || posY <= -85) {
        velocityY *= -1; 
        dvdElement.style.fill = getRandomColor(); 
    }

    dvdElement.style.left = posX + "px";
    dvdElement.style.top = posY + "px";

    requestAnimationFrame(moov);
}

document.addEventListener("DOMContentLoaded", () => {
    dvdElement.style.position = "absolute";
    moov();
});