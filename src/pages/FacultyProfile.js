import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from "axios";
import {baseUrl} from "../Const";
import {browserHistory} from "react-router";

let facultyID = "";
let facultyName = "";
let email = "";
let password = "";
let specializations = "";
let specializations_temp = "";
let courseIDs = "";
let blockIds = "";

class FacultyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 'MPP',}

  };

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header} title="Update Faculty Profile"/>

          <div style={styles.content}>
            <TextField style={styles.content} floatingLabelText="Facutlty ID" ref="facultyID"/><br />
            <TextField style={styles.content} floatingLabelText="Facutlty Name" ref="facultyName"/><br />
            <TextField style={styles.content} floatingLabelText="Email" ref="email"/> <br />
            <TextField style={styles.content} floatingLabelText="Password" ref="password" hintText="A12345$"/> <br />
            <SelectField style={styles.content} floatingLabelText="Select specialization" value={this.state.value} ref="specializations_temp" onChange={this.handleChange.bind(this)}>
              <MenuItem value={"Computer Science"}/>
              <MenuItem value={"Art"}/>
              <MenuItem value={"Math"}/>
              <MenuItem value={"Network"}/>
              <MenuItem value={"Data Analysis"}/>
            </SelectField>
            <FlatButton label="Add Spec" primary={true} onClick={this.addSpec.bind(this)}/>
            <TextField style={styles.content} floatingLabelText="Specializations" ref="specializations" hintText="Math..."/> <br />

          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Save" primary={true} onClick={this.save.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }

  addSpec() {
    facultyID = this.refs.facultyID.getValue();
    facultyName = this.refs.facultyName.getValue();
    email = this.refs.email.getValue();
    password = this.refs.password.getValue();
    specializations = specializations + this.state.value;
    courseIDs = "";
    blockIds = "";
  }

  save() {
    facultyID = this.refs.facultyID.getValue();
    facultyName = this.refs.facultyName.getValue();
    email = this.refs.email.getValue();
    password = this.refs.password.getValue();
    specializations = this.state.specializations.getValue();
    courseIDs = "";
    blockIds = "";

    const url = baseUrl + 'user-service/profile/add';
    axios.post(url, {
      id: facultyID,
      name: facultyName,
      email: email,
      password: password,
      specializations: specializations,
      courseIDs: courseIDs,
    })
      .then(function (response) {
        //show snack bar
        console.log(response);
        browserHistory.push('/faculty_profile');
      })
      .catch(function (error) {
        //show snack bar
        console.log("error----");
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

export default FacultyProfile;