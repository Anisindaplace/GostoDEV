import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Pages
import ConcertsPage from './pages/Concerts';
import SigninPage from './pages/Signin';

import Layout from './Layout';
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
