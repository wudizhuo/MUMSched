import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {baseUrl} from "../../Const";
import {browserHistory} from "react-router";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

let entriesMenuItem = [];
class CreateBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: {},
    };
  }

  componentWillMount() {
    this.getEntries();
  }

  getEntries() {
    axios.get(baseUrl + 'entrys')
      .then((response) => {
        console.log(response.data);
        this.setEntriesMenuItem(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.props.showSnackbar(error.status + ' ' + error);
      });
  }

  setEntriesMenuItem(data) {
    entriesMenuItem = [];
    data.forEach((item) => {
      entriesMenuItem.push(<MenuItem value={item} key={item.name} primaryText={item.name}/>);
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header} title="Create Block"/>

          <div style={styles.content}>
            <TextField style={styles.content} floatingLabelText="SeqNumber" ref="seqNumber"/><br />
            <TextField style={styles.content} floatingLabelText="Block Name" ref="blockName"/><br />
            <DatePicker style={styles.content} floatingLabelText="Start Date" ref="startDate" mode="landscape"/> <br />
            <DatePicker style={styles.content} floatingLabelText="End Date" ref="endDate" mode="landscape"/> <br />
            <SelectField floatingLabelText={'Select Entry'} style={styles.content}
                         value={this.state.selectedEntry}
                         ref="selectEntry"
                         onChange={(event, index, value) => {
                           this.setState({selectedEntry: value})
                         }}>
              {entriesMenuItem}
            </SelectField>
          </div>
          <CardActions style={styles.cardAction}>
            <FlatButton label="Create" primary={true} onClick={this.create.bind(this)}/>
          </CardActions>
        </Card>
      </div>
    )
  }

  create() {
    let seqNumber = this.refs.seqNumber.getValue();
    let blockName = this.refs.blockName.getValue();
    let startDate = this.refs.startDate.getDate();
    let endDate = this.refs.endDate.getDate();

    const url = baseUrl + 'blocks/add';
    axios.post(url, {
      "name": blockName,
      "seqNumber": seqNumber,
      "startDate": startDate,
      "endDate": endDate,
      "entry": this.state.selectedEntry.id
    })
      .then(function (response) {
        //show snack bar
        console.log(response);
        browserHistory.push('/blocks');
      })
      .catch(function (error) {
        //show snack bar
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

export default CreateBlock;