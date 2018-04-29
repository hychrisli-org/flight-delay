import {
  SCHEDULE_REQUESTING
} from "./constants";

export const scheduleRequest = (form => ({
  type: SCHEDULE_REQUESTING,
  form
}));
