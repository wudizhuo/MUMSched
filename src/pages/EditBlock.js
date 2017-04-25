import React, {Component} from "react";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import {baseUrl} from "../Const";
import {browserHistory} from "react-router";

let blockName = "";
let startDate = "";
let endDate = "";
let mppStudents = "";
let fppStudents = "";

class EditBlock extends Component {
    constructor(props) {
        super(props);
    };

    componentWillMount() {
        this.getBlocks();
    }

    getBlocks() {
        console.log(this.props.block.edit_block);
    }

    render() {
        return (
            <div style={styles.container}>
                <Card style={styles.card}>
                    <CardHeader titleStyle={styles.header} title="Edit Block" />

                    <div style={styles.content}>
                        <TextField style={styles.content} floatingLabelText="Block Name" ref="blockName" defaultValue = {this.props.block.edit_block.blockName} /><br />
                        <TextField style={styles.content} floatingLabelText="Start Date" ref="startDate" defaultValue = {this.props.block.edit_block.startDate} /> <br />
                        <TextField style={styles.content} floatingLabelText="End Date" ref="endDate" defaultValue = {this.props.block.edit_block.endDate} /> <br />
                        <TextField style={styles.content} floatingLabelText="Total MPP Students" ref="mppStudents" defaultValue = {this.props.block.edit_block.mppStudents}/> <br />
                        <TextField style={styles.content} floatingLabelText="Total FPP Students" ref="fppStudents" defaultValue = {this.props.block.edit_block.fppStudents} /> <br />
                    </div>

                    <CardActions style={styles.cardAction}>
                        <FlatButton label="Update" primary={true} onClick={this.update.bind(this)} />
                    </CardActions>
                </Card>
            </div>
        )
    }
    update() {
        blockName = this.refs.blockName.getValue();
        startDate = this.refs.startDate.getValue();
        endDate = this.refs.endDate.getValue();
        mppStudents = this.refs.mppStudents.getValue();
        fppStudents = this.refs.fppStudents.getValue();
        console.log(this.state.value);

        const url = baseUrl + 'blocks/add';
        axios.post(url, {
            blockName: blockName,
            startDate: startDate,
            endDate: endDate,
            totalMPPStudents: mppStudents,
            totalFPPStudents: fppStudents,
        })
            .then(function (response) {
                //show snack bar
                console.log(response);
                browserHistory.push('/blocks');
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

export default EditBlock;