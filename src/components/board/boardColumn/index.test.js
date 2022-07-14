import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BoardColumn, { DEFAULT_CELL_TEXT } from ".";

test("will correctly render out the column with each cell containing click", () => {
  const column = [null, null, null];
  const columnIndex = 2;
  const handlePlay = (colIndex, cellIndex) => {};
  render(
    <BoardColumn
      column={column}
      columnIndex={columnIndex}
      handlePlay={handlePlay}
    />
  );

  const boardColumns = screen.getAllByTestId("board-cell");
  expect(boardColumns.length).toBe(3);
  boardColumns.forEach((cell) => {
    expect(cell.textContent).toBe(DEFAULT_CELL_TEXT);
  });
});

test("will correctly render cells with their defined value instead of the default", () => {
  const column = ["X", null, "O"];
  const columnIndex = 2;
  const handlePlay = (colIndex, cellIndex) => {};
  render(
    <BoardColumn
      column={column}
      columnIndex={columnIndex}
      handlePlay={handlePlay}
    />
  );

  const boardColumns = screen.getAllByTestId("board-cell");
  boardColumns.forEach((cell, index) => {
    expect(cell.textContent).toBe(column[index] ?? DEFAULT_CELL_TEXT);
  });
});

test("will correctly allow the user to update the call for clicking on a cell", () => {
  const column = [null, null, "O"];
  const columnIndex = 2;
  const handleValues = [];
  const handlePlay = (colIndex, cellIndex) =>
    handleValues.push({ colIndex, cellIndex });
  render(
    <BoardColumn
      column={column}
      columnIndex={columnIndex}
      handlePlay={handlePlay}
    />
  );

  const boardColumns = screen.getAllByTestId("board-cell");
  const firstCell = boardColumns[0];

  fireEvent.click(firstCell);

  expect(handleValues).toEqual([{ colIndex: 2, cellIndex: 0 }]);
});

test("will correctly prevent the user from overriding the existing value in the cell on cl", () => {
  const column = ["O", null, "O"];
  const columnIndex = 2;
  const handleValues = [];
  const handlePlay = (colIndex, cellIndex) =>
    handleValues.push({ colIndex, cellIndex });
  render(
    <BoardColumn
      column={column}
      columnIndex={columnIndex}
      handlePlay={handlePlay}
    />
  );

  const boardColumns = screen.getAllByTestId("board-cell");
  const firstCell = boardColumns[0];

  fireEvent.click(firstCell);

  expect(handleValues).toEqual([]);
});
