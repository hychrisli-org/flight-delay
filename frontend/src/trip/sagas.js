import moment from 'moment'
import momentTz from 'moment-timezone'
import base64 from 'base-64';
import queryString from 'query-string'
import {call, put, takeLatest} from 'redux-saga/effects'
import rest from "restler";


import {
  SCHEDULE_REQUESTING,
  SCHEDULE_SUCCESS,
  SCHEDULE_ERROR
} from './constants';
import {handleApiErrors} from "../lib/api-errors";
import {setSchedules} from "../schedules/actions";


const airportUrl = `${process.env.REACT_APP_FLIGHTAWARE_URL}/AirportInfo`;
const scheduleUrl = `${process.env.REACT_APP_FLIGHTAWARE_URL}/AirlineFlightSchedules`;
const username = `${process.env.REACT_APP_FLIGHTWARE_USERNAME}`;
const password = `${process.env.REACT_APP_FLIGHTWARE_PASSWORD}`;


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


  /*return fetch(url, {
    method: 'GET'
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .then(error => {throw error})*/

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
    const originObj = yield call(airportApi, origin);
    console.log(originObj);

    const dest = form.toAirport.iata;
    const destObj = yield call(airportApi, dest);
    console.log(destObj);

    let timezone = originObj.AirportInfoResult.timezone;
    timezone=timezone.substring(1);
    console.log(timezone);

    let startDate = moment.tz(dateStr, timezone);
    startDate = startDate.unix();
    const endDate = startDate + 86400;

    let flights = yield call(tripApi, startDate, endDate, origin, dest, form.airline, 10)
    flights = flights.AirlineFlightSchedulesResult.data;
    console.log("my Results ", flights);

    yield put({type: SCHEDULE_SUCCESS});
    yield put(setSchedules(flights))

  } catch (error) {
    yield put({type: SCHEDULE_ERROR, error});
  }
}

function* tripWatcher(){
  yield takeLatest(SCHEDULE_REQUESTING, tripFlow)
}

export default tripWatcher;