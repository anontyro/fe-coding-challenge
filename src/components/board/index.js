import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCell } from "../../store/actions/moves";

const BoardColumn = ({ column, columnIndex, handlePlay }) => {
  return (
    <div className="board-column">
      {column.map((cell, cellIndex) => {
        return (
          <div
            key={cellIndex}
            className="board-cell"
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

const getRandomCell = (i) => Math.floor(Math.random() * i);

export const Board = () => {
  const board = useSelector(selectBoard);
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  const handlePlay = (currentPlayer) => (rowNumber, columnNumber) => {
    dispatch(selectCell(currentPlayer, rowNumber, columnNumber));
  };

  return (
    <div className="Board">
      {/* Board: {JSON.stringify(board)} */}
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
      <div
        onClick={() =>
          dispatch(
            selectCell(
              game.currentPlayer,
              getRandomCell(board.length),
              getRandomCell(board.length)
            )
          )
        }
      >
        Player {game.currentPlayer}
      </div>
    </div>
  );
};
