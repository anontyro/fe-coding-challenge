import { createStore, applyMiddleware } from "redux";

import thunkMiddleware from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import rootReducer from "./reducers";

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, initialState, composedEnhancers);

  return store;
}
