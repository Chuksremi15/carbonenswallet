import {
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../types";

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const registerRequest = (prop) => {
  return {
    type: REGISTER_REQUEST,
    payload: prop,
  };
};

export const registerSuccess = (prop) => {
  return {
    type: REGISTER_SUCCESS,
    payload: prop,
  };
};

export const registerFailure = (errors) => {
  return {
    type: REGISTER_FAIL,
    payload: { errors },
  };
};

export const registerLoading = (loading) => {
  return {
    type: REGISTER_LOADING,
    payload: loading,
  };
};
