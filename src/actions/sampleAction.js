import { types } from "./types";

export const payloadFunction = (data) => (dispatch) => {
      dispatch({
        type: types.PAYLOAD,
        payload: data,
      });
};
