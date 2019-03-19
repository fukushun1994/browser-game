import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Header from './components/Header'
import Top from './components/Top'
import Registration from './components/Registration'
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path='/' component={ Top } />
          <Route path='/registration' component={ Registration } />
          <Route path='/login' component={ Login } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
