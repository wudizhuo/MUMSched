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

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '',}

    };

    componentWillMount() {
        this.getUsers();
    }

    getUsers() {
        console.log(this.props.user.edit_user);
    }


    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
            <div style={styles.container}>
                <Card style={styles.card}>
                    <CardHeader titleStyle={styles.header} title="Update User" />

                    <div style={styles.content}>
                        <TextField style={styles.content} floatingLabelText="User ID"  ref="userID" defaultValue = {this.props.user.edit_user.id} /><br />
                        <TextField style={styles.content} floatingLabelText="User Name" ref="userName" defaultValue = {this.props.user.edit_user.name}  /><br />
                        <TextField style={styles.content} floatingLabelText="Email" ref="email" defaultValue = {this.props.user.edit_user.email}  /> <br />
                        <TextField style={styles.content} floatingLabelText="Password" ref="password" hintText="A12345$" defaultValue = {this.props.user.edit_user.password} /> <br />
                        <SelectField style={styles.content} floatingLabelText="Role"  value={this.state.value} ref="role" defaultValue = {this.props.user.edit_user.role}  onChange={this.handleChange.bind(this)}>
                            <MenuItem value={"Student"} primaryText="Student" />
                            <MenuItem value={"Faculty"} primaryText="Faculty" />
                            <MenuItem value={"Admin"} primaryText="Admin" />
                        </SelectField>
                    </div>

                    <CardActions style={styles.cardAction}>
                        <FlatButton label="Update" primary={true} onClick={this.update.bind(this)} />
                    </CardActions>
                </Card>
            </div>
        )
    }
    update() {
        //userID = this.refs.courseID.getValue();
        userName = this.refs.userName.getValue();
        email = this.refs.email.getValue();
        password = this.refs.password.getValue();
        role = this.state.value;
        console.log(this.state.value);

        const url = baseUrl + 'user-service/user/update';
        axios.put(url, {
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

export default EditUser;