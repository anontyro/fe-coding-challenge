import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WinScreen from ".";

test("will correctly render out the win screen", () => {
  const winner = "X";
  render(<WinScreen winner={winner} resetGame={() => {}} />);

  expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Play Again" })
  ).toBeInTheDocument();
});

test("will correctly fire the play again button when pressed", () => {
  let pressed = 0;
  const winner = "X";
  const resetGame = () => pressed++;
  render(<WinScreen winner={winner} resetGame={resetGame} />);

  fireEvent.click(screen.getByRole("button", { name: "Play Again" }));
  expect(pressed).toBe(1);
});
