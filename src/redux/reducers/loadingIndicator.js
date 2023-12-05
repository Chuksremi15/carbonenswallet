import { REGISTER_LOADING } from "../types";

const initialState = {
  registerLoading: false,
};

const loadingIndicator = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_LOADING:
      return {
        ...state,
        registerLoading: payload,
      };

    default:
      return state;
  }
};

export default loadingIndicator;
