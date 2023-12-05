import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducers from "./reducers";
import rootSaga from "./sagas";
import { persistStore } from "redux-persist";

const sagaMiddleWare = createSagaMiddleware();

const initialState = {};

export const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);

export const persistor = persistStore(store);
sagaMiddleWare.run(rootSaga);
