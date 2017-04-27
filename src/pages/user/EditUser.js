import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from "axios";
import {baseUrl2} from "../../Const";
import {browserHistory} from "react-router";
import {connect} from "react-redux";

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '',}

    };

    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
            <div style={styles.container}>
                <Card style={styles.card}>
                    <CardHeader titleStyle={styles.header} title="Update User" />

                    <div style={styles.content}>
                        <TextField style={styles.content} floatingLabelText="Login ID"  ref="userID" defaultValue = {this.props.user.edit_user.loginId} /><br />
                        <TextField style={styles.content} floatingLabelText="First Name" ref="firstName" defaultValue = {this.props.user.edit_user.firstName}  /><br />
                        <TextField style={styles.content} floatingLabelText="Last Name" ref="lastName" defaultValue = {this.props.user.edit_user.lastName}  /><br />
                        <TextField style={styles.content} floatingLabelText="Email" ref="email" defaultValue = {this.props.user.edit_user.email}  /> <br />
                        <TextField style={styles.content} floatingLabelText="Password" ref="password" hintText="A12345$" defaultValue = {this.props.user.edit_user.password} /> <br />
                        <SelectField style={styles.content} floatingLabelText="Role"  value={this.state.value} ref="role" defaultValue = {this.props.user.edit_user.role}  onChange={this.handleChange.bind(this)}>
                            <MenuItem value={"STUDENT"} primaryText="STUDENT" />
                            <MenuItem value={"FACULTY"} primaryText="FACULTY" />
                            <MenuItem value={"ADMIN"} primaryText="ADMIN" />
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
        let id = this.props.user.edit_user.id;
        let userID = this.refs.userID.getValue();
        let firstName = this.refs.firstName.getValue();
        let lastName = this.refs.lastName.getValue();
        let email = this.refs.email.getValue();
        let password = this.refs.password.getValue();
        let role = this.state.value;

        const url = baseUrl2 + '/users/update';
        axios.put(url, {
            id:id,
            loginId: userID,
            firstName: firstName,
            lastName: lastName,
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


function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(EditUser);