import {
  PREDICT_REQUESTING,
  PREDICT_ERROR,
  PREDICT_SUCCESS
} from "./constants";

const intialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = (state=intialState, action) => {
  switch(action.type) {
    case PREDICT_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{body: "Requesting...", time: new Date()}],
        errors: [],
      };
    case PREDICT_SUCCESS:
      return {
        requesting: false,
        successful: true,
        messages: [],
        errors: []
      };
    case PREDICT_ERROR:
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