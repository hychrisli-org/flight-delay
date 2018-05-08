import {PRED_RESULT_SET} from "./constants";

const initialState = {
  origin: null,
  dest: null
};

const reducer = function schedulesReducer(state = initialState, action) {

  switch(action.type) {
    case PRED_RESULT_SET:
      return {
        pred: action.pred,
      };
    default:
      return state;
  }

};

export default reducer;