import {
  WEATHER_REQUESTING
} from "./constants";

export function requestWeather(form){

  console.log(form);

  return {
  type: WEATHER_REQUESTING,
  form
  }
}
