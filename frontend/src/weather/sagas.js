import moment from 'moment'
import 'moment-timezone'
import queryString from 'query-string'
import {call, put, takeLatest} from 'redux-saga/effects'
import {timeout} from '../lib/request'

import {
  WEATHER_SUCCESS,
  WEATHER_ERROR,
  WEATHER_REQUESTING
} from './constants';
import {handleApiErrors} from "../lib/api-errors";
import {setLocations, setSchedules} from "../stores/actions";


const forecastUrl = `${process.env.REACT_APP_WEATHER_FORECAST_URL}`;
const historyUrl = `${process.env.REACT_APP_WEATHER_HISTORY_URL}`;
const apiKey = `${process.env.REACT_APP_WEATHER_APIKEY}`;


function forecastApi(lat, lon){
  const params = {lat, lon, units: 'metric', appid: apiKey};
  const url = `http://localhost:8080/${forecastUrl}?${queryString.stringify(params)}`;

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

function historyApi(icao){

  const params = {airportCode: icao};
  const url = `http://localhost:8080/${historyUrl}?${queryString.stringify(params)}`;

  return fetch(url, {
    method: 'GET'
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch(error => {throw error})
}

function* weatherFlow(action){

  try {
    const{form} = action;
  } catch (error) {
    yield put({type: WEATHER_ERROR, error});
  }
}

function* weatherWatcher(){
  yield takeLatest(WEATHER_REQUESTING, weatherFlow)
}

export default weatherWatcher;