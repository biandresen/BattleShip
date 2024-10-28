import { describe, it, expect, beforeEach } from "vitest";

//* HELPER:
let occupiedSquares = [];

//* FUNCTION:
function updateOccupiedSquares(ship) {
  occupiedSquares.push(ship.boardPlacement);
}

//* TESTS START:
describe("updateOccupiedSquares", () => {
  beforeEach(() => {
    // Reset occupiedSquares before each test
    occupiedSquares = [];
  });

  it("should add the ships boardPlacement to occupiedSquares", () => {
    const ship = { boardPlacement: [10, 11, 12] };
    updateOccupiedSquares(ship);

    expect(occupiedSquares).toEqual([[10, 11, 12]]);
  });

  it("should add multiple boardPlacements to occupiedSquares in order", () => {
    const ship1 = { boardPlacement: [10, 11, 12] };
    const ship2 = { boardPlacement: [20, 21, 22] };

    updateOccupiedSquares(ship1);
    updateOccupiedSquares(ship2);

    expect(occupiedSquares).toEqual([
      [10, 11, 12],
      [20, 21, 22],
    ]);
  });

  it("should only contain specified placements without additional data", () => {
    const ship = { boardPlacement: [5, 6, 7] };
    updateOccupiedSquares(ship);

    // Check that no other data is in occupiedSquares
    expect(occupiedSquares).not.toContain([8, 9, 10]);
    expect(occupiedSquares).toEqual([[5, 6, 7]]);
  });
});
//* TESTS END
