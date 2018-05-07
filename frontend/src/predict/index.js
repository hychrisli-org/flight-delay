import React, {Component} from 'react';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import delayImg from '../images/delay.png'
import ontimeImg from '../images/on-schedule.png'

const style = {margin: 5};

const styles = {

  card:{
    display: 'inline-block',
    width: 500,
    margin: 20,
    transitionDuration: '0.3s',
    height: 450,
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

class PredictCard extends Component {


  render() {

    return(
      <Card style={styles.card}>
        <CardTitle title="Prediction" subtitle="Whether there's delay" />
        <CardMedia><img src={delayImg} alt="" /></CardMedia>
      </Card>
    )
  }
}

export default PredictCard