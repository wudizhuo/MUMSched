import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from "axios";
import {baseUrl} from "../../Const";
import {browserHistory} from "react-router";

let userID = "";
let userName = "";
let email = "";
let password = "";
let role = "";

class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = { value: 'Student',}

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
                        <SelectField style={styles.content} floatingLabelText="Role"  value={this.state.value} ref="role" onChange={this.handleChange.bind(this)}>
                            <MenuItem value={"Student"} primaryText="Student" />
                            <MenuItem value={"Faculty"} primaryText="Faculty" />
                            <MenuItem value={"Admin"} primaryText="Admin" />
                        </SelectField>
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
        email = this.refs.email.getValue();
        password = this.refs.password.getValue();
        role = this.state.value;
        console.log(this.state.value);

        const url = baseUrl + 'user-service/user/add';
        axios.post(url, {
            id: userID,
            name: userName,
            email: email,
            password: password,
            role: role,
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

export default CreateUser;