import { types } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.POST:
      console.log(state);
      console.log("entre a type: post", action.post);
      var dataPost = action.post;
      return { ...state, dataPost};
    default:
      return state;
  }
};