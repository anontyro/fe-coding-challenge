import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { checkWinner, SET_WINNER } from "./player";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const winningBoardX = [
  ["X", "X", "X"],
  ["O", "O", null],
  [null, null, "O"],
];

const incompleteBoard = [
  ["X", null, "X"],
  ["O", "O", null],
  [null, null, "O"],
];

test("when no win condition is reached no action fired", () => {
  const store = mockStore({ board: incompleteBoard });
  store.dispatch(checkWinner());
  expect(store.getActions()).toEqual([]);
});

test("when a win condition is reached the setWinner will be fired", () => {
  const store = mockStore({
    board: winningBoardX,
    game: {
      currentPlayer: "X",
      winner: null,
    },
  });

  store.dispatch(checkWinner());

  const actions = store.getActions();
  expect(actions[0].type).toBe(SET_WINNER);
  expect(actions[0].player).toBe("X");
});
