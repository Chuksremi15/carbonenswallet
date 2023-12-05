import axios from "axios";
import { store } from "../store";
import { logout, dispatchError } from "../action";

export const BASE_URL_SOCKET = "https://farmgrid-referral-api.herokuapp.com";
export const BASE_URL = "https://farmgrid-referral-api.herokuapp.com/api/v1/";
export const BASE_URL_DEV = "http://localhost:5000/api/v1";

const instance = axios.create({
  baseURL: BASE_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const { status, statusText } = err.response;
    switch (status) {
      case 503:
      case 500:
      case 506:
        store.dispatch(dispatchError({ status, statusText }));
        break;
      // case 403:
      //   store.dispatch(logout());
      //   break;
      default:
        break;
    }
    if (err.response) {
      console.log("Yes it has expired");
      console.log(err.response);
      if (err.response.data.message === "Unauthenticated") {
        console.log("Yes it has expired");
        // store.dispatch(logout());
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
