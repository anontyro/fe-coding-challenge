import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCell } from "../../store/actions/moves";
import { checkWinner } from "../../store/actions/player";
import { resetGame } from "../../store/actions/game";

const BoardColumn = ({ column, columnIndex, handlePlay }) => {
  return (
    <div className="board-column">
      {column.map((cell, cellIndex) => {
        return (
          <div
            key={cellIndex}
            className="board-cell"
            data-testid="board-cell"
            onClick={() => handlePlay(columnIndex, cellIndex)}
          >
            <div className="board-cell-contents">{cell ?? "click"}</div>
          </div>
        );
      })}
    </div>
  );
};

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
        <>
          <div className="game-winner-underlay"></div>
          <div className="game-winner">
            <div className="game-winner-title">Winner: {game.winner}</div>
            <button
              className="game-winner-action"
              onClick={() => dispatch(resetGame())}
            >
              Play Again
            </button>
          </div>
        </>
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
