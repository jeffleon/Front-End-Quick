import { types } from "./types";

export const payloadFunction = (data) => (dispatch) => {
      dispatch({
        type: types.PAYLOAD,
        payload: data,
      });
};
/*
export const scriptFunction = (data) => (dispatch) =>{
    dispatch({
      type: types.VERIFICATIONSCRIPT,
      validation: data,
    })
}
*/
export const dataPostFunction = (dataPost) => (dispatch) => {
  dispatch({
    type: types.POST,
    post: dataPost
  })
}