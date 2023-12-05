import { spawn } from "redux-saga/effects";
import authSagas from "./auth";

export default function* rootSaga() {
  yield spawn(authSagas);
}
