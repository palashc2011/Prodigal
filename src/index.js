import React from 'react' ;
import {render} from 'react-dom';
import App from './App';
import {Router} from 'react-router'
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import './css/App.css';
import 'semantic-ui-css/semantic.min.css';
const history=createHistory()

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>
, document.getElementById('app'));
