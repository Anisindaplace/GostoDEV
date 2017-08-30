import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

class DatePickerForm extends Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.object,
    size: PropTypes.string,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    format: 'HH:mm',
  };

  render() {
    return (
      <DatePicker {...this.props} />
    );
  }
}

export default DatePickerForm;
