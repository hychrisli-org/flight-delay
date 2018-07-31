import React, {Component} from 'react';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import delayImg from '../images/delay.png'
import ontimeImg from '../images/on-schedule.png'
import {connect} from "react-redux";
import {scheduleRequest} from "../trip/actions";

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

    const isDelay = this.props.predRes.pred === 1;

    return(
      <Card style={styles.card}>
        <CardTitle title="Prediction" subtitle="Whether there's delay" />
        {isDelay && <CardMedia><img src={delayImg} alt="" /></CardMedia>}
        { !isDelay && <CardMedia><img src={ontimeImg} alt="" /></CardMedia>}
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  predRes: state.predRes,
});

const connected = connect(mapStateToProps)(PredictCard);

export default connected