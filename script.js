let playerRed = "R";
let playerYellow = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;

let rows = 6;
let columns = 7;
let currColumns;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");

      // tile HTML
      let tile = document.createElement("div");
      tile.id = `${r.toString()}-${c.toString()}`;
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("game-board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }

  let coords = this.id.toString().split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];
  if (r < 0) {
    return;
  }

  board[r][c] = currPlayer;
  let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
  if (currPlayer == playerRed) {
    tile.classList.add("red-piece");
    console.log(currPlayer);
    currPlayer = playerYellow;
    console.log(currPlayer);
  } else {
    tile.classList.add("yellow-piece");
    console.log(currPlayer);
    currPlayer = playerRed;
    console.log(currPlayer);
  }

  r -= 1;
  currColumns[c] = r;

  checkWinner();
}

function checkWinner() {
  // Checking the winner horizontally
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Checking the winner vertically
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c] &&
          board[r + 1][c] == board[r + 2][c] &&
          board[r + 2][c] == board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Checking the winner anti-diagonally
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c + 1] &&
          board[r + 1][c + 1] == board[r + 2][c + 2] &&
          board[r + 2][c + 2] == board[r + 3][c + 3]
        ) {
          console.log(r, c);
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Checking the winner diagonally
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r - 1][c + 1] &&
          board[r - 1][c + 1] == board[r - 2][c + 2] &&
          board[r - 2][c + 2] == board[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

function setWinner(r, c) {
  const winner = document.getElementById("winner");
  if (board[r][c] == playerRed) {
    winner.innerText = "Player Red wins the match!";
  } else {
    winner.innerText = "Player Yellow wins the match!";
  }

  gameOver = true;
}

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("tile")) {
    const dropSound = this.document.querySelector("#dropSound");
    dropSound.play();
    dropSound.volume = 0.5;
    dropSound.loop = false;
  }
});
