import 'moment-timezone'
import {call, put, takeLatest} from 'redux-saga/effects'
import {timeout} from "../lib/request";

import {
  PREDICT_SUCCESS,
  PREDICT_ERROR,
  PREDICT_REQUESTING
} from './constants';
import {handleApiErrors} from "../lib/api-errors";

const predictUrl = `${process.env.REACT_APP_PREDICT_URL}`;

function predictApi(form){


  return timeout(5000, fetch(predictUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  }))
    .then(response => {
      const json = response.json();
      console.log(json);
      return json

    })
    .catch(handleApiErrors);
}

function* predictFlow(action){

  try {
    const{form} = action;
    console.log("preidctFlow", form);
    const pred = yield call(predictApi, form);
    console.log(pred);
    yield put({type:PREDICT_SUCCESS})
  } catch (error) {
    yield put({type: PREDICT_ERROR, error});
  }
}

function* predictWatcher(){
  yield takeLatest(PREDICT_REQUESTING, predictFlow)
}

export default predictWatcher;