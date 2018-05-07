import 'moment-timezone'
import {call, put, takeLatest} from 'redux-saga/effects'
import {timeout} from "../lib/request";

import {
  WEATHER_SUCCESS,
  WEATHER_ERROR,
  WEATHER_REQUESTING
} from './constants';
import {handleApiErrors} from "../lib/api-errors";
import {setArrivalWeather} from "../stores/actions";


const weatherUrl = `${process.env.REACT_APP_WEATHER_URL}`;

function weatherApi(iata, localTsStr){

  console.log("weatherApi", iata);
  console.log("weatherApi", localTsStr);
  console.log("weatherApi", weatherUrl);

  return timeout(5000, fetch(weatherUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({iata, localTsStr}),
  }))
    .then(response => {
      const json = response.json();
      console.log(json);
      return json

    })
    .catch(handleApiErrors);
}

function* weatherFlow(action){

  try {
    const{form} = action;
    console.log("here", form);
    const arrivalWeather = yield call(weatherApi, form.iata, form.localTsStr);
    console.log(arrivalWeather);
    yield put(setArrivalWeather(arrivalWeather));
    yield put({type:WEATHER_SUCCESS})
  } catch (error) {
    yield put({type: WEATHER_ERROR, error});
  }
}

function* weatherWatcher(){
  yield takeLatest(WEATHER_REQUESTING, weatherFlow)
}

export default weatherWatcher;