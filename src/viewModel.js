//* VIEW MODEL - INTERFACE (UI)
import { Model } from "./model";
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

export function ViewModel() {
  //* #region API for Elements
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
    "--primary-color-highlight"
  );

  const gameModeText = document.querySelector(".game-mode-text");
  const playerTurnMessage = document.querySelector(".player-turn-message");
  const topHeader = document.querySelector(".top-header");
  const bottomHeader = document.querySelector(".bottom-header");
  const pvpButton = document.querySelector(".pvp-button");
  const pvcButton = document.querySelector(".pvc-button");
  const replayButton = document.querySelector(".replay-button");
  const upperPlayerName = document.querySelector(".upper-player-name");
  const upperPlayerScore = document.querySelector(".upper-player-score");
  const upperBoardArea = document.querySelector(".upper-board-area");
  const lowerPlayerName = document.querySelector(".lower-player-name");
  const lowerPlayerScore = document.querySelector(".lower-player-score");
  const upperPlayerBoard = document.querySelector(".upper-player-board");
  const lowerBoardArea = document.querySelector(".lower-board-area");
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

  const upperPlayerSquares = [];
  const lowerPlayerSquares = [];
  const occupiedSquares = [];

  const player1ArrangeDoneButton = document.querySelector(
    ".player1-arrange-done-button"
  );
  const player1ShipArrangeButton = document.querySelector(
    ".player1-ship-arrange-button"
  );
  const contentContainer = document.querySelector(".content");
  // #endregion
  //* #region API for Ships

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
  const player2Ship3 = Model().createShip(CARRIER, CARRIER_LIFE, cruiserColor);
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
      shipArrangement();
    });
    player1ShipArrangeButton.addEventListener("click", () => {
      clearShipArrangement(1);
      placeShip(player1Ship1);
      placeShip(player1Ship2);
      placeShip(player1Ship3);
      placeShip(player1Ship4);
      placeShip(player1Ship5);
      player1ArrangeDoneButton.style.display = "flex";
      // for (let i = 0; i < allPlayer1Ships.length; i++) {
      //   console.log(allPlayer1Ships[i].boardPlacement);
      // }
    });
  }

  function createBoards() {
    // Add event listener to the square -> on hover highlight
    // the square and on click change color of dot (white if miss, red if hit)

    // Create a 10x10 matrix (100 divs in total)
    //   UPPER PLAYER BOARD:
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        // Create a matrix item (div)
        const matrixItem = document.createElement("div");
        matrixItem.classList.add("matrix-item");

        //Set up ID
        matrixItem.setAttribute("id", row.toString() + col.toString());

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
    createBoards();
  }

  function changeShipColor(ship) {
    ship.classList.add("destroyed-ship");
  }

  function handleShipHit(ship) {
    ship.hit();
    if (ship.destroyed) {
      changeShipColor(ship);
    }
  }

  function shipArrangement() {
    playerTurnMessage.style.display = "flex";
    shipArrangementPlayer1();
  }

  function shipArrangementPlayer1() {
    playerTurnMessage.textContent = "PLAYER 1 - ARRANGE SHIPS";
    upperBoardArea.style.opacity = "50%";
    player1ShipArrangeButton.style.display = "flex";
  }

  function clearShipArrangement(player) {
    if (player == 1) {
      allPlayer1Ships.forEach((ship) => {
        ship.boardPlacement = [];
      });
      lowerPlayerSquares.forEach((square) => {
        square.style.background = mainColor;
      });
    }
    //Reset the occupied square list each clear
    occupiedSquares.length = 0;
  }

  function placeShip(ship) {
    ship.boardPlacement = calculatePlacement(ship);
    while (positionIsTaken(ship)) {
      ship.boardPlacement = calculatePlacement(ship);
    }
    occupiedSquares.push(ship.boardPlacement);
    setShipPlacementColors(ship.boardPlacement, ship.color);
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

  function setShipPlacementColors(coordinates, color) {
    coordinates.forEach((coordinate) => {
      for (let i = 0; i < lowerPlayerSquares.length; i++) {
        if (lowerPlayerSquares[i].getAttribute("id") == coordinate.toString()) {
          lowerPlayerSquares[i].style.background = color; // Color the square
        }
      }
    });
  }

  return {
    displayHomeScreen,
    bindEvents,
    positionIsTaken,
  };
}
