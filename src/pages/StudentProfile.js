
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
            sectionInfo: [],
            takens:'',
            enrolls:'',
        };

    };

    componentWillMount() {
        this.getTakens();
        this.getEnrolls();
        this.getSections();
    }


    handleChangeEnroll(event, index, selectedSection) {
        this.setState({selectedSection:selectedSection});
    }


    getTakens() {
        const url = baseUrl + 'course-service/courses' + studentID; // Need change to section-service/takens

        axios.get(url)
            .then((response) => {
                console.log(response);
                this.props.getCourses(response.data);    // Need change to getTakens
                this.setState({takenInfo: response.data});
                console.log('This is Taken Infor');
                console.log(this.state.takenInfo);
                this.setState({takens: this.mergeTaken()});

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    mergeTaken(){
        console.log("---test Taken---");
        return this.state.takenInfo.map(function(item) {
            return item.name;
        })
    }

    getEnrolls() {
        const url = baseUrl + 'course-service/courses' + studentID; //  Need change to getEnrolls

        axios.get(url)
            .then((response) => {
                console.log(response);
                this.props.getCourses(response.data);    //  Need change to getEnrolls
                this.setState({enrollInfo: response.data});
                this.setState({enrolls: this.mergeEnroll()});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    mergeEnroll(){
        console.log("---test---");
        let enrolls = '';
        return this.state.enrollInfo.map(function(item) {
            return item.name;
        })
    }

    getSections() {
        const url = baseUrl + 'course-service/courses'; // Need change to getSections function

        axios.get(url)
            .then((response) => {
            this.props.getCourses(response.data);  // Need change to getSections function
        this.setState({sectionInfo: response.data});

        console.log('-------');
        console.log(this.state.sectionInfo);
        })
        .catch(function (error) {
                console.log(error);
            });
    }

    menuSection(sectionInfo) {
        return sectionInfo.map((section) => (
            <MenuItem
        key={section.name}
        value={section.name}
        primaryText={section.name}
    />
    ));
    }


    render() {
        return (
            <div style={styles.container}>
                <Card style={styles.card}>
                    <CardHeader titleStyle={styles.header} title="Update Student Profile"/>

                    <div style={styles.content}>
                        <TextField style={styles.content} floatingLabelText="Student ID" ref="studentID" disabled ={'true'}/><br />
                        <TextField style={styles.content} floatingLabelText="Student Name" ref="studentName" disabled ={'true'}/><br />
                        <TextField style={styles.content} floatingLabelText="Email" ref="email"/> <br />
                        <TextField style={styles.content} floatingLabelText="Password" ref="password" hintText="A12345$"/> <br />
                        <TextField style={styles.content} floatingLabelText="Entry" ref="entry" hintText="January"/> <br />
                        <TextField style={styles.content} floatingLabelText="Taken List" ref="takens" value={this.state.takens} /> <br />


                        <SelectField
                            floatingLabelText={'Select Section'}
                            value={this.state.selectedSection}
                            style={styles.content}
                            onChange={this.handleChangeEnroll.bind(this)} >
                                {this.menuSection(this.state.sectionInfo)}
                        </SelectField>

                        <FlatButton label="Add Enroll" primary={true} onClick={this.addEnroll.bind(this)}/>
                        <TextField style={styles.content} floatingLabelText="Enrolls List" ref="enrolls" value={this.state.enrolls} hintText="Select one or more above sections"/> <br />

                        </div>

                    <CardActions style={styles.cardAction}>
                        <FlatButton label="Save" primary={true} onClick={this.save.bind(this)}/>
                    </CardActions>
                </Card>
            </div>
        )
    }

    addEnroll() {
        if(enrolls == '')
            this.setState({enrolls: this.refs.enrolls.getValue() + this.state.selectedSection});
        else
            this.setState({enrolls:', ' + this.refs.enrolls.getValue() + this.state.selectedSection});

        console.log(this.refs.enrolls.getValue());
    }


    save() {
        studentID = this.refs.studentID.getValue();
        studentName = this.refs.studentName.getValue();
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