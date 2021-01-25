import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import registerServiceWorker from 'react-service-worker';

const application = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

ReactDOM.render(application, document.getElementById('root'));
registerServiceWorker();