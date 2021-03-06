import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Alert, Button } from 'antd';
import { Link } from 'react-router-dom';

import FormInputs from '../../../../common/components/Form';
import './style.scss';

class SigninForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    signin: PropTypes.func.isRequired,
    logging: PropTypes.bool.isRequired,
  }

  handleSubmit = (e) => {
    const { form, signin } = this.props;
    e.preventDefault();
    form.validateFields((error, values) => {
      if (!error) {
        return signin(values).then(({ payload }) => {
          if (payload.success) {
            form.resetFields();
          } else {
            form.setFields({
              formValidation: {
                errors: [payload.errors[0]],
              },
            });
          }
        });
      }
    });
  }
  render() {
    const { logging } = this.props;
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
          label="Nom d'utilisateur"
          name="username"
          placeholder="Nom d'utilisateur ou adresse mail"
          prefix={<Icon type="user" style={{ fontSize: 13 }} />}
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your username.' }]}
        />
        <FormInputs.FormItem
          label="Mot de passe"
          name="password"
          placeholder="Mot de passe"
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
          <Link className="login-form-forgot" to="/forget-password">Mot de passe oublié ?</Link>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={logging}
          >
            Log in
          </Button>
          Ou <Link to="/signup">Inscrivez-vous dès maintenant</Link>
        </div>
      </FormInputs.Form>
    );
  }
}

export default Form.create()(SigninForm);
