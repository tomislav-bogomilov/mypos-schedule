import './styles/app.css';

import './bootstrap';

import React, { Component} from 'react';
import { render } from 'react-dom';
import ScheduleApp from './js/Components/ScheduleApp';
import AppointmentsTable from './js/Components/AppointmentsTable';
import AppointmentForm from './js/Components/AppointmentForm';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import calendarBootstrap from '@fullcalendar/bootstrap';
import { getAllAppointments } from "./js/Api/retrieve_appointments";

const predicate = 'awesome';

if (document.getElementById('main-title')) {
    render(<ScheduleApp addText={predicate}/>, document.getElementById('main-title'));
}

if (document.getElementById('appointments-table')) {
    render(<AppointmentsTable defaultHighlightedRowId={2}/>, document.getElementById('appointments-table'));
}

if (document.getElementById('make-appointment-form')) {
    render(<AppointmentForm/>, document.getElementById('make-appointment-form'));
}

if (document.getElementById('main-dashboard')) {
    let allAppointments = [];
    getAllAppointments()
        .then((data) => {
            const items = data['hydra:member'];
            items.map((item, index) => {
                allAppointments.push({'title': item.user.firstName, date: item.startDateTime.slice(0, 19).replace('T', ' ')})
            });

            render(
                <FullCalendar
                    plugins={[ timeGridPlugin, calendarBootstrap]}
                    initialView="timeGridWeek"
                    weekends={false}
                    events={allAppointments}
                />,
                document.getElementById('main-dashboard')
            );

        });
}


