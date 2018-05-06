import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import trip from './trip/reducer';
import schedules from './schedules/reducer'


const IndexReducer = combineReducers({
  form,
  trip,
  schedules
});

export default IndexReducer;