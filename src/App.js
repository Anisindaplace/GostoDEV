import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Pages
import ConcertsPages from './pages/Concerts';

import Layout from './Layout';
import './App.css';
import './common.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" component={ConcertsPages} />
      </Layout>
    );
  }
}

export default App;
