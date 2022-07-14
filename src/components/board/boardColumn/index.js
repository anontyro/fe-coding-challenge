import React from "react";
import "./index.css";

export const DEFAULT_CELL_TEXT = "click";

const BoardColumn = ({ column, columnIndex, handlePlay }) => (
  <div className="board-column">
    {column.map((cell, cellIndex) => {
      return (
        <div
          key={cellIndex}
          className="board-cell"
          data-testid="board-cell"
          onClick={() => {
            if (cell) {
              return;
            }
            handlePlay(columnIndex, cellIndex);
          }}
        >
          <div className="board-cell-contents">{cell ?? DEFAULT_CELL_TEXT}</div>
        </div>
      );
    })}
  </div>
);

export default BoardColumn;
