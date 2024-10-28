import { describe, it, expect, beforeEach } from "vitest";

//* HELPER:
let occupiedSquares;

//* FUNCTION:
function positionIsTaken(ship) {
  const flattenArray = occupiedSquares.flat();
  console.log(flattenArray);
  return ship.boardPlacement.some((coordinate) =>
    flattenArray.includes(coordinate)
  );
}

//* TESTING START:
describe("positionIsTaken", () => {
  beforeEach(() => {
    // Reset occupiedSquares before each test
    occupiedSquares = [];
  });

  it("should return true when a position is taken (overlap exists)", () => {
    occupiedSquares = [
      ["12", "13", "14"],
      ["22", "23", "24"],
    ];
    const ship = { boardPlacement: ["12", "15", "16"] };
    const result = positionIsTaken(ship);
    expect(result).toBe(true);
  });

  it("should return false when no positions are taken (no overlap)", () => {
    occupiedSquares = [
      ["12", "13", "14"],
      ["22", "23", "24"],
    ];
    const ship = { boardPlacement: ["30", "31", "32"] };
    const result = positionIsTaken(ship);
    expect(result).toBe(false);
  });

  it("should return false when occupiedSquares is empty", () => {
    occupiedSquares = [];
    const ship = { boardPlacement: ["13", "15", "16"] };
    const result = positionIsTaken(ship);
    expect(result).toBe(false);
  });

  it("should return false when ship.boardPlacement is empty", () => {
    occupiedSquares = [
      ["12", "13", "14"],
      ["22", "23", "24"],
    ];
    const ship = { boardPlacement: [] };
    const result = positionIsTaken(ship);
    expect(result).toBe(false);
  });
});

//* TESTING END
