import React, { Component } from 'react';
import { DatePicker } from 'antd';

import Layout from './Layout';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Layout>
        <DatePicker />
      </Layout>
    );
  }
}

export default App;
