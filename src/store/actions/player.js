import hasReachedWinCondition from "../../utils/winCondition";

export const SET_WINNER = "SET_WINNER";

const setWinner = (player) => ({
  type: SET_WINNER,
  player,
});

export const checkWinner = () => (dispatch, getState) => {
  const board = getState().board;
  const winner = hasReachedWinCondition(board);
  if (winner) {
    dispatch(setWinner(winner));
  }
};
