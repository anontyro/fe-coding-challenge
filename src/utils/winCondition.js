const hasReachedWinCondition = (board) => {
  let hasWon = null;
  // check if row is complete
  for (let i = 0; i < board.length; i++) {
    if (board[i].every((cell) => cell === board[i][0])) {
      if (board[i][0] !== null) {
        hasWon = board[i][0];
      }
    }
  }

  // check if column is complete
  for (let i = 0; i < board[0].length; i++) {
    let column = [];
    for (let j = 0; j < board.length; j++) {
      column.push(board[j][i]);
    }
    if (column.every((cell) => cell === column[0])) {
      if (column[0] !== null) {
        hasWon = column[0];
      }
    }
  }

  // check if diagonal is complete
  let diagonal = [];
  for (let i = 0; i < board.length; i++) {
    diagonal.push(board[i][i]);
  }
  if (diagonal.every((cell) => cell === diagonal[0])) {
    if (diagonal[0] !== null) {
      hasWon = diagonal[0];
    }
  }

  // check if reverse diagonal is complete
  let reverseDiagonal = [];
  for (let i = 0; i < board.length; i++) {
    reverseDiagonal.push(board[i][board.length - i - 1]);
  }
  if (reverseDiagonal.every((cell) => cell === reverseDiagonal[0])) {
    if (reverseDiagonal[0] !== null) {
      hasWon = reverseDiagonal[0];
    }
  }

  return hasWon;
};

export default hasReachedWinCondition;
