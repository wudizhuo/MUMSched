import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {baseUrl} from "../Const";
import {browserHistory} from "react-router";


class EditEntry extends Component {
  componentWillMount() {
    this.getEntries();
  }

  getEntries() {
     console.log(this.props.entry.edit_entry);
   }

  update() {
    let entryID = this.refs.entryID.getValue();
    let entryName = this.refs.entryName.getValue();
    let totalMPPStudents = this.refs.totalMPPStudents.getValue();
    let totalFPPStudents = this.refs.totalFPPStudents.getValue();

    const url = baseUrl + 'entrys/update';
    axios.put(url, {
      id: entryID,
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
                      title="Edit Entry"
          />
          <div style={styles.content}>
            <TextField style={styles.content}
                       ref="entryID"
                       defaultValue = {this.props.entry.edit_course.id}
            /><br />
            <TextField style={styles.content}
                       ref="entryName"
                       defaultValue = {this.props.entry.edit_course.entryName}
                       hintText="Entry Name"
            /><br />
            <TextField style={styles.content}
                       ref="totalMPPStudents"
                       hintText="MPP Students"
                       defaultValue = {this.props.entry.edit_course.totalMPPStudents}
            /><br />
            <TextField style={styles.content}
                       ref="totalFPPStudents"
                       hintText="FPP Students"
                       defaultValue = {this.props.entry.edit_course.totalFPPStudents}
            /><br />
            {/*<TextField style={styles.content}*/}
                       {/*ref="faculties"*/}
                       {/*hintText="Faculty"*/}
            {/*/><br />*/}

          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Update" primary={true}
                        onClick={this.update.bind(this)}
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
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}

export default EditEntry;