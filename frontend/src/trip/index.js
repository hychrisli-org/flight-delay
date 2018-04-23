import React from 'react';
import Paper from 'material-ui/Paper';
import Image from '../images/flight.jpg';
import TripInputCard from './input'


const styles = {
  paperContainer: {
    height: 600,
    textAlign: 'center',
    backgroundImage: `url(${Image})`
  }
};

export default class Home extends React.Component{
  render(){
    return(
      <Paper style={styles.paperContainer}>
        <TripInputCard/>
      </Paper>
    )
  }
}