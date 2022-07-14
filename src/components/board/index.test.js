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

it("when a player wins the game the win screen is displayed", async () => {
  render(
    <Provider store={configureStore()}>
      <Board />
    </Provider>
  );

  await fireEvent.click(screen.getAllByTestId("board-cell")[0]);
  await fireEvent.click(screen.getAllByTestId("board-cell")[4]);
  await fireEvent.click(screen.getAllByTestId("board-cell")[1]);
  await fireEvent.click(screen.getAllByTestId("board-cell")[5]);
  await fireEvent.click(screen.getAllByTestId("board-cell")[2]);

  expect(screen.getByText("Winner: X")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Play Again" })
  ).toBeInTheDocument();
});

it("when the player wins and clicks the play again the board will reset", async () => {
  render(
    <Provider store={configureStore()}>
      <Board />
    </Provider>
  );

  await fireEvent.click(screen.getAllByTestId("board-cell")[0]);
  await fireEvent.click(screen.getAllByTestId("board-cell")[4]);
  await fireEvent.click(screen.getAllByTestId("board-cell")[1]);
  await fireEvent.click(screen.getAllByTestId("board-cell")[5]);
  await fireEvent.click(screen.getAllByTestId("board-cell")[2]);

  const playAgain = screen.getByRole("button", { name: "Play Again" });
  await fireEvent.click(playAgain);

  const winTextNoLongerPresent = screen.queryByText("Winner: X");
  expect(winTextNoLongerPresent).toBeNull();

  const playAgainNotPresent = screen.queryByRole("button", {
    name: "Play Again",
  });
  expect(playAgainNotPresent).toBeNull();

  screen.getAllByTestId("board-cell").forEach((cell) => {
    expect(cell.textContent).toBe("click");
  });
});
