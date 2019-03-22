import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger(),
    )
);

const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                margin: 8,
                display: 'inline-block',
                textAlign: 'left',
                verticalAlign: 'top',
                minWidth: 275
            }
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
