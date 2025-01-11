const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

initGame();

// initialise the game

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // UI par empty kro boxes ko
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    // one more thing is missing
    box.classList.remove("win");
  });

  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer} `;
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap the turn
    swapTurn();

    //check koi jeet to nhi gya
    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener("click", initGame);

function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[1]] !== "" &&
      gameGrid[position[2]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      answer = gameGrid[position[0]];

      // disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
      newGameBtn.classList.add("active");
      gameInfo.innerText = `Winner Player - ${answer}`;
      return;
    }

    // let's check whether game is tie or not
    let fillCount = 0;
    gameGrid.forEach((box) => {
      if (box !== "") {
        fillCount++;
      }
    });

    if (fillCount == 9) {
      gameInfo.innerText = "Game Tied !";
      newGameBtn.classList.add("active");
    }
  });
}
