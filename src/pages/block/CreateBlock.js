import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {baseUrl} from "../../Const";
import {browserHistory} from "react-router";
import DatePicker from "material-ui/DatePicker";

class CreateBlock extends Component {

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header} title="Create Block"/>

          <div style={styles.content}>
            <TextField style={styles.content} floatingLabelText="SeqNumber" ref="seqNumber"/><br />
            <TextField style={styles.content} floatingLabelText="Block Name" ref="blockName"/><br />
            <DatePicker style={styles.content} floatingLabelText="Start Date" ref="startDate" mode="landscape"/> <br />
            <DatePicker style={styles.content} floatingLabelText="End Date" ref="endDate" mode="landscape"/> <br />
          </div>
          <CardActions style={styles.cardAction}>
            <FlatButton label="Create" primary={true} onClick={this.create.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }

  create() {
    let seqNumber = this.refs.seqNumber.getValue();
    let blockName = this.refs.blockName.getValue();
    let startDate = this.refs.startDate.getDate();
    let endDate = this.refs.endDate.getDate();

    const url = baseUrl + 'blocks/add';
    axios.post(url, {
      "name": blockName,
      "seqNumber": seqNumber,
      "startDate": startDate,
      "endDate": endDate,
    })
      .then(function (response) {
        //show snack bar
        console.log(response);
        browserHistory.push('/blocks');
      })
      .catch(function (error) {
        //show snack bar
        console.log(error);
      });
  }


}

var styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2%',
  },
  card: {
    width: '60%',
  },
  content: {
    width: '98%',
    paddingLeft: '2%',
    fontSize: '14',
    paddingRight: '2%',
  },
  listItem: {
    width: '60vw',
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    fontSize: '20px',
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  customWidth: {
    width: 150,
  },

}

export default CreateBlock;