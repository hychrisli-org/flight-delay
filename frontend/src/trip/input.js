import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import airports from '../data/airports';
import airlines from '../data/airlines';

const cardStyle = {
  display: 'inline-block',
  width: 400,
  margin: 20,
  transitionDuration: '0.3s',
  height: 500,
  opacity: 0.7,
  padding: '1%'
};

const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
};


class TripInputCard extends Component {


  render() {
    return(
      <Card style={cardStyle}>
        <CardTitle title="Search for Your Flight"/>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>

        <AutoComplete
          hintText="From"
          dataSource={airports}
          dataSourceConfig={dataSourceConfig}
          filter={AutoComplete.fuzzyFilter}
        />
        <AutoComplete
          hintText="To"
          dataSource={airports}
          dataSourceConfig={dataSourceConfig}
          filter={AutoComplete.fuzzyFilter}
        />
        <AutoComplete
          hintText="Airline"
          dataSource={airlines}
          dataSourceConfig={dataSourceConfig}
          filter={AutoComplete.fuzzyFilter}
        />
        <DatePicker hintText="Date" />



        <CardActions>
          <FlatButton label="Action1"/>
          <FlatButton label="Action2"/>
        </CardActions>
      </Card>
    )
  }
}


export default TripInputCard;