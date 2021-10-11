import './styles/app.css';

import './bootstrap';

import React from 'react';
import ReactDom from 'react-dom';

const elem = React.createElement('h2', null, 'Welcome to myPOS schedule!');
ReactDom.render(elem, document.getElementById('main-title'));
