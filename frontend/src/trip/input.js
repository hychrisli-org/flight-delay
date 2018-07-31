import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import airports from '../data/airports';
import airlines from '../data/airlines';
import PropTypes from 'prop-types'


import {scheduleRequest} from './actions';
import {resetWeather} from "../weather/actions";

const cardStyle = {
  display: 'inline-block',
  width: 400,
  margin: 20,
  transitionDuration: '0.3s',
  height: 450,
  opacity: 0.7,
  padding: '1%'
};

const renderFromAirport = ({input}) => (
  <AutoComplete
    hintText="From"
    {...input}
    dataSource={airports.dataSource}
    filter={AutoComplete.fuzzyFilter}
    onUpdateInput={(value) => {input.onChange(airports.info[value])}}
  />
);

const renderToAirport = ({input}) => (
  <AutoComplete
    {...input}
    hintText="To"
    dataSource={airports.dataSource}
    filter={AutoComplete.fuzzyFilter}
    onUpdateInput={(value) => {input.onChange(airports.info[value])}}
  />
);

const renderAirline = ({input}) => (
  <AutoComplete
    {...input}
    name={"airline"}
    hintText="Airline"
    dataSource={airlines.dataSource}
    filter={AutoComplete.fuzzyFilter}
    onUpdateInput={(value) => {input.onChange(airlines.info[value])}}
  />
);

const renderDatePicker = ({ input, defaultValue, meta: { touched, error } }) => (
  <DatePicker
    hintText="Date"
    errorText = {touched && error}
    {...input}
    value = {input.value !== ''? new Date(input.value) : null}
    onChange = {(event, value) => {console.log(value); input.onChange(value)}}
  />
);




class TripInputCard extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    scheduleRequest: PropTypes.func,
    trip: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    })
  };



  submit = (values) =>  {
    console.log(values);
    this.props.scheduleRequest(values);
    //this.props.dispatch(resetWeather());
  };

  render() {

    const{handleSubmit} = this.props;

    return (
      <Card style={cardStyle}>
        <CardTitle title="Search for Your Flight"/>
        <CardText>
          Please choose your origin, destination, preferred airline and departure date. Available flights will be listed once click submit
        </CardText>

        <form onSubmit={handleSubmit(this.submit)}>
          <Field
            name={"fromAirport"}
            component={renderFromAirport}
            required={true}
            />
          <Field
            name={"toAirport"}
            component={renderToAirport}
            required={true}
          />
          <Field
            name={"airline"}
            component={renderAirline}
            required={true}
          />
          <Field
            name={"date"}
            showTime={false}
            component={renderDatePicker}
            required={true}
          />
          <CardActions>
            <FlatButton type="submit" label="Submit"/>
            <FlatButton type="reset" label="Reset"/>
          </CardActions>
        </form>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  trip: state.trip,
});

const connected = connect(mapStateToProps, {scheduleRequest})(TripInputCard);

const formed = reduxForm({
  form: 'trip',
})(connected);

export default formed;