import {LOCATIONS_SET, SCHEDULES_SET, MY_FLIGHT_SET, ARRIVAL_WEATHER_SET, PRED_RESULT_SET} from "./constants";

export function setLocations (origin, dest){
  return {
    type: LOCATIONS_SET,
    origin,
    dest
  }
}

export function setSchedules(schedules){
  return {
    type: SCHEDULES_SET,
    schedules
  }
}

export function setMyFlight(flight){
  return {
    type: MY_FLIGHT_SET,
    flight
  }
}

export function setArrivalWeather(weather){
  return {
    type: ARRIVAL_WEATHER_SET,
    weather
  }
}


export function setPredResult(pred){
  return {
    type: PRED_RESULT_SET,
    pred
  }
}