export function Model() {
  const occupiedSquares = [];
  class Ship {
    constructor(shipType, life, color) {
      this.shipType = shipType;
      this.life = life;
      this.color = color;
      this.destroyed = false;
      this.boardPlacement = [];
    }

    hit() {
      if (this.life > 0) this.life--;
      if (this.life <= 0) this.destroyed = true;
    }

    isHitAtPosition(squareID) {
      // Call the View to render the ship’s display
      return this.boardPlacement.includes(squareID);
    }
  }

  function createShip(shipType, life, color) {
    return new Ship(shipType, life, color);
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

  function positionIsTaken(ship) {
    const flattenArray = occupiedSquares.flat();
    return ship.boardPlacement.some((coordinate) =>
      flattenArray.includes(coordinate)
    );
  }

  function updateOccupiedSquares(ship) {
    occupiedSquares.push(ship.boardPlacement);
  }

  return {
    occupiedSquares,
    createShip,
    calculatePlacement,
    formatCoordinatesToMatchID,
    positionIsTaken,
    updateOccupiedSquares,
  };
}
