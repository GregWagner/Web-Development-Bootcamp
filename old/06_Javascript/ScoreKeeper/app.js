let p1Score = 0;
let p2Score = 0;
let winningScore = 5;
let gameOver = false;

const h1 = document.querySelector("h1");
const p1display = h1.querySelector("#p1display");
const p2display = h1.querySelector("#p2display");
const winningScoreDisplay = document.querySelector("#playTo");

const numInput = document.querySelector("input");
numInput.addEventListener("change", function () {
  reset();
  winningScore = Number(this.value);
  winningScoreDisplay.textContent = winningScore;
});

const p1button = document.querySelector("#p1");
p1button.addEventListener("click", function () {
  if (!gameOver) {
    ++p1Score;
    p1display.textContent = p1Score;
    if (p1Score === winningScore) {
      gameOver = true;
      p1display.classList.add("won");
    }
  }
});

const p2button = document.querySelector("#p2");
p2button.addEventListener("click", function () {
  if (!gameOver) {
    ++p2Score;
    p2display.textContent = p2Score;
    if (p2Score === winningScore) {
      gameOver = true;
      p2display.classList.add("won");
    }
  }
});

const resetbutton = document.querySelector("#reset");
resetbutton.addEventListener("click", reset);

function reset() {
  p1Score = 0;
  p2Score = 0;
  p1display.textContent = p1Score;
  p1display.classList.remove("won");
  p2display.classList.remove("won");
  p2display.textContent = p2Score;
  gameOver = false;
}
