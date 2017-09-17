import React, { Component } from 'react';
import { DatePicker } from 'antd';

class DatePickerForm extends Component {
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
