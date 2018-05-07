import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import moment from 'moment'
import 'moment-timezone'
import {connect} from "react-redux";

const styles = {

  card:{
    display: 'inline-block',
    width: 500,
    margin: 20,
    transitionDuration: '0.3s',
    height: 500,
    opacity: 0.7,
    padding: '1%'
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

    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.genChip = this.genChip.bind(this);
  }

  handleRequestDelete() {
  alert('You clicked the delete button.');
  }

  handleClick() {
    alert('You clicked the Chip.');
  }

  genChip(flight, index){

    const isNotActual = flight.actual_ident === null || flight.actual_ident === "";
    const flightId = isNotActual ? flight.ident : flight.actual_ident;
    const departureTime = moment.unix(flight.departuretime).tz(this.props.locations.origin.timezone).format();
    const arrivalTime = moment.unix(flight.arrivaltime).tz(this.props.locations.dest.timezone).format();
    const depTimeStr = departureTime.slice(11, 16);
    const arrTimeStr = arrivalTime.slice(11, 16);
    return (
      <Chip
        key={index}
        backgroundColor={'#d1e1f9'}
        onClick={this.handleClick}
        style={styles.chip}
      >{flightId + " | " + depTimeStr + " - " + arrTimeStr}</Chip>
    )

  }


  render() {
    const schedules = this.props.schedules.schedules;
    const hasSchedules = schedules != null && schedules.length > 0;
    if (hasSchedules)
      schedules.sort((a, b) => {return a.departuretime > b.departuretime ? 1 : a.departuretime < b.departuretime ? -1 : 0});
    console.log(schedules);


    return(
      <Card style={styles.card}>
        <CardTitle title="Flights" subtitle="Select a Flight" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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
});

const CnxScheduleCard = connect(mapStateToProps)(ScheduleCard);

export default CnxScheduleCard;