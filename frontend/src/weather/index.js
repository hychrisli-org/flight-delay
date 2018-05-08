import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import thermoImg from '../images/thermo.png'
import visImg from '../images/eye.png'
import liquImg from '../images/liquid.png'
import snowImg from '../images/snow.png'



import {
  blue200,
  green200,
  orange200,
  purple200,
} from 'material-ui/styles/colors';

import {connect} from "react-redux";
import {scheduleRequest} from "../trip/actions";

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

class WeatherCard extends Component {



  render() {
    const {temp, vis, liqu_depth, snow_depth} = this.props.arrivalWeather.weather;
    return(
      <Card style={styles.card}>
        <CardTitle title="Weather" subtitle="Destination Airport" />
        <List>
          <ListItem
            leftAvatar={<Avatar src={thermoImg} backgroundColor={blue200} />}
          >
            Temperature:  {temp} &deg;C
          </ListItem>
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar src={visImg}  backgroundColor={purple200}/>
            }
          >
           Visibility: {vis} m
          </ListItem>
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar src={liquImg}  backgroundColor={green200}/>
            }
          >
            Liquid Depth: {liqu_depth} cm
          </ListItem>
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar src={snowImg}  backgroundColor={orange200}/>
            }
          >
            Snow Depth: {snow_depth} cm
          </ListItem>
        </List>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  arrivalWeather: state.arrivalWeather,
});

const connected = connect(mapStateToProps)(WeatherCard);

export default connected;