import React from "react";
import "./index.css";

const BoardColumn = ({ column, columnIndex, handlePlay }) => (
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

export default BoardColumn;
