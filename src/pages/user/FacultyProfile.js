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


class FacultyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
          userInfo:[],
          blockInfo:[],
          selectedBlock:'',
          courseInfo:[],
          selectedCourse:'',
          courses:'',
          blocks:'',
          id:'',
            facultyID:'',
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            specializations:'',
    };

  };

  componentWillMount() {
      this.getPreInfo();
      this.getBlocks();
      this.getCourses();

  }

  handleChangeBlock(event, index, selectedBlock) {
      this.setState({selectedBlock:selectedBlock});
  }

  handleChangeCourse(event, index, selectedCourse) {
      this.setState({selectedCourse:selectedCourse});
  }

  getPreInfo(){

      try {
          if(this.props.user.edit_user.loginId != null)
          {
              console.log('Move from User Management');
              id = this.props.user.edit_user.id;
              facultyID = this.props.user.edit_user.loginId;
              firstName = this.props.user.edit_user.firstName;
              lastName = this.props.user.edit_user.lastName;
              email = this.props.user.edit_user.email;
              password = this.props.user.edit_user.password;
              specializations = this.props.user.edit_user.specializations;


          }
      } catch (error) {
          console.log('User want to edit his self');
          // We will use ID to get Infomation of User
          // const url = baseUrl + 'faculties/get/' +id; //  TODO: Need Update
          let id = 8;
          const url = 'http://127.0.0.1:8082/users/get/' + id;
          axios.get(url)
              .then((response) => {
                  this._mapData(response.data);
              })
              .catch(function (error) {
                  console.log(error);
              });
      }

  }

    _mapData(data) {
            console.log(data);
            this.setState({id: data.id});
            this.setState({facultyID: data.loginId});
            this.setState({firstName: data.firstName});
            this.setState({lastName: data.lastNam});
            this.setState({email: data.email});
            //this.setState({password:data.password});
            //this.setState({specializations:data.specializations});
            console.log(email);

    }

  getCourses() {
      // const url = baseUrl + 'courses';  TODO: Need Update
      const url = 'http://127.0.0.1:8081/courses'

      axios.get(url)
          .then((response) => {
              this.props.getCourses(response.data);
              this.setState({courseInfo: response.data});

          })
          .catch(function (error) {
              console.log(error);
          });
  }

    menuCourse(courseInfo) {
        console.log('Truoc khi convert course');
        console.log(courseInfo);
        return courseInfo.map((course) => (
            <MenuItem
                key={course.courseName}
                value={course.courseName}
                primaryText={course.courseName}
            />
        ));
    }


    getBlocks() {
        //const url = baseUrl + 'blocks';
        const url = 'http://127.0.0.1:8081/blocks'
        axios.get(url)
            .then((response) => {
                console.log(response);
                this.props.getBlocks(response.data);
                this.setState({blockInfo: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    menuBlock(blockInfo) {
        console.log('Truoc khi convert block');
        console.log(blockInfo);
        return blockInfo.map((block) => (
            <MenuItem
                key={block.name}
                value={block.name}
                primaryText={block.name}
            />
        ));
    }

    render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header} title="Update Faculty Profile"/>

          <div style={styles.content}>
            <TextField style={styles.content} floatingLabelText="Facutlty ID" ref="facultyID" value = {this.state.facultyID}
                       disabled ={'true'}/><br />
            <TextField style={styles.content} floatingLabelText="First Name" ref="firstName" value = {this.state.firstName}
                       disabled ={'true'}/><br />
            <TextField style={styles.content} floatingLabelText="Last Name" ref="lastName" value = {this.state.lastName}
                       disabled ={'true'}/><br />
            <TextField style={styles.content} floatingLabelText="Email" ref="email" value =  {this.state.email}
                       onChange={(event) => this.setState({ email: event.target.value, })}  /> <br />
            <TextField style={styles.content} floatingLabelText="Password" ref="password" value = {this.password}
                       onChange={(event) => this.setState({ password: event.target.value, })}  /> <br />
            <TextField style={styles.content} floatingLabelText="Specializations" ref="specializations" values = {this.state.specializations}
                       onChange={(event) => this.setState({ specializations: event.target.value, })} /> <br />

          <SelectField
              floatingLabelText={'Select Course'}
              value={this.state.selectedCourse}
              style={styles.content}
              ref="courses_tmp"
              onChange={this.handleChangeCourse.bind(this)} >
              {this.menuCourse(this.state.courseInfo)}
          </SelectField>

          <FlatButton label="Add Course" primary={true} onClick={this.addCourseID.bind(this)}/>
          <TextField style={styles.content} floatingLabelText="Courses List" ref="courses" value={this.state.courses} hintText="Select one or more above sections"/> <br />

          <SelectField
              floatingLabelText={'Select Block'}
              value={this.state.selectedBlock}
              style={styles.content}
              ref="blocks_tmp"
              onChange={this.handleChangeBlock.bind(this)} >
              {this.menuBlock(this.state.blockInfo)}
          </SelectField>

          <FlatButton label="Add Block" primary={true} onClick={this.addBlockID.bind(this)}/>
          <TextField style={styles.content} floatingLabelText="Blocks List" ref="blocks" value={this.state.blocks} hintText="Select one or more above blocks"/> <br />
          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Save" primary={true} onClick={this.save.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }

  addCourseID() {
    this.setState({courses: this.refs.courses.getValue() + this.state.selectedCourse +', '});
    console.log(this.state.courses);
  }

  addBlockID() {
      this.setState({blocks: this.refs.blocks.getValue() + this.state.selectedBlock +', '});
      console.log(this.refs.blocks.getValue());
  }

  save() {
    //const url = baseUrl + 'faculties/update';
      const url = 'http://127.0.0.1:8081/faculties/update';
    axios.post(url, {
      id: this.state.id,
      email: this.state.email,
      /*password: this.state.password, */ /* We will update later*/
      specializedCourses: this.state.specializations,
      courses: this.state.courses,
      availableBlocks:this.state.blocks,
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


function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(FacultyProfile);