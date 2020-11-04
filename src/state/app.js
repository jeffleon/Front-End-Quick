import { types } from "../actions/types";
/* Reducer of payload that store the payload to do the post request in the future */
export default (state = {}, action) => {
  switch (action.type) {
    case types.PAYLOAD:
      var payload = action.payload
      return { ...state, payload };
    default:
      return state;
  }
};