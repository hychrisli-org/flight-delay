import {LOCATIONS_SET} from "./constants";

const initialState = {
  origin: null,
  dest: null
};

const reducer = function schedulesReducer(state = initialState, action) {

  switch(action.type) {
    case LOCATIONS_SET:
      return {
        origin: action.origin,
        dest: action.dest
      };
    default:
      return state;
  }

};

export default reducer;