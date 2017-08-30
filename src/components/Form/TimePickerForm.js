import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';

class TimePickerForm extends Component {
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
      <TimePicker {...this.props} />
    );
  }
}

export default TimePickerForm;
