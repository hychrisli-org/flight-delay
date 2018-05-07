import React from 'react';
import Paper from 'material-ui/Paper';
import Image from '../images/paper-plane.png';
import Weather from '../weather'

import { Grid, Row, Col } from 'react-flexbox-grid';
import PredictCard from "../predict";

const styles = {
  paperContainer: {
    height: "100%",
    overflowY: "auto",
    textAlign: 'center',
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
  }
};

export default class Results extends React.Component{
  render(){
    return(
      <Paper style={styles.paperContainer}>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <Weather/>
            </Col>
            <Col xs={12} md={6}>
              <PredictCard/>
            </Col>
          </Row>
        </Grid>
      </Paper>
    )
  }
}