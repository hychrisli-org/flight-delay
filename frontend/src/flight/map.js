/*global google*/
import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps, withState, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import {connect} from "react-redux";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDmwEffgb-H8eO-M8yteqwPLRkzy-AOIZY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: 480 }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        mapProjection: null,
        zoom: 3,
        onMapMounted: ref => {
          refs.map = ref;
        },
        projectionChanged: () => {
          this.setState({
            mapProjection: refs.map.getProjection()
          });
        },
        onZoomChanged: () => {
          this.setState({
            zoom: refs.map.getZoom()
          });
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
    ref={props.onMapMounted}
    onProjectionChanged={props.projectionChanged}
    zoom={props.zoom}
    onZoomChanged={props.onZoomChanged}
  >
    <CnxMarkers mapProjection={props.mapProjection} zoom={props.zoom}/>
  </GoogleMap>
));

class Markers extends React.Component {

  state = {
    position1: new google.maps.LatLng({lat: 37.773972, lng: -122.431297}),
    position2: new google.maps.LatLng({lat: 40.7128, lng: -74.006})
  };

  render() {
    console.log("locations", this.props.locations);
    const {origin, dest} = this.props.locations;
    let position1 = this.state.position1;
    let position2 = this.state.position2;

    if (origin != null && dest != null) {
      position1 = new google.maps.LatLng({lat: origin.latitude, lng: origin.longitude});
      position2 = new google.maps.LatLng({lat: dest.latitude, lng: dest.longitude});
    }

    return (
      <div>
        <Marker position={position1} />
        <Marker position={position2} />
        <CurveMarker
          pos1={position1}
          pos2={position2}
          mapProjection={this.props.mapProjection}
          zoom={this.props.zoom}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations,
});

const CnxMarkers = connect(mapStateToProps)(Markers);


const CurveMarker = ({ pos1, pos2, mapProjection, zoom }) => {
  if (!mapProjection) return <div />;
  var curvature = 0.4;

  const p1 = mapProjection.fromLatLngToPoint(pos1),
    p2 = mapProjection.fromLatLngToPoint(pos2);

  // Calculating the arc.
  const google=window.google;
  const e = new google.maps.Point(p2.x - p1.x, p2.y - p1.y), // endpoint
    m = new google.maps.Point(e.x / 2, e.y / 2), // midpoint
    o = new google.maps.Point(e.y, -e.x), // orthogonal
    c = new google.maps.Point(m.x + curvature * o.x, m.y + curvature * o.y); //curve control point

  const pathDef = "M 0,0 " + "q " + c.x + "," + c.y + " " + e.x + "," + e.y;

  const scale = 1 / Math.pow(2, -zoom);

  const symbol = {
    path: pathDef,
    scale: scale,
    strokeWeight: 2,
    fillColor: "none"
  };

  return <Marker position={pos1} clickable={false} icon={symbol} zIndex={0} />;
};

export default MyMapComponent;
