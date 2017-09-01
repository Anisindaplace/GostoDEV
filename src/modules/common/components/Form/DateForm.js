import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

class DateForm extends Component {
  render() {
    const { dateFormat, ...rest } = this.props;

    const formatDate = dateFormat;
    return (
      <DatePicker
        {...rest}
        format={formatDate}
      />
    );
  }
}

DateForm.propTypes = {
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.any,
  placeholder: PropTypes.string,
};

export default DateForm;
