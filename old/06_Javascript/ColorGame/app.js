let numberOfSquares = 6;
let colors = [];
let pickedColor;

const h1 = document.querySelector("h1");
const messageDisplay = document.querySelector("#message");
const colorDisplay = document.querySelector("#colorDisplay");
const resetButton = document.querySelector("#reset");
const squares = document.querySelectorAll(".square");
const modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupResetButton();
  setupModeButtons();
  setupSquares();
  reset();
}

function setupResetButton() {
  resetButton.addEventListener("click", reset);
}

function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; ++i) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      numberOfSquares = this.textContent === "Easy" ? 3 : 6;
      reset();
    });
  }
}

function setupSquares() {
  for (let i = 0; i < squares.length; ++i) {
    squares[i].addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        resetButton.textContent = "Play Again?";
        h1.style.backgroundColor = pickedColor;
        messageDisplay.textContent = "Correct";
        changeColors(pickedColor);
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  for (let i = 0; i < squares.length; ++i) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
}

function changeColors(color) {
  for (let square of squares) {
    square.style.backgroundColor = color;
  }
}

function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; ++i) {
    arr.push(randomColor());
  }
  return arr;
}
