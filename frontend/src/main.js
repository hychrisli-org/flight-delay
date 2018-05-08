import React from 'react'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import Trip from './trip'
import Flight from './flight'
import Results from "./result";
import Wait from './wait';
import {connect} from "react-redux";

const Main = (props) => {

  const isTripSuccess = props.trip.successful;
  const isTripRequesting = props.trip.requesting;
  const isWeatherSuccess = props.weather.successful;

  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        <Trip/>
        { isTripRequesting && <Wait /> }
        { isTripSuccess && <Flight/> }
        { isWeatherSuccess && <Results/>}
      </div>
    </MuiThemeProvider>
  );
};

const mapStateToProps = state => ({
  trip: state.trip,
  weather: state.weather,
});

const connected = connect(mapStateToProps)(Main);

export default connected;
