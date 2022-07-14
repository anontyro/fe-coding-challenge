import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Board } from ".";
import configureStore from "../../store";
import { Provider } from "react-redux";

test("renders Board text", () => {
  render(
    <Provider store={configureStore()}>
      <Board />
    </Provider>
  );
  const boardText = screen.getByText(/Board/i);
  expect(boardText).toBeInTheDocument();
});

test("renders the board correctly as empty on inital load", () => {
  const store = configureStore();
  render(
    <Provider store={store}>
      <Board />
    </Provider>
  );

  const boardColumns = screen.getAllByTestId("board-cell");
  expect(boardColumns.length).toBe(9);
  boardColumns.forEach((cell) => {
    expect(cell.textContent).toBe("click");
  });
});

test("when a cell is clicked it should be filled with the current player's symbol", async () => {
  render(
    <Provider store={configureStore()}>
      <Board />
    </Provider>
  );
  const boardColumns = screen.getAllByTestId("board-cell");
  const firstCell = boardColumns[0];

  await fireEvent.click(firstCell);

  expect(screen.getAllByTestId("board-cell")[0].textContent).toBe("X");
});

it("when more than one cell is clicked player symbols will alternate", async () => {
  render(
    <Provider store={configureStore()}>
      <Board />
    </Provider>
  );

  await fireEvent.click(screen.getAllByTestId("board-cell")[0]);
  await fireEvent.click(screen.getAllByTestId("board-cell")[1]);

  expect(screen.getAllByTestId("board-cell")[0].textContent).toBe("X");
  expect(screen.getAllByTestId("board-cell")[1].textContent).toBe("O");
});
