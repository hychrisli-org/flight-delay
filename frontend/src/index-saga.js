import TripSaga from './trip/sagas'
import WeatherSaga from './weather/sagas'
import PredictSaga from './predict/sagas'

export default function* IndexSage(){
  yield[
    TripSaga(),
    WeatherSaga(),
    PredictSaga()
  ]
}