import {
  WEATHER_REQUESTING
} from "./constants";

export const requestWeather = (form => ({
  type: WEATHER_REQUESTING,
  form
}));
