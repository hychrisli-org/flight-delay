import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import trip from './trip/reducer';


const IndexReducer = combineReducers({
  form,
  trip
});

export default IndexReducer;