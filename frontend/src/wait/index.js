import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

const styles = {
  paperContainer: {
    height: "100%",
    overflowY: "auto",
    textAlign: 'center',
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
  }
};


export default class Wait extends React.Component{

  render(){
    return(
      <Paper style={styles.paperContainer}>
        <CircularProgress size={100} thickness={8} />
      </Paper>
    )
  }
}