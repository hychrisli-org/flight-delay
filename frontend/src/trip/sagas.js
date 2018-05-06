//import moment from 'moment'
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
    .then(json => json)
    .catch(error => {throw error})
}

function* tripFlow(action){

  try {
    console.log(action);
    const{form} = action;
    console.log(form);
    let date = new Date(form.date);
    date = new (date.setHours(0));
    console.log(date);



    //startDate = new Date(form.date).getTIm / 1000;
/*
    const originIata = form.fromAirport.iata;
    const origin = yield call(airportApi, originIata);
    console.log(origin);

    const destIata = form.toAirport.iata;
    const dest = yield call(airportApi, destIata);
    console.log(dest);

    let timezone = origin.AirportInfoResult.timezone;
    timezone=timezone.substring(1);
    console.log(timezone);
    let startDate = momentTz(form.date, timezone);
    console.log(startDate);
    console.log(startDate.tz("America/Los_Angeles").format())
    console.log(startDate.tz("America/New_York").format())
    console.log(startDate.valueOf());*/
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