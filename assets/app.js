import './styles/app.css';

import './bootstrap';

import React, { Component} from 'react';
import { render } from 'react-dom';
import AppointmentsTable from './js/Components/AppointmentsTable';
import AppointmentForm from './js/Components/AppointmentForm';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import calendarBootstrap from '@fullcalendar/bootstrap';
import { getAllAppointments } from "./js/Api/appointment_calls";
import LoginForm from "./js/Components/LoginForm";

//TODO see where is best to check credentials. This will do the basic checking
if (!localStorage.getItem('access_token') && location.pathname !== '/login') {
    window.location.href = "/login";
} else {
    if (document.getElementById('appointments-table')) {
        render(<AppointmentsTable defaultHighlightedRowId={2}/>, document.getElementById('appointments-table'));
    }

    if (document.getElementById('make-appointment-form')) {
        render(<AppointmentForm/>, document.getElementById('make-appointment-form'));
    }

    if (document.getElementById('login-form-wrapper')) {
        render(<LoginForm/>, document.getElementById('login-form-wrapper'));
    }

    if (document.getElementById('main-dashboard')) {
        let allAppointments = [];
        getAllAppointments()
            .then((data) => {
                const items = data['hydra:member'];
                items.map((item, index) => {
                    allAppointments.push({'title': item.user.firstName + ' ' + item.user.lastName, date: item.startDateTime.slice(0, 19).replace('T', ' ')})
                });

                render(
                    <FullCalendar
                        plugins={[ timeGridPlugin, calendarBootstrap]}
                        initialView="timeGridWeek"
                        weekends={false}
                        events={allAppointments}
                        aspectRatio={2.5}
                        contentHeight={'auto'}
                        handleWindowResize={'true'}
                    />,
                    document.getElementById('main-dashboard')
                );

            });
    }
}


