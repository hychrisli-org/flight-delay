import {
  WEATHER_REQUESTING
} from "./constants";

export function requestWeather(form){

  return {
  type: WEATHER_REQUESTING,
  form
  }
}

export function resetWeather(){
  return {
    type: null
  }
}