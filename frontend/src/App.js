import React, { Component } from 'react';
import logo from './logo.svg';
import MapComponent from './map.js';
import Main from './main'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main/>
        <MapComponent/>
      </div>
    );
  }
}

export default App;
