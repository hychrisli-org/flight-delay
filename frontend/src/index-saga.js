import TripSaga from './trip/sagas'
import WeahterSaga from './weather/sagas'

export default function* IndexSage(){
  yield[
    TripSaga(),
    WeahterSaga()
  ]
}