import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, Icon } from 'antd';

const Item = Form.Item;

export default class FormItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    helpText: PropTypes.string,
    formItemLayout: PropTypes.object,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    decorator: PropTypes.func.isRequired,
    validationRules: PropTypes.array,
    valuePropName: PropTypes.string,
    getValueFromEvent: PropTypes.func,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  }

  static defaultProps = {
    ...Component.defaultProps,
  }

  render() {
    const { label, decorator, validationRules, valuePropName, getValueFromEvent, initialValue, helpText, component, extra, ...componentProps } = this.props;
    const decoratorProps = {
      initialValue,
    };

    let labelProp = label;
    if (validationRules) decoratorProps.rules = validationRules;
    if (valuePropName) decoratorProps.valuePropName = valuePropName;
    if (getValueFromEvent) decoratorProps.getValueFromEvent = getValueFromEvent;
    if (helpText) {
      labelProp = (
        <span>
          {label}&nbsp;
          <Tooltip title={helpText}><Icon type="question-circle-o" /></Tooltip>
        </span>
      );
    }

    return (
      <Item
        label={labelProp}
        hasFeedback={validationRules && validationRules.length > 0}
      >
        {decorator(componentProps.name, decoratorProps)(createElement(component, componentProps))}
        {extra}
      </Item>
    );
  }
}
