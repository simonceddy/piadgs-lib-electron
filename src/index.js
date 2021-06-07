import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './shared/styles/index.css';
import './shared/styles/tailwind.css';
import axios from 'axios';
import { Provider } from 'react-redux';
import App from './App';
// import TestApp from './TestApp';
import reportWebVitals from './reportWebVitals';
import config from './config';
import store from './store';

axios.defaults.baseURL = config.client.baseUrl;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        {/* <TestApp /> */}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
