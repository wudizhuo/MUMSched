import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import axios from "axios";
import {baseUrl} from "../Const";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import MenuItem from "material-ui/MenuItem";

let block = "";
let course = "";
let faculty = "";
let capacity = "";
let courseItem = [];

class EditSections extends Component {

  constructor(props) {
    super(props);

    this.state = {
      blockInfo: [],
      courseInfo: [],
      facultyInfo: [],
      selectedIndex: -1,
    };
  }

  componentWillMount() {
    this.getSections();
    this.getBlocks();
    this.getCourses();
    this.getFaculties();
  }

  getSections() {
    // console.log(this.props);
    let item = this.props.section.edit_section.course;
    courseItem.push(<MenuItem value={item.name} key={item.name} primaryText={item.name}/>);
  }

  getBlocks() {

    axios.get('blocks')
      .then((response) => {
        console.log("---------------")
        console.log(response);
        this.setState({blockInfo: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getCourses() {

    axios.get('courses')
      .then((response) => {
        console.log(response);
        this.setState({courseInfo: response.data});
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
    const url = baseUrl + 'faculty-service/faculties';

    axios.get(url)
      .then((response) => {
        console.log(response);
        this.props.getFaculties(response.data);
        this.setState({facultyInfo: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange1(event, index, blockInfo) {
    this.setState({blockInfo});
  }

  handleChange2(event, index, courseInfo) {
    this.setState({courseInfo});
  }

  handleChange3(event, index, facultyInfo) {
    this.setState({facultyInfo});
  }

  render() {

    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header}
                      title="Update Section"
          />
          <div style={styles.content}>
            <SelectField floatingLabelText={'Select Block'} style={styles.content}
                         value={this.props.section.edit_section.block}
                         ref="block"
                         onChange={this.handleChange1.bind(this)}>
              {this.state.blockInfo.map(block =>
                <Option key={block.id} value={block.id}>)
                  {`${block.name}`}
                </Option>
              )}
            </SelectField>
            <SelectField floatingLabelText={'Select Course'} style={styles.content}
                         value={this.props.section.edit_section.course.name}
                         ref="course"
                         onChange={this.handleChange2.bind(this)}>
              {courseItem}
            </SelectField>
            <SelectField floatingLabelText={'Select Faculty'} style={styles.content}
                         value={this.props.section.edit_section.faculty}
                         ref="faculty"
                         onChange={this.handleChange3.bind(this)}>
              {this.state.facultyInfo.map(faculty =>
                <Option key={faculty.id} value={faculty.id}>)
                  {`${faculty.name}`}
                </Option>
              )}
            </SelectField>
            <TextField style={styles.content} floatingLabelText="Capacity" ref="capacity"
                       defaultValue={this.props.section.edit_section.capacity}/> <br />
            {/*<TextField style={styles.content}*/}
            {/*ref="faculties"*/}
            {/*hintText="Faculty"*/}
            {/*/><br />*/}

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
    block = this.refs.block.getValue();
    course = this.refs.course.getValue();
    faculty = this.refs.faculty.getValue();
    capacity = this.refs.capacity.getValue();

    // console.log(block + course + faculty + capacity);

    const url = baseUrl + 'section-service/sections/update';
    axios.put(url, {
      blockInfo: block,
      courseInfo: course,
      facultyInfo: faculty,
      limitCapacity: capacity,
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