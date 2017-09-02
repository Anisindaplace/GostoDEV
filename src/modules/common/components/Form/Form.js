import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import classNames from 'classnames';

import FormItem from './FormItem';
import InputForm from './InputForm';
import './Form.scss';

export default class FormHOC extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    decorator: PropTypes.func.isRequired,
    className: PropTypes.string,
    layout: PropTypes.string,
  }

  static defaultProps = {
    layout: 'horizontal',
  };

  render() {
    const { decorator, children, layout, className, ...rest } = this.props;
    return (
      <Form className={classNames(className, `Form__${layout}`)} {...rest}>
        {children}
        <div className="hidden">
          <FormItem
            label="formValidation"
            name="formValidation"
            component={InputForm}
            decorator={decorator}
          />
        </div>
      </Form>
    );
  }
}
