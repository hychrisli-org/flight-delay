import {LOCATIONS_SET, SCHEDULES_SET, MY_FLIGHT_SET} from "./constants";

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