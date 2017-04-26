import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {baseUrl} from "../../Const";
import {browserHistory} from "react-router";
import {connect} from "react-redux";
import Checkbox from "material-ui/Checkbox";
import Dialog from "material-ui/Dialog";

let blocks = [];
class EditEntry extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentWillMount() {
    this.getEntries();
    this.getBlocks();
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };


  getEntries() {
    //console.log(this.props.entry.edit_entry);
  }

  getBlocks() {
    blocks = [];
    axios.get('blocks')
      .then((response) => {
        console.log("---getBlocks---");
        console.log(response);
        response.data.forEach((item) => {
          blocks.push(
            <Checkbox
              label={item.name}
              style={styles.checkbox}
            />
          );
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  update() {
    let entryID = this.refs.entryID.getValue();
    let entryName = this.refs.entryName.getValue();
    let totalMPPStudents = this.refs.totalMPPStudents.getValue();
    let totalFPPStudents = this.refs.totalFPPStudents.getValue();

    const url = baseUrl + 'entrys/update';
    axios.put(url, {
      id: entryID,
      name: entryName,
      totalMPPStudents: totalMPPStudents,
      totalFPPStudents: totalFPPStudents,
    })
      .then(function (response) {
        console.log(response);
        browserHistory.push('/entries');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];

    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardHeader titleStyle={styles.header}
                      title="Edit Entry"
          />
          <div style={styles.content}>
            <TextField style={styles.content}
                       ref="entryName"
                       defaultValue={this.props.entry.edit_entry.name}
                       hintText="Entry Name"
                       floatingLabelText="Entry Name"
            /><br />
            <TextField style={styles.content}
                       ref="totalMPPStudents"
                       hintText="MPP Students"
                       floatingLabelText="MPP Students"
                       defaultValue={this.props.entry.edit_entry.totalMPPStudents}
            /><br />
            <TextField style={styles.content}
                       ref="totalFPPStudents"
                       hintText="FPP Students"
                       floatingLabelText="FPP Students"
                       defaultValue={this.props.entry.edit_entry.totalFPPStudents}
            /><br />
            {/*<TextField style={styles.content}*/}
            {/*ref="faculties"*/}
            {/*hintText="Faculty"*/}
            {/*/><br />*/}

            <TextField style={styles.content}
                       ref="Blocks"
                       hintText="Blocks"
                       floatingLabelText="Blocks"
                       disabled={true}
                       defaultValue={this.props.entry.edit_entry.blockList}
            /><br />
            <FlatButton label="Change Blocks" primary={true}
                        onTouchTap={this.handleOpen.bind(this)}
            />
            <Dialog
              title="Blocks"
              actions={actions}
              modal={false}
              open={this.state.open}
              bodyStyle={styles.customContentStyle}
              onRequestClose={this.handleClose.bind(this)}
            >
              {blocks}
            </Dialog>
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
    fontSize: '14',
    paddingLeft: '2%',
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
  checkbox: {
    marginBottom: 16,
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  customContentStyle: {
    overflow: 'auto',
  },
}

function mapStateToProps(state) {
  return {
    entry: state.entry,
  }
}

export default connect(mapStateToProps)(EditEntry);