import moment from 'moment'
import 'moment-timezone'
import queryString from 'query-string'
import {call, put, takeLatest} from 'redux-saga/effects'


import {
  SCHEDULE_REQUESTING,
  SCHEDULE_SUCCESS,
  SCHEDULE_ERROR
} from './constants';
import {handleApiErrors} from "../lib/api-errors";
import {setLocations, setSchedules} from "../stores/actions";


const airportUrl = `${process.env.REACT_APP_FLIGHTAWARE_URL}/AirportInfo`;
const scheduleUrl = `${process.env.REACT_APP_FLIGHTAWARE_URL}/AirlineFlightSchedules`;

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms);
    promise.then(resolve, reject)
  })
}



function tripApi(startDate, endDate, origin, destination, airline,howMany){
  const params = {startDate, endDate, origin, destination, airline,howMany, offset: 0};
  const url = `http://localhost:8080/${scheduleUrl}?${queryString.stringify(params)}`;

  return timeout(5000, fetch(url, {
    method: 'GET'
  }))
    .then(response => {
      const json = response.json();
      console.log(json);
      return json

    })
    .catch(handleApiErrors);
}

function airportApi(icao){

  const params = {airportCode: icao};
  const url = `http://localhost:8080/${airportUrl}?${queryString.stringify(params)}`;

  return fetch(url, {
    method: 'GET'
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {throw error})
}

function* tripFlow(action){

  try {
    const{form} = action;
    let dateStr = form.date.toISOString().slice(0,10) + "T00:00:00";
    console.log("Date String", dateStr);

    //startDate = new Date(form.date).getTIm / 1000;
    const origin = form.fromAirport.iata;
    let originObj = yield call(airportApi, origin);
    originObj.AirportInfoResult.timezone = originObj.AirportInfoResult.timezone.substring(1);
    console.log(originObj);

    const dest = form.toAirport.iata;
    let destObj = yield call(airportApi, dest);
    destObj.AirportInfoResult.timezone = destObj.AirportInfoResult.timezone.substring(1);
    console.log(destObj);

    let timezone = originObj.AirportInfoResult.timezone;
    console.log(timezone);

    let startDate = moment.tz(dateStr, timezone);
    startDate = startDate.unix();
    const endDate = startDate + 86400;

    let flights = yield call(tripApi, startDate, endDate, origin, dest, form.airline, 10);
    flights = flights.AirlineFlightSchedulesResult.data;
    console.log("my Results ", flights);

    yield put({type: SCHEDULE_SUCCESS});
    yield put(setLocations(originObj.AirportInfoResult, destObj.AirportInfoResult));
    yield put(setSchedules(flights))

  } catch (error) {
    yield put({type: SCHEDULE_ERROR, error});
  }
}

function* tripWatcher(){
  yield takeLatest(SCHEDULE_REQUESTING, tripFlow)
}

export default tripWatcher;