import React, {Component} from "react";
import { getPaginatedAppointments } from "../Api/appointment_calls";
import { deleteAppointment } from "../Api/appointment_calls";
import ReactPaginate from 'react-paginate';
import ReactDOM from 'react-dom';
import DateRangeColumnFilter from './DateRangeColumnFilter';

export default class AppointmentsTable extends Component {
    constructor(props) {
        super(props);

        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);

        this.state = {
            appointments: [],
            loading: false,
            currentPage: 1,
            appointmentsPerPage: 7
        }
    }

     getAppointments = async(page) => {
        getPaginatedAppointments(page)
            .then((data) => {
                const items = data['hydra:member'];
                this.setState({ appointments: [] });
                items.map((item, index) => {
                    const preparedAppointment = {
                        id: item.id,
                        date: item.startDateTime.slice(0, 19).replace('T', ' '),
                        name: item.user.firstName,
                        comment: item.comment

                    };
                    this.setState({loading: false});
                    this.setState({ appointments: [...this.state.appointments, preparedAppointment] });
                });

                const pages = data['hydra:totalItems']/7;

                ReactDOM.render(
                    <ReactPaginate
                        previousLabel={'prev'}
                        nextLabel={'next'}
                        pageCount={pages}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination justify-content-center'}
                        activeClassName={'active'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakLinkClassName={'page-link'}
                    />,
                    document.getElementById('paginator'));

            });
    };

    componentDidMount() {
        this.getAppointments(this.state.currentPage);
    }

    handleDeleteClick(event, appointmentId) {
        console.log(event);
        /*
        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== id) {
                        return repLog;
                    }

                    return {...repLog, isDeleting: true};
                })
            };
        });
        */
        deleteAppointment(appointmentId)
            .then(() => {
                // remove the rep log without mutating state
                // filter returns a new array
                this.setState((prevState) => {
                    return {
                        appointments: prevState.appointments.filter(appointment => appointment.id !== appointmentId)
                    };
                });

            });
    }

    handlePageClick(data) {
        // fix paginator indexing from page 0
        const page = data.selected + 1;
        this.getAppointments(page);
    }

    render() {
        const { appointments, appointmentsPerPage, loading, currentPage } = this.state;

        return (
            <div>
                {/*<DateRangeColumnFilter/>*/}
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Action</th>
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
                                <td>
                                    <a href="#" onClick={(event) => this.handleDeleteClick(event, appointment.id) }>
                                        <span className="fa fa-trash"></span>
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <nav id="paginator">
                </nav>
            </div>

        );
    }
}