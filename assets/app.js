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
import AppointmentView from "./js/Components/AppointmentView";
import RegistrationForm from "./js/Components/RegistrationForm";


//@TODO see where is best to check credentials. This will do the basic checking
if (!localStorage.getItem('access_token') && location.pathname !== '/login' && location.pathname !== '/register') {
    //window.location.href = "/login";
    alert('sa');
} else {
    //@TODO refactor: Bad checking on which page client browser is navigated and render corresponding component.

    // Appointments List page
    if (document.getElementById('appointments-table')) {
        render(<AppointmentsTable/>, document.getElementById('appointments-table'));
    }

    // My appointments page
    if (document.getElementById('my-appointments-table')) {
        render(<AppointmentsTable forClient={localStorage.getItem('user_email')}/>, document.getElementById('my-appointments-table'));
    }

    // Make appointment page
    if (document.getElementById('make-appointment-form')) {
        render(<AppointmentForm/>, document.getElementById('make-appointment-form'));
    }

    // Login page
    if (document.getElementById('login-form-wrapper')) {
        render(<LoginForm/>, document.getElementById('login-form-wrapper'));
    }

    // Registration page
    if (document.getElementById('registration-wrapper')) {
        render(<RegistrationForm/>, document.getElementById('registration-wrapper'));
    }

    // Dashboard page
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

    // Appointment detail view
    if (document.getElementById('appointment-view')) {
        var wrapper = document.getElementById('appointment-view');
        var appointmentId = wrapper.dataset.appointmentId;
        render(<AppointmentView appointmentId={appointmentId} />, wrapper);
    }
}


