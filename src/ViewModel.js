//* VIEW MODEL - INTERFACE (UI)
import { Model } from "./Model.js";
// #region constants
const CARRIER = "Carrier";
const BATTLESHIP = "Battleship";
const CRUISER = "Cruiser";
const SUBMARINE = "Submarine";
const DESTROYER = "Destroyer";
const CARRIER_LIFE = 5;
const BATTLESHIP_LIFE = 4;
const CRUISER_LIFE = 3;
const SUBMARINE_LIFE = 3;
const DESTROYER_LIFE = 2;
const PLAYER1 = 1;
const PLAYER2 = 2;
const SHIP_AMOUNT = 5;
let currentPlayer;
let hitDetected;
let player1ShipDestroyedCounter;
let player2ShipDestroyedCounter;
// #endregion

export function ViewModel() {
  // #region API for Elements
  const carrierColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--carrier-color");
  const battleshipColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--battleship-color");
  const cruiserColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--cruiser-color");
  const submarineColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--submarine-color");
  const destroyerColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--destroyer-color");
  const mainColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-color"
  );

  const modal = document.querySelector(".ship-destroyed-modal");
  const modalMessage = document.querySelector(".modal-message");
  const gameModeText = document.querySelector(".game-mode-text");
  const playerTurnMessage = document.querySelector(".player-turn-message");
  const topHeader = document.querySelector(".top-header");
  const bottomHeader = document.querySelector(".bottom-header");
  const upperPlayerName = document.querySelector(".upper-player-name");
  const upperPlayerScore = document.querySelector(".upper-player-score");
  const upperBoardArea = document.querySelector(".upper-board-area");
  const lowerPlayerScore = document.querySelector(".lower-player-score");
  const upperPlayerBoard = document.querySelector(".upper-player-board");
  const lowerBoardArea = document.querySelector(".lower-board-area");
  const lowerPlayerBoard = document.querySelector(".lower-player-board");
  const upperPlayerShip1 = document.querySelector(".upper-player-ship1");
  const upperPlayerShip2 = document.querySelector(".upper-player-ship2");
  const upperPlayerShip3 = document.querySelector(".upper-player-ship3");
  const upperPlayerShip4 = document.querySelector(".upper-player-ship4");
  const upperPlayerShip5 = document.querySelector(".upper-player-ship5");
  const lowerPlayerShip1 = document.querySelector(".lower-player-ship1");
  const lowerPlayerShip2 = document.querySelector(".lower-player-ship2");
  const lowerPlayerShip3 = document.querySelector(".lower-player-ship3");
  const lowerPlayerShip4 = document.querySelector(".lower-player-ship4");
  const lowerPlayerShip5 = document.querySelector(".lower-player-ship5");
  const player2UIShips = [
    upperPlayerShip1,
    upperPlayerShip2,
    upperPlayerShip3,
    upperPlayerShip4,
    upperPlayerShip5,
  ];
  const player1UIShips = [
    lowerPlayerShip1,
    lowerPlayerShip2,
    lowerPlayerShip3,
    lowerPlayerShip4,
    lowerPlayerShip5,
  ];

  const upperPlayerSquares = [];
  const lowerPlayerSquares = [];
  const occupiedSquares = [];

  const arrangeButtonBox1 = document.querySelector(".arrange-button-box1");
  const arrangeButtonBox2 = document.querySelector(".arrange-button-box2");
  const pvpButton = document.querySelector(".pvp-button");
  const pvcButton = document.querySelector(".pvc-button");
  const replayButton = document.querySelector(".replay-button");
  const player1ShipArrangeButton = document.querySelector(
    ".player1-ship-arrange-button"
  );
  const player1ArrangeDoneButton = document.querySelector(
    ".player1-arrange-done-button"
  );
  const player2ArrangeDoneButton = document.querySelector(
    ".player2-arrange-done-button"
  );
  const player2ShipArrangeButton = document.querySelector(
    ".player2-ship-arrange-button"
  );
  const contentContainer = document.querySelector(".content");
  // #endregion
  // #region API for Ships

  const player1Ship1 = Model().createShip(CARRIER, CARRIER_LIFE, carrierColor);
  const player1Ship2 = Model().createShip(
    BATTLESHIP,
    BATTLESHIP_LIFE,
    battleshipColor
  );
  const player1Ship3 = Model().createShip(CRUISER, CRUISER_LIFE, cruiserColor);
  const player1Ship4 = Model().createShip(
    SUBMARINE,
    SUBMARINE_LIFE,
    submarineColor
  );
  const player1Ship5 = Model().createShip(
    DESTROYER,
    DESTROYER_LIFE,
    destroyerColor
  );
  const player2Ship1 = Model().createShip(CARRIER, CARRIER_LIFE, carrierColor);
  const player2Ship2 = Model().createShip(
    BATTLESHIP,
    BATTLESHIP_LIFE,
    battleshipColor
  );
  const player2Ship3 = Model().createShip(CRUISER, CRUISER_LIFE, cruiserColor);
  const player2Ship4 = Model().createShip(
    SUBMARINE,
    SUBMARINE_LIFE,
    submarineColor
  );
  const player2Ship5 = Model().createShip(
    DESTROYER,
    DESTROYER_LIFE,
    destroyerColor
  );
  const allPlayer1Ships = [
    player1Ship1,
    player1Ship2,
    player1Ship3,
    player1Ship4,
    player1Ship5,
  ];
  const allPlayer2Ships = [
    player2Ship1,
    player2Ship2,
    player2Ship3,
    player2Ship4,
    player2Ship5,
  ];
  // #endregion

  function bindEvents() {
    pvpButton.addEventListener("click", () => {
      gameModeText.textContent = "Mode: PvP";
      upperPlayerName.textContent = "Player 2";
      clearContent();
      displayGameScreen();
      shipArrangement(PLAYER1);
    });
    replayButton.addEventListener("click", () => {
      location.reload();
    });
    player1ShipArrangeButton.addEventListener("click", () => {
      clearShipArrangement(PLAYER1);
      placeShip(PLAYER1, player1Ship1);
      placeShip(PLAYER1, player1Ship2);
      placeShip(PLAYER1, player1Ship3);
      placeShip(PLAYER1, player1Ship4);
      placeShip(PLAYER1, player1Ship5);
      player1ArrangeDoneButton.style.display = "flex";
    });
    player2ShipArrangeButton.addEventListener("click", () => {
      clearShipArrangement(PLAYER2);
      placeShip(PLAYER2, player2Ship1);
      placeShip(PLAYER2, player2Ship2);
      placeShip(PLAYER2, player2Ship3);
      placeShip(PLAYER2, player2Ship4);
      placeShip(PLAYER2, player2Ship5);
      player2ArrangeDoneButton.style.display = "flex";
    });
    player1ArrangeDoneButton.addEventListener("click", () => {
      upperBoardArea.style.opacity = "100%";
      upperPlayerScore.style.opacity = "100%";
      arrangeButtonBox1.style.display = "none";
      resetBoardColors(PLAYER1);
      shipArrangement(PLAYER2);
    });
    player2ArrangeDoneButton.addEventListener("click", () => {
      lowerBoardArea.style.opacity = "100%";
      lowerPlayerScore.style.opacity = "100%";
      arrangeButtonBox2.style.display = "none";
      resetBoardColors(PLAYER2);
      chooseTurn();
    });
  }

  function createBoards() {
    // Create a 10x10 matrix (100 divs in total)
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        //   UPPER PLAYER BOARD:
        // Create a matrix item (div)
        const matrixItem = document.createElement("div");
        matrixItem.classList.add("matrix-item");

        //Set up ID
        matrixItem.setAttribute("id", row.toString() + col.toString());
        matrixItem.setAttribute("data-player", "2");

        upperPlayerSquares.push(matrixItem);

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

        //Set up ID
        matrixItem2.setAttribute("id", row.toString() + col.toString());
        matrixItem2.setAttribute("data-player", "1");

        lowerPlayerSquares.push(matrixItem2);

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

  function clearContent() {
    for (let i = 0; i < contentContainer.children.length; i++) {
      contentContainer.children[i].style.display = "none";
    }
  }

  function displayHomeScreen() {
    topHeader.style.display = "block";
    pvpButton.style.display = "block";
    pvcButton.style.display = "block";
  }

  function displayGameScreen() {
    upperBoardArea.style.display = "grid";
    lowerBoardArea.style.display = "grid";
    upperPlayerScore.style.display = "grid";
    lowerPlayerScore.style.display = "grid";
    player1ShipDestroyedCounter = SHIP_AMOUNT;
    player2ShipDestroyedCounter = SHIP_AMOUNT;
    createBoards();
  }

  function shipArrangement(player) {
    playerTurnMessage.style.display = "flex";
    if (player == PLAYER1) {
      playerTurnMessage.textContent = "PLAYER 1 - ARRANGE SHIPS";
      upperBoardArea.style.opacity = "50%";
      upperPlayerScore.style.opacity = "50%";
      player1ShipArrangeButton.style.display = "flex";
    } else if (player == PLAYER2) {
      playerTurnMessage.textContent = "PLAYER 2 - ARRANGE SHIPS";
      lowerBoardArea.style.opacity = "50%";
      lowerPlayerScore.style.opacity = "50%";
      player2ShipArrangeButton.style.display = "flex";
    } else {
    }
  }

  function clearShipArrangement(player) {
    if (player == PLAYER1) {
      allPlayer1Ships.forEach((ship) => {
        ship.boardPlacement = [];
      });
      resetBoardColors(PLAYER1);
    } else {
      allPlayer2Ships.forEach((ship) => {
        ship.boardPlacement = [];
      });
      resetBoardColors(PLAYER2);
    }
    //Reset the occupied square list each clear
    occupiedSquares.length = 0;
  }

  function resetBoardColors(player) {
    if (player == PLAYER1) {
      lowerPlayerSquares.forEach((square) => {
        square.style.background = mainColor;
      });
    } else {
      upperPlayerSquares.forEach((square) => {
        square.style.background = mainColor;
      });
    }
  }
  function displayShip(player, ship) {
    const board = player === PLAYER1 ? upperPlayerBoard : lowerPlayerBoard;

    Array.from(board.children).forEach((square) => {
      if (ship.boardPlacement.includes(square.id)) {
        square.style.background = ship.color;
      }
    });
  }
  function placeShip(player, ship) {
    ship.boardPlacement = calculatePlacement(ship);
    while (positionIsTaken(ship)) {
      ship.boardPlacement = calculatePlacement(ship);
    }
    occupiedSquares.push(ship.boardPlacement);
    setShipPlacementColors(player, ship.boardPlacement, ship.color);
  }

  function positionIsTaken(ship) {
    const flattenArray = occupiedSquares.flat();
    return ship.boardPlacement.some((coordinate) =>
      flattenArray.includes(coordinate)
    );
  }

  function calculatePlacement(ship) {
    //Choosing a random coordinate to begin the placement from
    const coordinate = Math.floor(Math.random() * 100);
    //Choosing vertical or horizontal placement randomly
    const directionOfPlacement = Math.floor(Math.random() * 2);
    const placement = [];

    for (let i = 0; i < ship.life; i++) {
      //Vertical placement
      if (directionOfPlacement == 0) {
        if (coordinate <= 59) placement.push(coordinate + i * 10);
        else placement.push(coordinate - i * 10);
        //Horizontal placement.
      } else {
        // If coordinate ends with 5 or less:
        if (coordinate % 10 <= 5) placement.push(coordinate + i);
        else placement.push(coordinate - i);
      }
    }
    return formatCoordinatesToMatchID(placement);
  }

  function formatCoordinatesToMatchID(placement) {
    const formattedPlacement = placement.map((coordinate) => {
      if (coordinate < 10) {
        return "0" + coordinate;
      }
      return coordinate.toString();
    });
    return formattedPlacement;
  }

  function setShipPlacementColors(player, coordinates, color) {
    if (player == PLAYER1) {
      coordinates.forEach((coordinate) => {
        for (let i = 0; i < lowerPlayerSquares.length; i++) {
          if (
            lowerPlayerSquares[i].getAttribute("id") == coordinate.toString()
          ) {
            lowerPlayerSquares[i].style.background = color; // Color the square
          }
        }
      });
    } else {
      coordinates.forEach((coordinate) => {
        for (let i = 0; i < upperPlayerSquares.length; i++) {
          if (
            upperPlayerSquares[i].getAttribute("id") == coordinate.toString()
          ) {
            upperPlayerSquares[i].style.background = color; // Color the square
          }
        }
      });
    }
  }

  function chooseTurn() {
    //First turn is random, rest is turn based.
    if (typeof currentPlayer === "undefined") {
      currentPlayer = Math.floor(Math.random() * 2) + 1;
    } else currentPlayer = currentPlayer === 1 ? 2 : 1;

    if (currentPlayer === 1) player1Turn();
    else player2Turn();
  }

  function player1Turn() {
    playerTurnMessage.textContent = "PLAYER 1 - LAUNCH MISSILE!";
    dimOwnBoard(PLAYER1);
    lightUpOpponentsBoard(PLAYER1);
    disableBoard(lowerPlayerSquares);
    enableBoard(upperPlayerSquares);
  }

  function player2Turn() {
    playerTurnMessage.textContent = "PLAYER 2 - LAUNCH MISSILE!";
    dimOwnBoard(PLAYER2);
    lightUpOpponentsBoard(PLAYER2);
    disableBoard(upperPlayerSquares);
    enableBoard(lowerPlayerSquares);
  }

  function disableBoard(boardSquares) {
    boardSquares.forEach((square) => {
      square.removeEventListener("click", handleSquareClick);
    });
  }

  function enableBoard(boardSquares) {
    boardSquares.forEach((square) => {
      square.addEventListener("click", handleSquareClick);
    });
  }

  function handleSquareClick(event) {
    let square = event.target;

    // Ensure the target is the square, not the dot inside
    if (!square.id) {
      square = square.parentElement; // Go up to the square div if the target is the dot
    }

    // Check if the square was already clicked
    if (square.hasAttribute("data-click")) {
      showAlreadyClickedMessage(); // Optional message to inform the player
      return; // Exit function to allow another try
    }

    // Mark the square as clicked without setting a value
    square.setAttribute("data-click", "");
    const player = currentPlayer;
    hitDetected = false;
    checkForShipHit(player, square);
  }

  function checkForShipHit(player, square) {
    const squareID = square.id;

    if (player == PLAYER1) {
      allPlayer2Ships.forEach((ship) => {
        if (ship.isHitAtPosition(squareID)) {
          handleShipHit(player, ship, square);
          hitDetected = true;
        }
      });
      if (!hitDetected) handleShipMiss(PLAYER1, square);
    } else if (player == PLAYER2) {
      allPlayer1Ships.forEach((ship) => {
        if (ship.isHitAtPosition(squareID)) {
          handleShipHit(player, ship, square);
          hitDetected = true;
        }
      });
      if (!hitDetected) handleShipMiss(PLAYER2, square);
    }
  }

  function handleShipHit(player, ship, square) {
    ship.hit();
    colorSquareHit(square);
    showHitMessage(player, square);
    if (ship.destroyed) {
      changeDestroyedShipColor(player, ship);
      displayShip(player, ship);
      if (player === PLAYER1) player1ShipDestroyedCounter--;
      else player2ShipDestroyedCounter--;
    }

    console.log(player1ShipDestroyedCounter);
    console.log(player2ShipDestroyedCounter);
    //Check for winner/loser
    if (
      player1ShipDestroyedCounter === 0 ||
      player2ShipDestroyedCounter === 0
    ) {
      gameOver(player);
    } else {
      setTimeout(chooseTurn, 200); // Delay to ensure turn switch stability
    }
  }

  function gameOver(player) {
    showGameOverMessage(player);
    setTimeout(() => {
      displayGameOverScreen(player);
    }, 3000);
  }

  function displayGameOverScreen(player) {
    clearContent();
    topHeader.textContent = "GAME OVER";
    bottomHeader.textContent = `PLAYER ${player} WON!`;
    topHeader.style.display = "block";
    bottomHeader.style.display = "block";
    replayButton.style.display = "block";
    gameModeText.style.display = "none";
  }

  function handleShipMiss(player, square) {
    colorSquareMiss(square);
    showMissMessage(player);
    setTimeout(chooseTurn, 200); // Delay to ensure turn switch stability
  }

  function colorSquareHit(square) {
    ensureDotExists(square);
    square.firstChild.style.background = "red"; // Hit color
  }

  function colorSquareMiss(square) {
    ensureDotExists(square);
    square.firstChild.style.background = "white"; // Miss color
  }

  function ensureDotExists(square) {
    if (!square.firstChild) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      square.appendChild(dot);
    }
  }

  function changeDestroyedShipColor(player, actualShip) {
    if (player == PLAYER1) {
      player2UIShips.forEach((ship) => {
        if (ship.getAttribute("name") == actualShip.shipType) {
          ship.classList.add("destroyed-ship");
        }
      });
    } else if (player == PLAYER2) {
      player1UIShips.forEach((ship) => {
        if (ship.getAttribute("name") == actualShip.shipType) {
          ship.classList.add("destroyed-ship");
        }
      });
    }
    showDestroyedMessage(actualShip);
  }

  function lightUpOpponentsBoard(player) {
    if (player == PLAYER1) {
      upperBoardArea.classList.add("board-glow");
    } else if (player == PLAYER2) {
      lowerBoardArea.classList.add("board-glow");
    }
  }

  function dimOwnBoard(player) {
    if (player == PLAYER1) {
      lowerBoardArea.classList.remove("board-glow");
    } else if (player == PLAYER2) {
      upperBoardArea.classList.remove("board-glow");
    }
  }

  function showAlreadyClickedMessage() {
    modalMessage.textContent = "Already clicked!";
    showModal();
  }

  function showHitMessage() {
    modalMessage.textContent = `HIT!`;
    showModal();
  }

  function showMissMessage() {
    modalMessage.textContent = `MISS!`;
    showModal();
  }

  function showDestroyedMessage(ship) {
    modalMessage.textContent = `${ship.shipType} destroyed`;
    showModal();
  }

  function showGameOverMessage(player) {
    modalMessage.textContent = `PLAYER ${player} SUNK ALL YOUR SHIPS!`;
    showModal();
  }

  function showModal() {
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.display = "none";
    }, 2500);
  }

  return {
    displayHomeScreen,
    bindEvents,
    positionIsTaken,
  };
}
