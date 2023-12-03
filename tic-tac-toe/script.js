const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const startButton = document.getElementById("button--start");

let boardStore = ["", "", "", "", "", "", "", "", ""];
// true -> 1st Player(O), false -> 2nd Player(X)
let currentPlayer = true;

cells.forEach(function (cell, index) {
  cell.addEventListener("click", function () {
    cellClick.call(this, index);
    checkWinner();
    togglerPlayer();
    checkDraw();
  });
});

startButton.addEventListener("click", startGame);

function startGame() {
  currentPlayer = true;
  boardStore.fill("");
  startButton.classList.remove("show");

  cells.forEach((ele) => {
    ele.innerHTML = null;
  });
}

function cellClick(index) {
  if (!this.innerHTML) {
    this.innerHTML = currentPlayer ? "O" : "X";
    boardStore[index] = currentPlayer ? "O" : "X";
  }
}

function togglerPlayer() {
  currentPlayer = !currentPlayer;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boardStore[a] &&
      boardStore[a] === boardStore[b] &&
      boardStore[a] === boardStore[c]
    ) {
      alert(`Player ${boardStore[a]} wins!`);
      startButton.classList.add("show");
      return true;
    }
  }

  return false;
}

function checkDraw() {
  if (!boardStore.includes("") && !checkWinner()) {
    startButton.classList.add("show");
    alert("It's a draw!");
  }
}
