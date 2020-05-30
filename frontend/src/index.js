import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';

import  appReducer  from './Redux/appReducer'
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux'; //do link between react-resux
import thunk from "redux-thunk"

let store = createStore(appReducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
