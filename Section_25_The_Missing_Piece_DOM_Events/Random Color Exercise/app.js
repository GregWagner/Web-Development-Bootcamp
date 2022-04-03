const title = document.querySelector('h1');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  const newColor = randomColor();
  title.innerText = newColor;
  document.body.style.backgroundColor = newColor;
});

function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}
