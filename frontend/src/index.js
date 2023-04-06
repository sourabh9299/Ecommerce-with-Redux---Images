import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import store from './Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
import {positions,transitions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
root.render(
    
    <Provider store={store}>
        <App />
    </Provider>

);


