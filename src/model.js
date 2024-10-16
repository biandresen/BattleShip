import { ViewModel } from "./viewModel";

export function Model() {
  class Ship {
    constructor(name, life, size) {
      this.name = name;
      this.life = life;
      this.size = size;
      this.destroyed = false;
      this.boardPlacement = [];
    }
    hit() {
      if (this.life > 0) {
        this.life--;
      }
      this.checkShipLifeStatus();
    }
    checkShipLifeStatus() {
      if (this.life <= 0) {
        this.destroyed = true;
      }
    }
    setBoardPlacement(position) {
      this.boardPlacement = position;
    }
    isHitAtPosition(x, y) {
      return this.boardPlacement.some(
        (position) => position.x === x && position.y === y
      );
    }
  }

  function createShips() {
    const player1Ship1 = new Ship("carrier", 5, 5);
    const player1Ship2 = new Ship("battleship", 4, 4);
    const player1Ship3 = new Ship("cruiser", 3, 3);
    const player1Ship4 = new Ship("submarine", 3, 3);
    const player1Ship5 = new Ship("destroyer", 2, 2);

    const player2Ship1 = new Ship("carrier", 5, 5);
    const player2Ship2 = new Ship("battleship", 4, 4);
    const player2Ship3 = new Ship("cruiser", 3, 3);
    const player2Ship4 = new Ship("submarine", 3, 3);
    const player2Ship5 = new Ship("destroyer", 2, 2);
  }

  return {
    createShips,
  };
}
