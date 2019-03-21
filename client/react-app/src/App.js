import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Header from './components/Header'
import Top from './components/Top'
import { loginUsingToken } from './actions';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

class App extends Component {
  componentWillMount() {
    try {
      this.props.dispatch(loginUsingToken());
    } catch (error) {
      this.props.history.push('/');
    }
  }

  render() {
    if (this.props.users.isLoggingIn) {
      return (
        <CircularProgress />
      );
    } else {
      return (
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={ Top } />
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default connect(state => state)(App);
