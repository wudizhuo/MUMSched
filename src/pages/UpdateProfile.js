
import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from "axios";
import {baseUrl} from "../Const";
import {browserHistory} from "react-router";

let userID = "";
let userName = "";
let dob = "";
let email = "";
let password = "";
let role = "";
let specialization1 ="";
let specialization2 ="";
let courseIDs ="";
let blockIds="";
let entry ="";
let takenCourseIDs = "";
let enrollCourseIDs = "";
let isFixSchedule ="";

class UpdateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = { value: 1,}

    };

    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
            <div style={styles.container}>
                <Card style={styles.card}>
                    <CardHeader titleStyle={styles.header} title="Create User" />

                    <div style={styles.content}>
                        <TextField style={styles.content} floatingLabelText="User ID"  ref="userID" /><br />
                        <TextField style={styles.content} floatingLabelText="User Name" ref="userName" /><br />
                        <TextField style={styles.content} floatingLabelText="Email" ref="email" /> <br />
                        <TextField style={styles.content} floatingLabelText="Password" ref="password" hintText="A12345$" /> <br />
                        <SelectField floatingLabelText="Role" style={styles.content} value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="Student" />
                            <MenuItem value={2} primaryText="Faculty" />
                            <MenuItem value={3} primaryText="Admin" />
                        </SelectField>

                        <TextField style={styles.content} floatingLabelText="Specialization 1" ref="specialization1" /> <br />
                        <TextField style={styles.content} floatingLabelText="Specialization 2" ref="specialization2" /> <br />
                        <TextField style={styles.content} floatingLabelText="Course IDs" ref="courseIDs" hintText="WAP:SE" /> <br />
                        <TextField style={styles.content} floatingLabelText="Blocks IDs"ref="blockIds" hintText="January:Febuary" /> <br />
                        <TextField style={styles.content} floatingLabelText="Entry" ref="entry" hintText="A12345$" /> <br />
                        <TextField style={styles.content} floatingLabelText="Taken Course IDs" ref="takenCourseIDs" hintText="FPP:MPP" /> <br />
                        <TextField style={styles.content} floatingLabelText="Taken Course IDs" ref="enrollCourseIDs" hintText="WAP:SE" /> <br />
                        <TextField style={styles.content} ref="isFixSchedule" hintText="true" /> <br />
                    </div>

                    <CardActions style={styles.cardAction}>
                        <FlatButton label="Create" primary={true} onClick={this.create.bind(this)} />
                    </CardActions>
                </Card>
            </div>
        )
    }
    create() {
        //userID = this.refs.courseID.getValue();
        userName = this.refs.userName.getValue();
        dob = this.refs.dob.getValue();
        email = this.refs.email.getValue();
        password = this.refs.password.getValue();
        role = this.refs.role.getValue();
        specialization1 = this.refs.specialization1.getValue();
        specialization2 = this.refs.specialization2.getValue();
        courseIDs ="";
        blockIds="";
        entry ="";
        takenCourseIDs = "";
        enrollCourseIDs = "";
        isFixSchedule ="false";

        const url = baseUrl + 'user-service/courses/add';
        axios.post(url, {
            id: userID,
            name: userName,
            dob: preCourseName,
            email: email,
            password: password,
            role: role,
            specialization1: specialization1,
            specialization2: specialization1,
            courseIDs: courseIDs,
            blockIds: blockIds,
            entry: entry,
            takenCourseIDs: takenCourseIDs,
            enrollCourseIDs: enrollCourseIDs,
            isFixSchedule: isFixSchedule,
        })
            .then(function (response) {
                //show snack bar
                console.log(response);
                browserHistory.push('/users');
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

export default UpdateProfile;