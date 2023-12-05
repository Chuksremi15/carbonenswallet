import axios from "./axios";
import { call, put, takeLatest, spawn } from "redux-saga/effects";

import { REGISTER_REQUEST } from "../types";
import { clientErrorMessage, delay } from "./reusable";
import { registerFailure, registerLoading, registerSuccess } from "../action";

const ajaxDBCalls = {
  register: async ({ formData, refId }) => {
    console.log({ formData, refId });
    if (refId) {
      const response = await axios.post(
        `/auth/register?refId=${refId}`,
        formData
      );
      return response;
    } else {
      const response = await axios.post(`/auth/register`, formData);
      return response;
    }
  },
};

function* register({ payload }) {
  try {
    yield put(registerLoading(true));

    const res = yield call(ajaxDBCalls.register, payload);

    yield put(registerSuccess(res.data));

    yield put(registerLoading(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;

    if (err.response) {
      console.log("something is wrong", err.response.data);

      const { message } = err.response.data;
      errorMessage = message;
    }

    yield put(registerFailure(errorMessage));
    yield put(registerLoading(false));
    yield delay();
    yield put(registerFailure(""));
  }
}

//Watchers
function* registerWatcher() {
  yield takeLatest(REGISTER_REQUEST, register);
}

export default function* authSagas() {
  yield spawn(registerWatcher);
}
