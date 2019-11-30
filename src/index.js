import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
// ReactDOM.render(<NavBar/>, document.getElementById('nav-bar'));

// ReactDOM.render(<TestKey/>,document.getElementById('test-key'));

serviceWorker.unregister();



ReactDOM.render(<App/>,document.getElementById('root'));