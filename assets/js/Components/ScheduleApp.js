import React, {Component} from "react";

export default class Schedule extends Component {
    render() {
        let addText = '';
        if (this.props.addText) {
            addText = this.props.addText;
        }

        return (
            <h2>Welcome to myPOS {addText} schedule!</h2>
        );
    }
}