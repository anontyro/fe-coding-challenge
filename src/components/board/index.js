import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCell } from "../../store/actions/moves";
import { checkWinner } from "../../store/actions/player";
import { resetGame } from "../../store/actions/game";
import WinScreen from "./winScreen";
import BoardColumn from "./boardColumn";

const selectBoard = (state) => state.board;
const selectGame = (state) => state.game;

export const Board = () => {
  const board = useSelector(selectBoard);
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  const handlePlay = (currentPlayer) => (rowNumber, columnNumber) => {
    dispatch(selectCell(currentPlayer, rowNumber, columnNumber));
    dispatch(checkWinner());
  };

  return (
    <div className="Board">
      {game.winner && (
        <WinScreen
          winner={game.winner}
          resetGame={() => dispatch(resetGame())}
        />
      )}
      <div>Board:</div>
      <div className="game-board">
        {board.map((col, i) => (
          <BoardColumn
            key={Date.now() + i}
            column={col}
            columnIndex={i}
            handlePlay={handlePlay(game.currentPlayer)}
          />
        ))}
      </div>
      <div className="game-player">Player {game.currentPlayer}</div>
    </div>
  );
};
