import React, { Component } from 'react';
import { InputNumber } from 'antd';

class InputNumberForm extends Component {
  render() {
    return (
      <InputNumber {...this.props} />
    );
  }
}

export default InputNumberForm;
