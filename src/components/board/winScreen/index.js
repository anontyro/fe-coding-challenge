import React from "react";
import "./index.css";

const WinScreen = ({ winner, resetGame }) => (
  <>
    <div className="game-winner-underlay"></div>
    <div className="game-winner">
      <div className="game-winner-title">Winner: {winner}</div>
      <button className="game-winner-action" onClick={resetGame}>
        Play Again
      </button>
    </div>
  </>
);

export default WinScreen;
