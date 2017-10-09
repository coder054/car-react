import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppState from './AppState';



ReactDOM.render(<App appState={new AppState()}/>, document.getElementById('root'));
registerServiceWorker();