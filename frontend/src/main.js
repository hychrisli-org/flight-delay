import React from 'react'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import CardExampleWithAvatar from './page.js';
import Trip from './trip'
import Flight from './flight'

const Main = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Trip/>
    <Flight/>
  </MuiThemeProvider>
);

export default Main;
