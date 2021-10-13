import './styles/app.css';

import './bootstrap';

import React, { Component} from 'react';
import { render } from 'react-dom';
import ScheduleApp from './js/Components/ScheduleApp';
import AppointmentsTable from './js/Components/AppointmentsTable';
import AppointmentForm from './js/Components/AppointmentForm';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import calendarBootstrap from '@fullcalendar/bootstrap';

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
    render(
        <FullCalendar
            plugins={[ timeGridPlugin, calendarBootstrap]}
            initialView="timeGridWeek"
            weekends={false}
            events={[
                { title: 'event 1', date: '2021-10-12 12:10:10' },
                { title: 'event 2', date: '2019-04-02' }
            ]}
        />,
        document.getElementById('main-dashboard')
    );
}


