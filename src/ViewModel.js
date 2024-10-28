import { Model } from "./Model.js";
import { View } from "./View.js";
const model = Model();
const view = View();

// #region CONSTANTS
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
// #endregion CONSTANTS
// #region INITIALIZE SHIPS
const player1Ship1 = model.createShip(CARRIER, CARRIER_LIFE, view.carrierColor);
const player1Ship2 = model.createShip(
  BATTLESHIP,
  BATTLESHIP_LIFE,
  view.battleshipColor
);
const player1Ship3 = model.createShip(CRUISER, CRUISER_LIFE, view.cruiserColor);
const player1Ship4 = model.createShip(
  SUBMARINE,
  SUBMARINE_LIFE,
  view.submarineColor
);
const player1Ship5 = model.createShip(
  DESTROYER,
  DESTROYER_LIFE,
  view.destroyerColor
);
const player2Ship1 = model.createShip(CARRIER, CARRIER_LIFE, view.carrierColor);
const player2Ship2 = model.createShip(
  BATTLESHIP,
  BATTLESHIP_LIFE,
  view.battleshipColor
);
const player2Ship3 = model.createShip(CRUISER, CRUISER_LIFE, view.cruiserColor);
const player2Ship4 = model.createShip(
  SUBMARINE,
  SUBMARINE_LIFE,
  view.submarineColor
);
const player2Ship5 = model.createShip(
  DESTROYER,
  DESTROYER_LIFE,
  view.destroyerColor
);
// #endregion INITIALIZE SHIPS
// #region SHIP LISTS
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
// #endregion SHIP LISTS

export function ViewModel() {
  let currentPlayer; // Starting player each turn
  let hitDetected;
  let player1ShipDestroyedCounter = SHIP_AMOUNT;
  let player2ShipDestroyedCounter = SHIP_AMOUNT;

  function initializeGame() {
    view.displayHomeScreen();
    bindEvents();
  }

  function bindEvents() {
    view.elements.pvpButton.addEventListener("click", pvpButtonClick);
    view.elements.player1ShipArrangeButton.addEventListener(
      "click",
      player1ShipArrangeClick
    );
    view.elements.player2ShipArrangeButton.addEventListener(
      "click",
      player2ShipArrangeClick
    );
    view.elements.player1ArrangeDoneButton.addEventListener(
      "click",
      player1ArrangeDoneClick
    );
    view.elements.player2ArrangeDoneButton.addEventListener(
      "click",
      player2ArrangeDoneClick
    );
    view.elements.replayButton.addEventListener("click", () => {
      location.reload();
    });
  }

  function pvpButtonClick() {
    view.updateTextPvPMode();
    view.clearContent();
    view.displayGameScreen();
    view.startShipArrangement();
  }

  function player1ShipArrangeClick() {
    clearShipArrangement(PLAYER1);
    allPlayer1Ships.forEach((ship) => placeShip(PLAYER1, ship));
    view.displayPlayer1ArrangeDoneButton();
  }

  function clearShipArrangement(player) {
    clearPlayerShipData(player);
    view.resetBoardColors(player);
    resetOccupiedSquares();
  }

  function clearPlayerShipData(player) {
    const playerShips = player === PLAYER1 ? allPlayer1Ships : allPlayer2Ships;
    playerShips.forEach((ship) => (ship.boardPlacement = []));
  }

  function resetOccupiedSquares() {
    model.occupiedSquares.length = 0;
  }

  function placeShip(player, ship) {
    // Keep generating placements until a valid one is found
    do {
      ship.boardPlacement = model.calculatePlacement(ship);
    } while (model.positionIsTaken(ship));

    // Update occupied squares
    model.updateOccupiedSquares(ship);

    // Display the ship on the board
    view.setShipPlacementColors(player, ship.boardPlacement, ship.color);
  }

  function placeShip(player, ship) {
    ship.boardPlacement = model.calculatePlacement(ship);
    while (model.positionIsTaken(ship)) {
      ship.boardPlacement = model.calculatePlacement(ship);
    }
    model.occupiedSquares.push(ship.boardPlacement);
    view.setShipPlacementColors(player, ship.boardPlacement, ship.color);
  }

  function player1ArrangeDoneClick() {
    view.displayPlayer2Arrangement();
    view.resetBoardColors(PLAYER1);
    view.setupPlayer2Arrangement();
  }

  function player2ShipArrangeClick() {
    clearShipArrangement(PLAYER2);
    allPlayer2Ships.forEach((ship) => placeShip(PLAYER2, ship));
    view.displayPlayer2ArrangeDoneButton();
  }

  function player2ArrangeDoneClick() {
    view.displayBoardDoneArranging();
    view.resetBoardColors(PLAYER2);
    chooseTurn();
  }

  function chooseTurn() {
    //First turn is random, rest is turn based.
    if (typeof currentPlayer === "undefined") {
      currentPlayer = Math.floor(Math.random() * 2) + 1;
    } else currentPlayer = currentPlayer === PLAYER1 ? 2 : 1;

    if (currentPlayer === PLAYER1) player1Turn();
    else player2Turn();
  }

  function player1Turn() {
    view.updatePlayerTurnMessage(PLAYER1);
    view.dimOwnBoard(PLAYER1);
    view.lightUpOpponentsBoard(PLAYER1);
    disableBoard(view.lowerPlayerSquares);
    enableBoard(view.upperPlayerSquares);
  }

  function player2Turn() {
    view.updatePlayerTurnMessage(PLAYER2);
    view.dimOwnBoard(PLAYER2);
    view.lightUpOpponentsBoard(PLAYER2);
    disableBoard(view.upperPlayerSquares);
    enableBoard(view.lowerPlayerSquares);
  }

  function disableBoard(boardSquares) {
    boardSquares.forEach((square) =>
      square.removeEventListener("click", handleSquareClick)
    );
  }

  function enableBoard(boardSquares) {
    boardSquares.forEach((square) =>
      square.addEventListener("click", handleSquareClick)
    );
  }

  function handleSquareClick(event) {
    let square = event.target;
    // Ensure the target is the square, not the dot inside
    if (!square.id) {
      square = square.parentElement; // Go up to the square div if the target is the dot
    }
    // Check if the square was already clicked
    if (square.hasAttribute("data-click")) {
      view.showAlreadyClickedMessage(); // Optional message to inform the player
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
    const allPlayerShips =
      player === PLAYER1 ? allPlayer2Ships : allPlayer1Ships;

    allPlayerShips.forEach((ship) => {
      if (ship.isHitAtPosition(squareID)) {
        handleShipHit(player, ship, square);
        hitDetected = true;
      }
    });
    if (!hitDetected) {
      handleShipMiss(square);
    }
  }

  function handleShipHit(player, ship, square) {
    ship.hit();
    view.colorSquareHit(square);
    view.showHitMessage(player, square);

    if (ship.destroyed) handleShipDestroyed(player, ship);

    //Check for winner/loser
    if (isGameOver()) gameOver(player);
    else setTimeout(chooseTurn, 200); // Delay to ensure turn switch stability
  }

  function handleShipDestroyed(player, ship) {
    view.changeDestroyedShipColor(player, ship);
    view.displayShip(player, ship);
    if (player === PLAYER1) player1ShipDestroyedCounter--;
    else player2ShipDestroyedCounter--;
  }

  function handleShipMiss(square) {
    view.colorSquareMiss(square);
    view.showMissMessage();
    setTimeout(chooseTurn, 200);
  }

  function gameOver(player) {
    view.showGameOverMessage(player);
    setTimeout(() => view.displayGameOverScreen(player), 3000);
  }

  function isGameOver() {
    if (player1ShipDestroyedCounter === 0 || player2ShipDestroyedCounter === 0)
      return true;
  }

  return {
    initializeGame,
  };
}
