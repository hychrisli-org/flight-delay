import {PREDICT_REQUESTING} from "./constants";
import {getDistanceFromLatLonInKm} from "../lib/calc"

export const predictRequest = ((trip, flight) => {

  const values = trip.values;
  const distance = getDistanceFromLatLonInKm(
    values.fromAirport.lat,
    values.fromAirport.lot,
    values.toAirport.lat,
    values.toAirport.lot);

  const form = {
    origin: values.fromAirport.iata,
    dest: values.toAirport.iata,
    airline: flight.airline,
    depTimeStr: flight.depTimeStr,
    arrTimeStr: flight.arrTimeStr,
    distance
  };

  console.log(form);


  return ({
    type: PREDICT_REQUESTING,
    form
  })
});
