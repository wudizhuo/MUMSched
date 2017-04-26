import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import {baseUrl} from "../../Const";
import {browserHistory} from "react-router";

let blocks = [];
let courses = [];
let faculties = [];
class CreateSection extends Component {
  constructor(props) {
    super(props);
    // this.state = { value: 'Student',}

    this.state = {
      course: '',
      faculty: '',
      block: '',
    };
  };

  componentWillMount() {
    this.getBlocks();
    this.getCourses();
    this.getFaculties();
  }

  getBlocks() {
    blocks = [];
    axios.get('blocks')
      .then((response) => {
        console.log(response);
        response.data.forEach((item) => {
          blocks.push(<MenuItem value={item.name} key={item.name} primaryText={item.name}/>);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getCourses() {
    courses = [];
    axios.get('courses')
      .then((response) => {
        console.log(response);
        response.data.forEach((item) => {
          courses.push(<MenuItem value={item.courseCode} key={item.courseCode}
                                 primaryText={item.courseCode + ' ' + item.courseName}/>)
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getFaculties() {
    faculties = [];
    axios.get('http://10.10.11.103:8082/faculties')
      .then((response) => {
        console.log(response);
        sponse.data.forEach((item) => {
          faculties.push(<MenuItem value={item.loginId} key={item.loginId}
                                   primaryText={item.firstName + ' '+ item.lastName}/>)
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header} title="Create Section"/>

          <div style={styles.content}>
            <SelectField floatingLabelText={'Select Block'} style={styles.content} value={this.state.block}
                         ref="block"
                         onChange={(event, index, value) => {
                           this.setState({block: value});
                         }}>
              {blocks}
            </SelectField>
            <SelectField floatingLabelText={'Select Course'} style={styles.content} value={this.state.course}
                         ref="course"
                         onChange={(event, index, value) => {
                           this.setState({course: value});
                         }}>
              {courses}
            </SelectField>
            <SelectField floatingLabelText={'Select Faculty'} style={styles.content} value={this.state.faculty}
                         ref="faculty"
                         onChange={(event, index, value) => {
                           this.setState({faculty: value});
                         }}>
              {faculties}
            </SelectField>
            <TextField style={styles.content} floatingLabelText="Capacity" ref="capacity"/> <br />
          </div>

          <CardActions style={styles.cardAction}>
            <FlatButton label="Submit" primary={true} onClick={this.create.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }

  create() {
    let blockId = this.refs.block.getValue();
    let courseCode = this.refs.course.getValue();
    let faculty = this.refs.faculty.getValue();
    let capacity = this.refs.capacity.getValue();
    console.log(this.state.value);

    const url = baseUrl + 'section-service/section/add';
    axios.post(url, {
      block: blockId,
      courseId: courseCode,
      limitCapacity: capacity,
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

export default CreateSection;