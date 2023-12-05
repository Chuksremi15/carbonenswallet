import { REGISTER_FAIL, REGISTER_SUCCESS } from "../types";

const initialState = {
  errors: {},
  success: {},
};

const ajaxStatuses = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_FAIL:
      state.errors.register = payload.errors;
      return { ...state };
    case REGISTER_SUCCESS:
      state.success.register = payload.message;
      return { ...state };

    default:
      return state;
  }
};

export default ajaxStatuses;
