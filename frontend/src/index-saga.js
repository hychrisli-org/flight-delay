import TripSaga from './trip/sagas'

export default function* IndexSage(){
  yield[
    TripSaga(),
  ]
}