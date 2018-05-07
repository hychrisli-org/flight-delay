import {
  WEATHER_REQUESTING,
  WEATHER_ERROR,
  WEATHER_SUCCESS
} from "./constants";

const intialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = (state=intialState, action) => {
  switch(action.type) {
    case WEATHER_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{body: "Requesting...", time: new Date()}],
        errors: [],
      };
    case WEATHER_SUCCESS:
      return {
        requesting: false,
        successful: true,
        messages: [],
        errors: []
      };
    case WEATHER_ERROR:
      return {
        requesting: false,
        successful: false,
        messages:[],
        errors: state.errors.concat([{
          body: action.error.toString,
          time: new Date(),
        }])
      };
    default:
      return state;
  }
};

export default reducer;