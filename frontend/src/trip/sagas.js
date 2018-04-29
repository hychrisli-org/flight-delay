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


const airportUrl = `${process.env.REACT_APP_FLIGHTAWARE_URL}/AirportInfo`;
const scheduleUrl = `${process.env.REACT_APP_FLIGHTAWARE_URL}/AirlineFlightSchedules/`;
const username = `${process.env.REACT_APP_FLIGHTWARE_USERNAME}`;
const password = `${process.env.REACT_APP_FLIGHTWARE_PASSWORD}`;


function tripApi(query){
}

function airportApi(icao){

  const params = {airportCode: icao};
  const url = `http://localhost:8080/${airportUrl}?${queryString.stringify(params)}`;

  return fetch(url, {
    method: 'GET'
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json})
    .catch(error => {throw error})
}

function* tripFlow(action){

  try {
    console.log(action);
    const{form} = action;
    console.log(form);
    //startDate = new Date(form.date).getTIm / 1000;
    //startDate = momentTz.tz(form.date, 'YYYY-MM-DD');
    const origin = form.fromAirport.iata;
    console.log(origin);
    const response = yield call(airportApi, origin);
    console.log(response);
    //destination = form.toAirport;
    //airline = form.airline;
    //const response = yield call(tripApi, {startDate, orgin, })

  } catch (error) {
    yield put({type: SCHEDULE_ERROR, error});
  }
}

function* tripWatcher(){
  yield takeLatest(SCHEDULE_REQUESTING, tripFlow)
}

export default tripWatcher;