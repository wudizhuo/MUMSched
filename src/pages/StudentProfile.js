
import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from "axios";
import {baseUrl} from "../Const";
import {browserHistory} from "react-router";

let studentID = "";
let studentName = "";
let email = "";
let password = "";
let entry ="";
let enroll_temp = "";
let isFixSchedule ="";

class StudentProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            takenInfo:[],
            selectedSection:'',
            enrollInfo: [],
            takens:'',
            enrolls:'',
        };

    };

    componentWillMount() {
        this.getTakens();
        this.getEnrolls();
    }


    handleChangeEnroll(event, index, selectedSection) {
        this.setState({selectedSection:selectedSection});
    }


    getTakens() {
        const url = baseUrl + 'section-service/takens' + studentID;

        axios.get(url)
            .then((response) => {
                console.log(response);
                this.props.getTakens(response.data);
                this.setState({takenInfo: response.data});
                console.log(this.state.takenInfo);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getEnrolls() {
        const url = baseUrl + 'section-service/enrolls' + studentID;

        axios.get(url)
            .then((response) => {
                console.log(response);
                this.props.getEnrolls(response.data);
                this.setState({enrollInfo: response.data});
                console.log(this.state.enrollInfo);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div style={styles.container}>
                <Card style={styles.card}>
                    <CardHeader titleStyle={styles.header} title="Update Student Profile"/>

                    <div style={styles.content}>
                        <TextField style={styles.content} floatingLabelText="Student ID" ref="studentID"/><br />
                        <TextField style={styles.content} floatingLabelText="Student Name" ref="studentName"/><br />
                        <TextField style={styles.content} floatingLabelText="Email" ref="email"/> <br />
                        <TextField style={styles.content} floatingLabelText="Password" ref="password" hintText="A12345$"/> <br />
                        <TextField style={styles.content} floatingLabelText="Entry" ref="entry" hintText="January"/> <br />
                        <TextField style={styles.content} floatingLabelText="Taken List" ref="takens" /> <br />

                        <TextField style={styles.content} floatingLabelText="Enrolls List" ref="enrolls" hintText="One or more section"/> <br />

                        <SelectField floatingLabelText={'Select Section'} style={styles.content} value={this.state.selectedSection}
                                     ref="enroll_temp"
                                     onChange={this.handleChangeEnroll.bind(this)}>
                            {this.state.enrollInfo.map(section =>
                                <Option key={section.id} value={section.id}>)
                                </Option>
                            )}
                        </SelectField>

                        <FlatButton label="Add Enroll" primary={true} onClick={this.addEnroll.bind(this)}/>
                        <TextField style={styles.content} floatingLabelText="Enroll List" ref="enrolls" hintText="One or more sections"/> <br />
                    </div>

                    <CardActions style={styles.cardAction}>
                        <FlatButton label="Save" primary={true} onClick={this.save.bind(this)}/>
                    </CardActions>
                </Card>
            </div>
        )
    }

    addEnroll() {
        this.setState({enrolls: this.refs.enrolls.getValue() + this.state.selectedSection +', '});
        console.log(this.refs.enrolls.getValue());
    }


    save() {
        studentID = this.refs.studentID.getValue();
        studentID = this.refs.studentName.getValue();
        email = this.refs.email.getValue();
        password = this.refs.password.getValue();
        entry = this.refs.entry.getValue();
        takens = this.refs.takens.getValue();
        blockIds = "";

        const url = baseUrl + 'user-service/profile/add';
        axios.post(url, {
            id: studentID,
            name: studentName,
            email: email,
            password: password,
            enrolls: enrolls,
        })
            .then(function (response) {
                //show snack bar
                console.log(response);
                browserHistory.push('/student_profile');
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

export default StudentProfile;