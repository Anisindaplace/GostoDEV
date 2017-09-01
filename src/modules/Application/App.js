import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Pages
import ConcertsPage from '../Concert';
import SigninPage from '../User/pages/Signin';

import Layout from './common/components/Layout';
import './App.css';
import './common.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={ConcertsPage} />
          <Route path="/signin" component={SigninPage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
