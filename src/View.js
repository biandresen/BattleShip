export function View() {
  const elements = {
    modal: document.querySelector(".ship-destroyed-modal"),
    modalMessage: document.querySelector(".modal-message"),
    gameModeText: document.querySelector(".game-mode-text"),
    playerTurnMessage: document.querySelector(".player-turn-message"),
    topHeader: document.querySelector(".top-header"),
    bottomHeader: document.querySelector(".bottom-header"),
    upperPlayerName: document.querySelector(".upper-player-name"),
    upperPlayerScore: document.querySelector(".upper-player-score"),
    upperBoardArea: document.querySelector(".upper-board-area"),
    lowerPlayerScore: document.querySelector(".lower-player-score"),
    upperPlayerBoard: document.querySelector(".upper-player-board"),
    lowerBoardArea: document.querySelector(".lower-board-area"),
    lowerPlayerBoard: document.querySelector(".lower-player-board"),
    upperPlayerShip1: document.querySelector(".upper-player-ship1"),
    upperPlayerShip2: document.querySelector(".upper-player-ship2"),
    upperPlayerShip3: document.querySelector(".upper-player-ship3"),
    upperPlayerShip4: document.querySelector(".upper-player-ship4"),
    upperPlayerShip5: document.querySelector(".upper-player-ship5"),
    lowerPlayerShip1: document.querySelector(".lower-player-ship1"),
    lowerPlayerShip2: document.querySelector(".lower-player-ship2"),
    lowerPlayerShip3: document.querySelector(".lower-player-ship3"),
    lowerPlayerShip4: document.querySelector(".lower-player-ship4"),
    lowerPlayerShip5: document.querySelector(".lower-player-ship5"),
    arrangeButtonBox1: document.querySelector(".arrange-button-box1"),
    arrangeButtonBox2: document.querySelector(".arrange-button-box2"),
    pvpButton: document.querySelector(".pvp-button"),
    pvcButton: document.querySelector(".pvc-button"),
    replayButton: document.querySelector(".replay-button"),
    player1ShipArrangeButton: document.querySelector(
      ".player1-ship-arrange-button"
    ),
    player1ArrangeDoneButton: document.querySelector(
      ".player1-arrange-done-button"
    ),
    player2ArrangeDoneButton: document.querySelector(
      ".player2-arrange-done-button"
    ),
    player2ShipArrangeButton: document.querySelector(
      ".player2-ship-arrange-button"
    ),
    contentContainer: document.querySelector(".content"),
  };
  // #region ELEMENTS
  const player2UIShips = [
    elements.upperPlayerShip1,
    elements.upperPlayerShip2,
    elements.upperPlayerShip3,
    elements.upperPlayerShip4,
    elements.upperPlayerShip5,
  ];
  const player1UIShips = [
    elements.lowerPlayerShip1,
    elements.lowerPlayerShip2,
    elements.lowerPlayerShip3,
    elements.lowerPlayerShip4,
    elements.lowerPlayerShip5,
  ];
  const upperPlayerSquares = [];
  const lowerPlayerSquares = [];
  // #endregion ELEMENTS
  // #region STYLES
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
  // #endregion STYLES

  function displayHomeScreen() {
    elements.topHeader.style.display = "block";
    elements.pvpButton.style.display = "block";
    elements.pvcButton.style.display = "block";
  }

  function updateTextPvPMode() {
    elements.gameModeText.textContent = "Mode: PvP";
    elements.upperPlayerName.textContent = "Player 2";
  }

  function clearContent() {
    for (let i = 0; i < elements.contentContainer.children.length; i++) {
      elements.contentContainer.children[i].style.display = "none";
    }
  }

  function displayGameScreen() {
    elements.upperBoardArea.style.display = "grid";
    elements.lowerBoardArea.style.display = "grid";
    elements.upperPlayerScore.style.display = "grid";
    elements.lowerPlayerScore.style.display = "grid";
    createBoards();
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
        elements.upperPlayerBoard.appendChild(matrixItem);

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
        elements.lowerPlayerBoard.appendChild(matrixItem2);
      }
    }
  }

  function startShipArrangement() {
    displayPlayerTurnMessage();
    setupPlayer1Arrangement();
  }

  function displayPlayerTurnMessage() {
    elements.playerTurnMessage.style.display = "flex";
  }

  function setupPlayer1Arrangement() {
    elements.playerTurnMessage.textContent = "PLAYER 1 - ARRANGE SHIPS";
    elements.upperBoardArea.style.opacity = "50%";
    elements.upperPlayerScore.style.opacity = "50%";
    elements.player1ShipArrangeButton.style.display = "flex";
  }

  function setupPlayer2Arrangement() {
    elements.playerTurnMessage.textContent = "PLAYER 2 - ARRANGE SHIPS";
    elements.lowerBoardArea.style.opacity = "50%";
    elements.lowerPlayerScore.style.opacity = "50%";
    elements.player2ShipArrangeButton.style.display = "flex";
  }

  function displayPlayer1ArrangeDoneButton() {
    elements.player1ArrangeDoneButton.style.display = "flex";
  }

  function setShipPlacementColors(player, shipPlacement, shipColor) {
    const boardSquares = player === 1 ? lowerPlayerSquares : upperPlayerSquares;

    shipPlacement.forEach((coordinate) => {
      const boardSquare = boardSquares.find(
        (square) => square.getAttribute("id") === coordinate.toString()
      );
      if (boardSquare) {
        boardSquare.style.background = shipColor;
      }
    });
  }

  function displayPlayer2Arrangement() {
    elements.upperBoardArea.style.opacity = "100%";
    elements.upperPlayerScore.style.opacity = "100%";
    elements.arrangeButtonBox1.style.display = "none";
  }

  function resetBoardColors(player) {
    const playerSquares =
      player === 1 ? lowerPlayerSquares : upperPlayerSquares;

    playerSquares.forEach((square) => {
      square.style.background = mainColor;
    });
  }

  function displayPlayer2ArrangeDoneButton() {
    elements.player2ArrangeDoneButton.style.display = "flex";
  }

  function displayBoardDoneArranging() {
    elements.lowerBoardArea.style.opacity = "100%";
    elements.lowerPlayerScore.style.opacity = "100%";
    elements.arrangeButtonBox2.style.display = "none";
  }

  function updatePlayerTurnMessage(player) {
    elements.playerTurnMessage.textContent = `PLAYER ${player} - LAUNCH MISSILE!`;
  }

  function dimOwnBoard(player) {
    if (player === 1) elements.lowerBoardArea.classList.remove("board-glow");
    else elements.upperBoardArea.classList.remove("board-glow");
  }

  function lightUpOpponentsBoard(player) {
    if (player === 1) elements.upperBoardArea.classList.add("board-glow");
    else elements.lowerBoardArea.classList.add("board-glow");
  }

  function showAlreadyClickedMessage() {
    elements.modalMessage.textContent = "Already clicked!";
    showModal();
  }

  function colorSquareHit(square) {
    ensureDotExists(square);
    square.firstChild.style.background = "red";
  }

  function ensureDotExists(square) {
    if (!square.firstChild) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      square.appendChild(dot);
    }
  }

  function showHitMessage() {
    elements.modalMessage.textContent = "HIT!";
    showModal();
  }

  function showMissMessage() {
    elements.modalMessage.textContent = `MISS!`;
    showModal();
  }

  function colorSquareMiss(square) {
    ensureDotExists(square);
    square.firstChild.style.background = "white";
  }

  function changeDestroyedShipColor(player, actualShip) {
    const playerUIShips = player === 1 ? player2UIShips : player1UIShips;

    playerUIShips.forEach((ship) => {
      if (ship.getAttribute("name") == actualShip.shipType) {
        ship.classList.add("destroyed-ship");
      }
    });
    showDestroyedMessage(actualShip);
  }

  function showDestroyedMessage(ship) {
    elements.modalMessage.textContent = `${ship.shipType} destroyed`;
    showModal();
  }

  function showGameOverMessage(player) {
    elements.modalMessage.textContent = `PLAYER ${player} WON!`;
    showModal();
  }

  function displayShip(player, ship) {
    const board =
      player === 1 ? elements.upperPlayerBoard : elements.lowerPlayerBoard;

    Array.from(board.children).forEach((square) => {
      if (ship.boardPlacement.includes(square.id)) {
        square.style.background = ship.color;
      }
    });
  }

  function displayGameOverScreen(player) {
    clearContent();
    elements.topHeader.textContent = "GAME OVER";
    elements.bottomHeader.textContent = `PLAYER ${player} WON!`;
    elements.topHeader.style.display = "block";
    elements.bottomHeader.style.display = "block";
    elements.replayButton.style.display = "block";
    elements.gameModeText.style.display = "none";
  }

  function showModal() {
    elements.modal.style.display = "block";
    setTimeout(() => {
      elements.modal.style.display = "none";
    }, 2000);
  }

  return {
    elements,
    upperPlayerSquares,
    lowerPlayerSquares,
    player1UIShips,
    player2UIShips,
    carrierColor,
    battleshipColor,
    cruiserColor,
    submarineColor,
    destroyerColor,
    displayHomeScreen,
    updateTextPvPMode,
    clearContent,
    displayGameScreen,
    displayPlayerTurnMessage,
    startShipArrangement,
    setupPlayer1Arrangement,
    setupPlayer2Arrangement,
    displayPlayer1ArrangeDoneButton,
    resetBoardColors,
    setShipPlacementColors,
    displayPlayer2Arrangement,
    resetBoardColors,
    displayPlayer2ArrangeDoneButton,
    displayBoardDoneArranging,
    updatePlayerTurnMessage,
    dimOwnBoard,
    lightUpOpponentsBoard,
    showAlreadyClickedMessage,
    colorSquareHit,
    colorSquareMiss,
    ensureDotExists,
    showHitMessage,
    showMissMessage,
    showDestroyedMessage,
    showGameOverMessage,
    changeDestroyedShipColor,
    displayShip,
    displayGameOverScreen,
  };
}
