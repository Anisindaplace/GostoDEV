import React, { Component, PropTypes } from 'react';
import { Input, InputNumber } from 'antd';
import './InputForm.scss';

const TextArea = Input.TextArea;

class InputForm extends Component {
  static propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.handleRef = this.handleRef.bind(this);
    this.focus = this.focus.bind(this);
  }

  handleRef(inputRef) {
    this.inputRef = inputRef;
  }

  focus() {
    this.inputRef.focus();
  }

  render() {
    const { type, ...otherProps } = this.props;

    if (type === 'textarea') {
      return <TextArea {...otherProps} />;
    } else if (type === 'number') {
      return <InputNumber {...otherProps} />;
    }

    return <Input {...otherProps} type={type} />;
  }
}

export default InputForm;
