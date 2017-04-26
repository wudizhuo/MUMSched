import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {baseUrl} from "../../Const";
import {browserHistory} from "react-router";

class CreateEntry extends Component {

  constructor(props) {
    super(props);
  }

  create() {
    let entryName = this.refs.entryName.getValue();
    let totalMPPStudents = this.refs.totalMPPStudents.getValue();
    let totalFPPStudents = this.refs.totalFPPStudents.getValue();

    const url = baseUrl + 'entrys/add';
    axios.post(url, {
      name: entryName,
      totalMPPStudents: totalMPPStudents,
      totalFPPStudents: totalFPPStudents,
    })
      .then(function (response) {
        console.log(response);
        browserHistory.push('/entries');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header}
                      title="Create Entry"
          />
          <div style={styles.content}>
            <TextField style={styles.content}
                       ref="entryName"
                       hintText="Entry Name"
                       floatingLabelText="Entry Name"
            /><br />
            <TextField style={styles.content}
                       ref="totalMPPStudents"
                       hintText="MPP Students"
                       floatingLabelText="MPP Students"
            /><br />
            <TextField style={styles.content}
                       ref="totalFPPStudents"
                       hintText="FPP Students"
                       floatingLabelText="FPP Students"
            /><br />
          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Create" primary={true}
                        onClick={this.create.bind(this)}
            />
          </CardActions>
        </Card>
      </div>
    )
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
    fontSize: '14',
    paddingLeft: '2%',
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
  checkbox: {
    marginBottom: 16,
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  customContentStyle: {
    overflow: 'auto',
  },
}

export default CreateEntry;