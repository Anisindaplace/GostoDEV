import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class SelectForm extends Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOf([PropTypes.array, PropTypes.string]),
    size: PropTypes.string,
    multiple: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onSelectValue: PropTypes.func,
  };

  onChange = (value) => {
    const { onSelectValue, onChange } = this.props;
    onChange(value);
    if (onSelectValue) {
      onSelectValue(value);
    }
  }

  getRenderedOptions = () => {
    const { options } = this.props;
    return options.map((option, index) => <Select.Option key={option.key} value={option.value}>{option.text}</Select.Option>);
  }

  render() {
    const { placeholder, ...rest } = this.props;

    return (
      <Select placeholder={placeholder} {...rest} onChange={this.onChange}>
        {this.getRenderedOptions()}
      </Select>
    );
  }
}

export default SelectForm;
