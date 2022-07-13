import hasReachedWinCondition from "./winCondition";

describe("hasReachedWinCondition", () => {
  it("should return false if the board is empty", () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    expect(hasReachedWinCondition(board)).toBe(false);
  });

  it("should return true if one row is full of same item", () => {
    const board = [
      ["X", "X", "X"],
      ["O", "O", null],
      [null, null, "O"],
    ];
    expect(hasReachedWinCondition(board)).toBe(true);
  });

  it("should return true if column is complete", () => {
    const board = [
      ["X", "O", null],
      ["X", "O", null],
      ["X", null, "O"],
    ];
    expect(hasReachedWinCondition(board)).toBe(true);
  });

  it("should return true if diagonal is complete", () => {
    const board = [
      ["X", "O", null],
      [null, "X", "O"],
      [null, null, "X"],
    ];
    expect(hasReachedWinCondition(board)).toBe(true);
  });

  it("should return true if reverse diagonal is complete", () => {
    const board = [
      ["O", "X", "O"],
      [null, "O", "O"],
      ["O", null, "X"],
    ];
    expect(hasReachedWinCondition(board)).toBe(true);
  });

  it("should return false if no win condition is met yet", () => {
    const board = [
      [null, "O", "O"],
      ["O", null, "X"],
      ["X", "O", null],
    ];
    expect(hasReachedWinCondition(board)).toBe(false);
  });

  it("should return false if none win but the board is full", () => {
    const board = [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["X", "O", "O"],
    ];
    expect(hasReachedWinCondition(board)).toBe(false);
  });
});
