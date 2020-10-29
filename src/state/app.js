import { types } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.PAYLOAD:
      var payload = action.payload
      return { ...state, payload };
    default:
      return state;
  }
};