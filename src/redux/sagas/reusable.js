// import axios from "./axios";
export const clientErrorMessage =
  "Could not send request. Kindly check your internet connection";

export const delay = (time = 4000) =>
  new Promise((resolve) => setTimeout(resolve, time));
