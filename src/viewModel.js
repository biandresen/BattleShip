//* VIEW MODEL - INTERFACE (UI)

const gameModeText = document.querySelector(".game-mode-text");
const playerTurnMessage = document.querySelector(".player-turn-message");
const topHeader = document.querySelector(".top-header");
const bottomHeader = document.querySelector(".bottom-header");
const pvpButton = document.querySelector(".pvp-button");
const pvcButton = document.querySelector(".pvc-button");
const replayButton = document.querySelector(".replay-button");
const upperPlayerName = document.querySelector(".upper-player-name");
const upperPlayerScore = document.querySelector(".upper-player-score");
const lowerPlayerName = document.querySelector(".lower-player-name");
const lowerPlayerScore = document.querySelector(".lower-player-score");
const upperPlayerBoard = document.querySelector(".upper-player-board");
const upperBoardNumberColumn = document.querySelector(
  ".upper-board-number-column"
);
const lowerBoardLetterRow = document.querySelector(".lower-board-letter-row");
const lowerPlayerBoard = document.querySelector(".lower-player-board");
const lowerBoardNumberColumn = document.querySelector(
  ".lower-board-number-column"
);
const upperBoardLetterRow = document.querySelector(".upper-board-letter-row");
const upperPlayerShips = document.querySelector(".upper-player-ships");
const upperPlayerShip1 = document.querySelector(".upper-player-ship1");
const upperPlayerShip2 = document.querySelector(".upper-player-ship2");
const upperPlayerShip3 = document.querySelector(".upper-player-ship3");
const upperPlayerShip4 = document.querySelector(".upper-player-ship4");
const upperPlayerShip5 = document.querySelector(".upper-player-ship5");
const lowerPlayerShips = document.querySelector(".lower-player-ships");
const lowerPlayerShip1 = document.querySelector(".lower-player-ship1");
const lowerPlayerShip2 = document.querySelector(".lower-player-ship2");
const lowerPlayerShip3 = document.querySelector(".lower-player-ship3");
const lowerPlayerShip4 = document.querySelector(".lower-player-ship4");
const lowerPlayerShip5 = document.querySelector(".lower-player-ship5");

export function createBoards() {
  // Add event listener to the square -> on hover highlight
  // the square and on click change color of dot (white if miss, red if hit)

  // Create a 10x10 matrix (100 divs in total)
  //   UPPER PLAYER BOARD:
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      // Create a matrix item (div)
      const matrixItem = document.createElement("div");
      matrixItem.classList.add("matrix-item");

      // Create a dot (div) for the center
      const dot = document.createElement("div");
      dot.classList.add("dot");

      // Append the dot to the matrix item
      matrixItem.appendChild(dot);

      // Append the matrix item to the matrix container
      upperPlayerBoard.appendChild(matrixItem);

      //   LOWER PLAYER BOARD:
      // Create a matrix item (div)
      const matrixItem2 = document.createElement("div");
      matrixItem2.classList.add("matrix-item");

      // Create a dot (div) for the center
      const dot2 = document.createElement("div");
      dot2.classList.add("dot");

      // Append the dot to the matrix item
      matrixItem2.appendChild(dot2);

      // Append the matrix item to the matrix container
      lowerPlayerBoard.appendChild(matrixItem2);
    }
  }
}
