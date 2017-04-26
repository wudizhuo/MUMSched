
import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from "axios";
import {baseUrl} from "../../Const";
import {browserHistory} from "react-router";
import {connect} from "react-redux";

class StudentProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            takenInfo:[],
            selectedSection:'',
            enrollInfo: [],
            sectionInfo: [],
            studentID: '',
            firstName: '',
            lastName: '',
            email: '',
            password:'',
            entry: '',
            takens:'',
            enrolls:'',
            isFixSchedule:'',
        };
    };

    componentWillMount() {
        this.getPreInfo();
        //this.getTakens();
        //this.getEnrolls();
        this.getSections();
    }

    getPreInfo(){
        let id = '';
        try {
            if(this.props.user.edit_user.loginId != null) {
                console.log('Move from User Management');
                id = this.props.user.edit_user.loginId;
            }
        } catch (error) {
            console.log('User want to edit his self');
            // We will use ID to get Infomation of User
            // const url = baseUrl + 'students/get/' +id; //  TODO: Need Update
            id = 8;
        }

        const url = 'http://127.0.0.1:8082/students/get/' + id;
        axios.get(url)
            .then((response) => {
                this._mapData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    _mapData(data) {
        console.log(data);
        this.setState({id: data.id});
        this.setState({studentID: data.loginId});
        this.setState({firstName: data.firstName});
        this.setState({lastName: data.lastNam});
        this.setState({email: data.email});
        //this.setState({password:data.password});
        this.setState({entry: data.entry});
        this.setState({takens: data.takens});
        this.setState({enrolls: data.enrolls});
    }


    handleChangeEnroll(event, index, selectedSection) {
        this.setState({selectedSection:selectedSection});
    }

/*
    getTakens() {
        const url = baseUrl + 'user/takens/' + studentID;

        axios.get(url)
            .then((response) => {
                console.log(response);
                this.props.getTakens(response.data);
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
        const url = baseUrl + 'user/enrolls/' + studentID;

        axios.get(url)
            .then((response) => {
                console.log(response);
                this.props.getEnrolls(response.data);
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
 */

    getSections() {
        //const url = baseUrl + 'sections';
        const url = 'http://127.0.0.1:8081/sections/';

        axios.get(url)
            .then((response) => {
            this.props.getSections(response.data);
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
                        <TextField style={styles.content} floatingLabelText="Student ID" ref="studentID" value={this.state.studentID}
                                   disabled ={'true'}/><br />
                        <TextField style={styles.content} floatingLabelText="First Name" ref="firstName" value={this.state.firstName}
                                   disabled ={'true'}/><br />
                        <TextField style={styles.content} floatingLabelText="Email" ref="email" value={this.state.email}/> <br />
                        <TextField style={styles.content} floatingLabelText="Password" ref="password" value={this.state.password} hintText="A12345$"/> <br />
                        <TextField style={styles.content} floatingLabelText="Entry" ref="entry" value={this.state.entry} hintText="January"/> <br />
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

        const url = baseUrl + 'user-service/profile/add';
        axios.post(url, {
            id: this.state.studentID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
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

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(StudentProfile);
