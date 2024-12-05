let messageBuffer = {
  theme: null,
  cd: null
};
window.addEventListener("message", (event) => {
  console.log("OKOKOKOOOOOOOOK");
  messageBuffer.theme = event.data.theme;
  messageBuffer.cd = event.data.cd;
  var new_game_section = document.querySelector(".new-game-section");
  var rules_section = document.querySelector(".rules-section");
  var content = document.querySelector(".content");
  var game = document.querySelector(".game-options");
  if (event.data.theme) {
    const theme = event.data.theme;
    document.body.style.backgroundColor = theme === "light" ? "var(--Light)" : "var(--Dark)";
    document.body.style.color = theme === "light" ? "(--Dark)" : "var(--Light)";
    new_game_section.style.color = theme === "light" ? "var(--Dark)" : "var(--Light)";
    rules_section.style.color = theme === "light" ? "var(--Dark)" : "var(--Light)";;
    content.style.backgroundColor = theme === "light" ? "var(--Light)" : "var(--Dark)";
    game.style.backgroundColor = theme === "light" ? "var(--Light)" : "var(--Dark)";
  }
  if (event.data.cd) {
    console.log("Ok n");
    let a = document.querySelectorAll(".item");
    a.forEach(i => {
      if (i.textContent == event.data.cd) {
        i.click();
      }
    })
  }
})
let gameBoard = document.getElementById("game-board");
let min = document.getElementById("min");
let board = [];
function Start(colsizes, rowsizes, mines) {
  var soO = 0;
  gameBoard.style.pointerEvents = "all";
  var colsize = colsizes;
  var rowsize = rowsizes;
  var mins = mines;
  var mine = mines;
  min.textContent = "0" + mins;
  let first = true;
  TaoBang();
  function TaoBang() {
    board = Array.from({ length: rowsize }, () => Array(colsize).fill(0));
    let row = document.getElementById("game-board");
    row.style.gridTemplateColumns = `repeat(${colsize}, 24px)`
    row.style.gridTemplateRows = `repeat(${rowsize}, 24px)`
    gameBoard.innerHTML = "";
    for (let row = 0; row < rowsize; row++) {
      for (let col = 0; col < colsize; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", latO);
        cell.addEventListener("contextmenu", () => {
          event.preventDefault();
          if (cell.innerText != "🚩" && !cell.classList.contains("revealed") && mins > 0 && mins <= mines) {
            cell.removeEventListener("click", latO);
            cell.textContent = "🚩";
            mins--;
          }
          else if (cell.innerText == "🚩" && mins > 0 && mins <= mines) {
            cell.addEventListener("click", latO);
            cell.textContent = "";
            mins++;
          }
          min.textContent = "0" + mins;
        });
        gameBoard.appendChild(cell);
      }
    }
  }
  function TaoBom(rows, cols) {
    let bom = 0;
    while (bom < mine) {
      let row = Math.floor(Math.random() * rowsize);
      let col = Math.floor(Math.random() * colsize);
      if (board[row][col] !== "M" && row != rows && col != cols) {
        board[row][col] = "M";
        bom++;
        capNhatMin(row, col);
      }
    }
  }
  function capNhatMin(row, col) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let newRow = row + i;
        let newCol = col + j;
        if (newCol >= 0 && newRow >= 0 && newCol < colsize && newRow < rowsize && board[newRow][newCol] !== 'M') {
          board[newRow][newCol]++;
        }
      }
    }
  }
  function latO(event) {
    const tile = event.target;
    const row = parseInt(tile.dataset.row);
    const col = parseInt(tile.dataset.col);
    if (first) {
      TaoBom(row, col);
      first = false;
    }
    if (tile.classList.contains("revealed")) return;
    tile.classList.add("revealed");
    if (board[row][col] === "M") {
      tile.classList.add("mine");
      tile.innerHTML = "💣";
      latMin();
      gameBoard.style.pointerEvents = "none";
      document.getElementById("restart").textContent = "😒";
      showLose();
    }
    else {
      soO++;
      if (soO == (rowsize * colsize) - mine) {
        console.log((rowsize * colsize) - mine);
        console.log(soO);
        showWin();
        gameBoard.style.pointerEvents = "none";
      }
      tile.textContent = board[row][col] === 0 ? "" : board[row][col];
      if (board[row][col] === 0) latOXungQuanh(row, col);
    }
  }

  function latMin() {
    for (let i = 0; i < rowsize; i++) {
      for (let j = 0; j < colsize; j++) {
        if (board[i][j] === "M" && document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`).textContent !== "🚩") {
          const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
          cell.classList.add("revealed", "mine");
          cell.textContent = "💣";
        }
      }
    }
  }

  function latOXungQuanh(row, col) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let newRow = row + i;
        let newCol = col + j;
        if (newCol >= 0 && newRow >= 0 && newCol < colsize && newRow < rowsize
          && !document.querySelector(`.cell[data-row="${newRow}"][data-col="${newCol}"]`).classList.contains("revealed")
          && document.querySelector(`.cell[data-row="${newRow}"][data-col="${newCol}"]`).textContent !== "🚩") {
          document.querySelector(`.cell[data-row="${newRow}"][data-col="${newCol}"]`).click();
        }
      }
    }
  }
}
function showLose() {
  Swal.fire({
    title: 'YOU LOSE!',
    text: 'GÀ GÀ GÀ GÀ',
    imageUrl: 'lose.png',
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: 'Custom image',
    confirmButtonText: 'Close'
  });
}
function showWin() {
  Swal.fire({
    title: 'YOU WIN!',
    text: `NAH,I'D WIN`,
    imageUrl: 'win.png',
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: 'Custom image',
    confirmButtonText: 'Close'
  });
}
let chon = document.querySelectorAll(".item");
function Begin() {
  document.getElementById("restart").innerHTML = "😊";
  chon.forEach(i => {
    if (i.classList.contains("active")) {
      i.click();
    }
  })
}

chon.forEach(item => item.addEventListener("click", () => {
  chon.forEach(i => { i.classList.remove("active") });
  item.classList.add("active");
}))
