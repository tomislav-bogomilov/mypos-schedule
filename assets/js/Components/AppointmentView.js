import React, {Component} from "react";
import { getAppointment} from "../Api/appointment_calls";

export default class AppointmentView extends Component {

    constructor(props) {
        super(props);

        //@TODO add loading
        this.state = {
            startDatetime: '',
            endDatetime: '',
            clientNames: '',
            personalId: '',
            email: '',
            comment: '',
        }
    }

    componentDidMount() {
        const appointment = getAppointment(this.props.appointmentId).then((data) => {
            console.log(data);
            this.setState({startDatetime: data.startDateTime});
            this.setState({endDatetime: data.endDateTime});
            this.setState({clientNames: data.user.firstName + ' ' + data.user.lastName});
            this.setState({personalId: data.user.personalID});
            this.setState({comment: data.comment});
            this.setState({email: data.user.email});
        });
    }

    render() {
        return (
            <div className={'row '}>
                <div className={'col-6 card'}>
                    <div className={'card-body'}>
                        <div className={'card-title'}>
                            <h5>Details</h5>
                        </div>
                        <div className={'card-text'}>
                            {/* @TODO change p elements list to more appropriate semantic structure */}
                            <p>
                                <b>Start</b>: {this.state.startDatetime}
                            </p>
                            <p>
                                <b>End</b>:  {this.state.endDatetime}
                            </p>
                            <p>
                                <b>Client</b>: {this.state.clientNames}
                            </p>
                            <p>
                                <b>Id number</b>: {this.state.personalId}
                            </p>
                            <p>
                                <b>Email</b>: {this.state.email}
                            </p>
                            <p>
                                <b>Comment</b>: {this.state.comment}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={'col-6'}></div>
            </div>

        )
    }
}
