import {SCHEDULES_SET} from "./constants";

export function setSchedules(schedules){
  return {
    type: SCHEDULES_SET,
    schedules
  }
}