const imageSection = document.querySelector('.gallery');

imageSection.addEventListener('click', () => {
    if (imageSection.style.flexDirection === 'row-reverse') {
        imageSection.style.flexDirection = 'row';
    } else {
        imageSection.style.flexDirection = 'row-reverse';
    }
});