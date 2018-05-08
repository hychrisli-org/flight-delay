import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import trip from './trip/reducer'
import locations from './stores/locations-reducer'
import schedules from './stores/schedules-reducer'
import myflight from './stores/myflight-reducer'
import weather from './weather/reducer'
import arrivalWeather from './stores/arrival-weather-reducer'
import predict from './predict/reducer'

const IndexReducer = combineReducers({
  form,
  trip,
  schedules,
  locations,
  myflight,
  weather,
  arrivalWeather,
  predict
});

export default IndexReducer;