const allImages = document.getElementsByTagName('img');
const squareImages = document.getElementsByClassName('square');
const links = document.querySelectorAll('p a');

for (let img of allImages) {
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Silky_bantam.jpg/440px-Silky_bantam.jpg'
}

for (let img of squareImages) {
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Silky_bantam.jpg/440px-Silky_bantam.jpg';
}

for (let link of links) {
    console.log(link.href)
}