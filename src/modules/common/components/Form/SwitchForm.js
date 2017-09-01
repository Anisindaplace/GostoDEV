import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

class SwitchForm extends Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    size: PropTypes.string,
    placeholder: PropTypes.string,
  };

  render() {
    return (
      <Switch {...this.props} />
    );
  }
}

export default SwitchForm;
