import React from 'react';
import Paper from 'material-ui/Paper';
import Image from '../images/clouds.jpg';
import MapCard from './map-card'
import ScheduleCard from './schedule-card'
import { Grid, Row, Col } from 'react-flexbox-grid';

const styles = {
  paperContainer: {
    height: "100%",
    overflowY: "auto",
    textAlign: 'center',
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
  }
};

export default class Flight extends React.Component{

  render(){
    return(
      <Paper style={styles.paperContainer}>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <ScheduleCard/>
            </Col>
            <Col xs={12} md={6}>
              <MapCard/>
            </Col>
          </Row>
        </Grid>
      </Paper>
    )
  }
}