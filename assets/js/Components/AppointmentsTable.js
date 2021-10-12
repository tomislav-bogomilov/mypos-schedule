import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class AppointmentsTable extends Component {
    constructor(props) {
        super(props);

        const { defaultHighlightedRowId } = props;

        this.state = {
            highlightedRowId: null,
            appointments: [
                {id: 1, date: '12.01.2021', name: 'Simeon VV.', comment: '-- no comment --'},
                {id: 2, date: '15.10.2021', name: 'Charles PP', comment: '-- no comment --'},
                {id: 3, date: '02.11.2021', name: 'Slovan S.', comment: '-- no comment --'}
            ]
        }
    }

    handleClickHighlight(appointmentId, event) {
        this.setState({ highlightedRowId: appointmentId });
    }

    render() {
        const { appointments } = this.state;
        const { highlightedRowId } = this.state;

        return (
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Comment</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((appointment) => {
                    return (
                        <tr
                            key={ appointment.id }
                            className={ highlightedRowId === appointment.id ? 'table-info' : '' }
                            onClick={ (event) => this.handleClickHighlight(appointment.id, event) }
                        >
                            <td>{ appointment.id }</td>
                            <td>{ appointment.date }</td>
                            <td>{ appointment.name }</td>
                            <td>{ appointment.comment }</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }
}

AppointmentsTable.propTypes = {
    defaultHighlightedRowId: PropTypes.number
};