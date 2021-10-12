import React, {Component} from "react";

export default class AppointmentsTable extends Component {
    render() {
        const appointments = [
            { id: 1, date: '12.01.2021', name: 'Simeon VV.', comment: '-- no comment --'},
            { id: 2, date: '15.10.2021', name: 'Charles PP', comment: '-- no comment --'},
            { id: 3, date: '02.11.2021', name: 'Slovan S.', comment: '-- no comment --'},
        ];


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
                        <tr key={ appointment.id }>
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