import { ViewModel } from "./viewModel";

export function Model() {
  class Ship {
    constructor(shipType, life, color) {
      this.shipType = shipType;
      this.life = life;
      this.color = color;
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
    isHitAtPosition(x, y) {
      return this.boardPlacement.some(
        (position) => position.x === x && position.y === y
      );
    }
  }

  function createShip(shipType, life, color) {
    return new Ship(shipType, life, color);
  }

  return {
    createShip,
  };
}
