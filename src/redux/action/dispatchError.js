import { DISPATCH_ERROR, CLEAR_ERROR_STATE } from "../types";

export const dispatchError = (prop) => {
  return {
    type: DISPATCH_ERROR,
    payload: prop,
  };
};
export const clearError = (prop) => {
  return {
    type: CLEAR_ERROR_STATE,
    payload: prop,
  };
};
