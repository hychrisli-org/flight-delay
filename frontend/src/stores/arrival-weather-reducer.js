import {ARRIVAL_WEATHER_SET} from "./constants";

const initialState = {
  flight: null
};

const reducer = function schedulesReducer(state = initialState, action) {

  switch(action.type) {
    case ARRIVAL_WEATHER_SET:
      return {
        weather: action.weather
      };
    default:
      return state;
  }

};

export default reducer;