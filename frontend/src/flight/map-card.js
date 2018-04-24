import React, {Component} from 'react';
import {Card} from 'material-ui/Card';
import Map from './map'

const cardStyle = {
  display: 'inline-block',
  width: 500,
  margin: 20,
  transitionDuration: '0.3s',
  height: 500,
  opacity: 0.7,
  padding: '1%'
};

class MapCard extends Component {

  render() {
    return(
      <Card style={cardStyle}>
        <Map/>
      </Card>
    )
  }
}


export default MapCard;