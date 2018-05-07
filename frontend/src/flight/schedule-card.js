import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';
import Map from './map'
import {connect} from "react-redux";

const styles = {

  card:{
    display: 'inline-block',
    width: 500,
    margin: 20,
    transitionDuration: '0.3s',
    height: 500,
    opacity: 0.7,
    padding: '1%'
  },

  chip: {
    margin: 4,
  },

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

};

class ScheduleCard extends Component {

  handleRequestDelete() {
  alert('You clicked the delete button.');
  }

  handleClick() {
    alert('You clicked the Chip.');
  }

  render() {
    const handleRequestDelete = this.handleRequestDelete;
    const handleClick = this.handleClick;

    // const schedules = ["you", "me"];
    const schedules = this.props.schedules.schedules;
    console.log("schedule flight", this.props.schedules.schedules);

    return(
      <Card style={styles.card}>
        <CardTitle title="Flights" subtitle="Select a Flight" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <div style={styles.wrapper}>

          <Chip
            style={styles.chip}
          >
            Text Chip
          </Chip>

          <Chip
            onRequestDelete={handleRequestDelete}
            onClick={handleClick}
            style={styles.chip}
          >
            Deletable Text Chip
          </Chip>

          <Chip
            onClick={handleClick}
            style={styles.chip}
          >
            <Avatar src="images/uxceo-128.jpg" />
            Image Avatar Chip
          </Chip>

          <Chip
            onRequestDelete={handleRequestDelete}
            onClick={handleClick}
            style={styles.chip}
          >
            <Avatar src="images/ok-128.jpg" />
            Deletable Avatar Chip
          </Chip>

          <Chip
            onClick={handleClick}
            style={styles.chip}
          >
            <Avatar icon={<FontIcon className="material-icons">perm_identity</FontIcon>} />
            FontIcon Avatar Chip
          </Chip>

          <Chip
            onRequestDelete={handleRequestDelete}
            onClick={handleClick}
            style={styles.chip}
          >
            <Avatar color="#444" icon={<SvgIconFace />} />
            SvgIcon Avatar Chip
          </Chip>

          <Chip onClick={handleClick} style={styles.chip}>
            <Avatar size={32}>A</Avatar>
            Text Avatar Chip
          </Chip>

          <Chip
            backgroundColor={blue300}
            onRequestDelete={handleRequestDelete}
            onClick={handleClick}
            style={styles.chip}
          >
            <Avatar size={32} color={blue300} backgroundColor={indigo900}>
              MB
            </Avatar>
            Colored Chip
          </Chip>

          {schedules != null && schedules.length > 0 && (schedules.map((flight, index) => {
            return (
              <Chip key={index}>{flight.actual_ident}</Chip>
            )}))}

        </div>

      </Card>
    )
  }
}

const mapStateToProps = state => ({
  schedules: state.schedules,
});

const CnxScheduleCard = connect(mapStateToProps)(ScheduleCard);

export default CnxScheduleCard;