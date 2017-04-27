import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import axios from "axios";
import {connect} from "react-redux";
import {baseUrl2} from "../../Const";
import {browserHistory} from "react-router";
import MenuItem from "material-ui/MenuItem";

let courseItem = [];

let blockItems = [];
let courseItems = [];
let facultyItems = [];
class EditSections extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseCodeName: props.section.edit_section.course.courseCode + ' ' + props.section.edit_section.course.courseName,
      selectedFaculty: '',
      blockName: props.section.edit_section.block.name,
      selectedIndex: -1,
      // faculty: '',
    };
  }

  componentWillMount() {
    this.getSections();
    this.getBlocks();
    this.getCourses();
    this.getFaculties();
  }

  getSections() {
    console.log(this.props);
    let item = this.props.section.edit_section.course;
    courseItem.push(<MenuItem value={item.name} key={item.name} primaryText={item.name}/>);
  }

  getBlocks() {
    blockItems = [];
    let item = this.props.section.edit_section.block;
    blockItems.push(<MenuItem value={item.name} key={item.name} primaryText={item.name}/>);

    axios.get('blocks')
      .then((response) => {
        console.log(response);
        blockItems = [];
        response.data.forEach((item) => {
          blockItems.push(<MenuItem value={item.name} key={item.name} primaryText={item.name}/>);
        });
        this.forceUpdate();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getCourses() {
    courseItems = [];
    let item = this.props.section.edit_section.course;
    courseItems.push(<MenuItem value={item.courseCode} key={item.courseCode}
                               primaryText={item.courseCode + item.courseName}/>)
    axios.get('courses')
      .then((response) => {
        console.log(response);
        courseItems = [];
        response.data.forEach((item) => {
          courseItems.push(<MenuItem value={item.courseCode + ' ' + item.courseName} key={item.courseCode}
                                     primaryText={item.courseCode + ' ' + item.courseName}/>)
        })
        this.forceUpdate();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setCourseInfo(courses) {
    courseItem = [];
    courses.forEach((item) => {
      courseItem.push(<MenuItem value={item.name} key={item.name} primaryText={item.name}/>);
    });
  }

  getFaculties() {
    facultyItems = [];

    let item = this.props.section.edit_section;
    facultyItems.push(<MenuItem value={item.facultyId} key={item.facultyId}
                                primaryText={item.facultyId}/>)


    axios.get(baseUrl2 + 'faculties')
      .then((response) => {
        console.log(response);
        this.setState({
          selectedFaculty: response.data.find((item) => item.id === this.props.section.edit_section.facultyId)
        });
        facultyItems = [];
        response.data.forEach((item) => {
          facultyItems.push(<MenuItem value={item} key={item.id}
                                      primaryText={item.firstName + ' ' + item.lastName}/>)
        })
        this.forceUpdate();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    console.log(this.props.section.edit_section.block.name);
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header}
                      title="Update Section"
          />
          <div style={styles.content}>
            <TextField style={styles.content}
                       ref="Block"
                       hintText="Block"
                       floatingLabelText="Block"
                       disabled={true}
                       value={this.state.blockName}
            /><br />
            <TextField style={styles.content}
                       ref="Course"
                       hintText="Course"
                       floatingLabelText="Course"
                       disabled={true}
                       value={this.state.courseCodeName}
            /><br />
            <SelectField floatingLabelText={'Faculty'} style={styles.content}
                         value={this.state.selectedFaculty}
                         ref="faculty"
                         onChange={(event, index, value) => {
                           this.setState({selectedFaculty: value});
                         }}>
              {facultyItems}
            </SelectField>
            <TextField style={styles.content} floatingLabelText="Capacity" ref="capacity"
                       defaultValue={this.props.section.edit_section.capacity}/> <br />
            <TextField style={styles.content} floatingLabelText="Enrolled" ref="enrolled"
                       defaultValue={this.props.section.edit_section.enrolled}/> <br />
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

  update() {
    let blockId = this.props.section.edit_section.block.id;
    let courseId = this.props.section.edit_section.course.id;
    let facultyId = this.state.selectedFaculty.id;
    let capacity = this.refs.capacity.getValue();
    let enrolled = this.refs.enrolled.getValue();

    axios.put('sections/update', {
      "id": this.props.section.edit_section.id,
      "block": {
        id: blockId
      },
      "course": {
        id: courseId
      },
      "facultyId": facultyId,
      "capacity": capacity,
      "enrolled": enrolled,
    })
      .then(function (response) {
        console.log(response);
        browserHistory.push('/sections');
      })
      .catch(function (error) {
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
}

function mapStateToProps(state) {
  return {
    section: state.section,
  }
}

export default connect(mapStateToProps)(EditSections);