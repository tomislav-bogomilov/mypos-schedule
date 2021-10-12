import './styles/app.css';

import './bootstrap';

import React, { Component} from 'react';
import { render } from 'react-dom';
import ScheduleApp from './js/Components/ScheduleApp';
import AppointmentsTable from './js/Components/AppointmentsTable';

const predicate = 'awesome';

if (document.getElementById('main-title')) {
    render(<ScheduleApp addText={predicate}/>, document.getElementById('main-title'));
}

if (document.getElementById('appointments-table')) {
    render(<AppointmentsTable/>, document.getElementById('appointments-table'));
}


