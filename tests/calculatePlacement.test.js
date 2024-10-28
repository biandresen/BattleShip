import { describe, it, expect, vi, afterEach } from "vitest";

//* FUNCTIONS:
// This function is what we’re testing (calculatePlacement)

// Generates a random starting coordinate (0-99).
// Decides randomly between vertical (up or down) and horizontal (left or right) placement.
// Builds an array based on the direction and the ship’s size (ship.life).
// Calls formatCoordinatesToMatchID to format coordinates before returning them.

function calculatePlacement(ship) {
  //Choosing a random coordinate to begin the placement from between 0-99
  const coordinate = Math.floor(Math.random() * 100);
  //Choosing vertical or horizontal placement randomly. Number between 0-1
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
// This function takes an array of numbers (placement) and converts each
// coordinate to a string, padding single-digit numbers with a leading “0.”
function formatCoordinatesToMatchID(placement) {
  const formattedPlacement = placement.map((coordinate) => {
    if (coordinate < 10) {
      return "0" + coordinate;
    }
    return coordinate.toString();
  });
  return formattedPlacement;
}

//* TESTING START
describe("calculatePlacement", () => {
  it("should generate vertical placement when direction is 0 and give ascending coordinates", () => {
    const ship = { life: 3 }; //life: 3, should generate 3 coordinates
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.3) // coordinate = 20
      .mockReturnValueOnce(0); // directionOfPlacement = 0 (vertical)

    const result = calculatePlacement(ship);

    expect(result).toEqual(["30", "40", "50"]);
  });

  it("should generate horizontal placement when direction is 1 and give ascending coordinates", () => {
    const ship = { life: 3 };
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.03) // coordinate = 3
      .mockReturnValueOnce(0.8); // directionOfPlacement = 1 (horizontal)

    const result = calculatePlacement(ship);

    expect(result).toEqual(["03", "04", "05"]);
  });

  it("should generate vertical placement when direction is 0 and give descending coordinates", () => {
    const ship = { life: 5 }; //life: 5, should generate 3 coordinates
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.7) // coordinate = 20
      .mockReturnValueOnce(0); // directionOfPlacement = 0 (vertical)

    const result = calculatePlacement(ship);

    expect(result).toEqual(["70", "60", "50", "40", "30"]);
  });

  it("should generate horizontal placement when direction is 1 and give descending coordinates", () => {
    const ship = { life: 4 };
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.79) // coordinate = 3
      .mockReturnValueOnce(0.8); // directionOfPlacement = 1 (horizontal)

    const result = calculatePlacement(ship);

    expect(result).toEqual(["79", "78", "77", "76"]);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
});
//* TESTING END
