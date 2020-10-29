import { types } from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case types.VERIFICATIONSCRIPT:
            var validation = action.validation
            return { ...state, validation };
        default:
            return state
    }

}