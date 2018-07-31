import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import moment from 'moment'
import 'moment-timezone'
import {connect} from "react-redux";
import {setMyFlight} from "../stores/actions";
import {requestWeather} from "../weather/actions";
import {predictRequest} from "../predict/actions"

const styles = {

  card:{
    display: 'inline-block',
    width: 500,
    margin: 20,
    transitionDuration: '0.3s',
    height: 500,
    opacity: 0.7,
    padding: '5%'
  },

  chip: {
    margin: 4,
  },

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

};

class ScheduleCard extends Component {


  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.genChip = this.genChip.bind(this);
  }

  handleClick(chipName, flight, arrivalTime) {

    const { dispatch } = this.props;
    console.log(this.props.locations);
    console.log(flight);
    const iata = flight.destination.substring(1);
    const localTsStr = arrivalTime.slice(0, 10) + ' ' + arrivalTime.slice(11, 19);
    alert('You picked your flight: ' + chipName);

    // dispatch(setMyFlight(flight));
    dispatch(requestWeather({iata, localTsStr}));
    dispatch(predictRequest(this.props.trip, flight));
  }

  genChip(flight, index){

    const isNotActual = flight.actual_ident === null || flight.actual_ident === "";
    const flightId = isNotActual ? flight.ident : flight.actual_ident;
    const departureTime = moment.unix(flight.departuretime).tz(this.props.locations.origin.timezone);
    const arrivalTime = moment.unix(flight.arrivaltime).tz(this.props.locations.dest.timezone);

    const depTimeStr = departureTime.format().slice(11, 16);
    const arrTimeStr = arrivalTime.format().slice(11, 16);
    const lastYearArrTimStr = arrivalTime.subtract(1, 'year').add(30, 'minute').startOf('hour').format();

    const departureTimeStr = departureTime.format();
    const arrivalTimeStr = arrivalTime.format();

    const myFlight = {
      airline: flightId.slice(0,3),
      depTimeStr: departureTimeStr.slice(0, 10) + ' ' + departureTimeStr.slice(11, 19),
      arrTimeStr: arrivalTimeStr.slice(0, 10) + ' ' + arrivalTimeStr.slice(11, 19),
      destination: flight.destination
    };

    const chipName = flightId + " | " + depTimeStr + " - " + arrTimeStr;
    return (
      <Chip
        key={index}
        backgroundColor={'#d1e1f9'}
        onClick={() => this.handleClick(chipName, myFlight, lastYearArrTimStr)}
        style={styles.chip}
      >{chipName}</Chip>
    )

  }


  render() {
    const schedules = this.props.schedules.schedules;
    const hasSchedules = schedules != null && schedules.length > 0;
    if (hasSchedules)
      schedules.sort((a, b) => {return a.departuretime > b.departuretime ? 1 : a.departuretime < b.departuretime ? -1 : 0});
    return(
      <Card style={styles.card}>
        <CardTitle title="Flights" subtitle="Select a Flight" />
        <CardText>
          The available flights on your chosen day are listed below. Please Click on your flight and check whether there's a chance of delay.
        </CardText>
        <div style={styles.wrapper}>
          {hasSchedules && (schedules.map(this.genChip))}
        </div>

      </Card>
    )
  }
}

const mapStateToProps = state => ({
  schedules: state.schedules,
  locations: state.locations,
  weather: state.weather,
  trip:state.form.trip,
});


const CnxScheduleCard = connect(mapStateToProps)(ScheduleCard);

export default CnxScheduleCard;