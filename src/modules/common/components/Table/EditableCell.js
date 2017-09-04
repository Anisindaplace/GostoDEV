import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';

import './EditableCell.scss';

export default class EditableCell extends Component {
  static propTypes = {
    textValue: PropTypes.string,
    value: PropTypes.string,
    component: PropTypes.func,
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    textValue: this.props.value || ' ',
    value: this.props.value || ' ',
    editable: false,
  }

  getFieldValue = (evt) => {
    // If the field is a text input, the new input value need to be taken from the event
    // otherwise, if it's for instance a select form, the evt param is actually the new value of the select field
    const { options } = this.props;
    if (evt.target) {
      return {
        textValue: evt.target.value,
        value: evt.target.value,
      };
    }

    const optionItem = options.find(option => option.key === evt);

    return {
      textValue: optionItem.text,
      value: optionItem.key,
    };
  }

  handleChange = (evt) => {
    this.setState(this.getFieldValue(evt));
  }

  check = () => {
    const { onChange } = this.props;
    const { value } = this.state;

    this.stopEditing();

    if (onChange) {
      onChange(value);
    }
  }

  startEditing = () => {
    this.setState({ editable: true });
  }

  stopEditing = () => {
    this.setState({ editable: false });
  }

  render() {
    const { component, ...otherProps } = this.props;
    const { value, textValue, editable } = this.state;
    const FormComponent = component || Input;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <FormComponent
                {...otherProps}
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <div className="editable-cell-icon">
                <Icon
                  type="check"
                  className="editable-cell-icon-check"
                  onClick={this.check}
                />
                <Icon
                  type="close"
                  className="editable-cell-icon-close"
                  onClick={this.stopEditing}
                />
              </div>
            </div>
            :
            <div className="editable-cell-text-wrapper" onDoubleClick={this.startEditing}>
              {textValue}
              <Icon
                type="edit"
                className="editable-cell-icon-edit"
                onClick={this.startEditing}
              />
            </div>
        }
      </div>
    );
  }
}
