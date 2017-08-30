import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Alert, Button } from 'antd';
import FormInputs from '../../../components/Form';

import './style.css';

class SigninForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    const error = getFieldError('formValidation');

    return (
      <FormInputs.Form
        size="large"
        layout="vertical"
        decorator={getFieldDecorator}
        onSubmit={this.handleSubmit}
        className="login-form clearfix"
      >
        <FormInputs.FormItem
          label="Username"
          name="username"
          placeholder="Username"
          prefix={<Icon type="user" style={{ fontSize: 13 }} />}
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your username.' }]}
        />
        <FormInputs.FormItem
          label="Password"
          name="password"
          placeholder="Password"
          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
          component={FormInputs.InputForm}
          type="password"
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your Password.' }]}
        />
        {error &&
          <Alert
            message="Error"
            description={error.join(',')}
            type="error"
            showIcon
            className="m-b-15"
          />
        }
        <div>
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </div>
      </FormInputs.Form>
    );
  }
}

export default Form.create()(SigninForm);
