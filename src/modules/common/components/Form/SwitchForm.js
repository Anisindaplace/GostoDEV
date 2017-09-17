import React, { Component } from 'react';
import { Switch } from 'antd';

class SwitchForm extends Component {
  render() {
    return (
      <Switch {...this.props} />
    );
  }
}

export default SwitchForm;
