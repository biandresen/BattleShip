import { describe, it, expect } from "vitest";

function positionIsTaken(array1, array2) {
  return array1.some((coordinate) => array2.includes(coordinate));
}

describe("position is taken", () => {
  it("should return false if any num in the arrays are dissimilar", () => {
    expect(
      positionIsTaken(
        ["11", "55", "43", "98", "04"],
        ["10", "54", "42", "97", "03"]
      )
    ).toBeFalsy();
  });
  it("should return true if any num in the arrays are similar", () => {
    expect(
      positionIsTaken(
        ["11", "55", "43", "98", "04"],
        ["11", "54", "42", "97", "03"]
      )
    ).toBeTruthy();
  });
});
