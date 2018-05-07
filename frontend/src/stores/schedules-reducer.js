import {SCHEDULES_SET} from "./constants";

const initialState = {
  schedules: null
};

const reducer = function schedulesReducer(state = initialState, action) {

  switch(action.type) {
    case SCHEDULES_SET:
      return { schedules: action.schedules};
    default:
      return state;
  }

};

export default reducer;