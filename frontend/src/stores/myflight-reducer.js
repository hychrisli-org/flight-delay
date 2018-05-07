import {MY_FLIGHT_SET} from "./constants";

const initialState = {
  flight: null
};

const reducer = function schedulesReducer(state = initialState, action) {

  switch(action.type) {
    case MY_FLIGHT_SET:
      return {
        flight: action.flight
      };
    default:
      return state;
  }

};

export default reducer;