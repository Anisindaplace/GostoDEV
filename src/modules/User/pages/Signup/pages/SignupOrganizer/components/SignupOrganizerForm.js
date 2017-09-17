import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Alert, Button, notification } from 'antd';

import FormInputs from '../../../../../../common/components/Form';

class SignupOrganizerForm extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    createOrganizer: PropTypes.func.isRequired,
  }

  state = {
    isSubmitting: false,
  }

  handleSubmit = (e) => {
    const { form, createOrganizer, history } = this.props;
    e.preventDefault();
    form.validateFields((error, values) => {
      if (!error) {
        this.setState({ isSubmitting: true });
        return createOrganizer(values).then(({ payload }) => {
          this.setState({ isSubmitting: false });
          if (payload.success) {
            form.resetFields();
            notification.success({
              message: 'Sign in',
              description: 'You are all set, start your new experience in the plateform',
              duration: 5,
            });
            history.push('/signin');
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
    const { isSubmitting } = this.state;
    const { getFieldDecorator, getFieldError } = this.props.form;
    const error = getFieldError('formValidation');

    return (
      <FormInputs.Form
        size="large"
        layout="horizontal"
        decorator={getFieldDecorator}
        onSubmit={this.handleSubmit}
        className="clearfix m-auto"
        style={{ maxWidth: '600px' }}
      >
        <FormInputs.FormItem
          label="Nom d'utilisateur"
          name="username"
          placeholder="Nom d'utilisateur"
          prefix={<Icon type="user" style={{ fontSize: 13 }} />}
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your username.' }]}
        />
        <FormInputs.FormItem
          label="Addresse mail"
          name="email"
          placeholder="Addresse mail"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your email.' }]}
        />
        <FormInputs.FormItem
          label="Mot de passe"
          name="password"
          placeholder="Mot de passe"
          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
          component={FormInputs.InputForm}
          type="password"
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your password.' }]}
        />
        <FormInputs.FormItem
          label="Nom"
          name="name"
          placeholder="Nom"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your name.' }]}
        />
        <FormInputs.FormItem
          label="Addresse"
          name="address"
          placeholder="Address"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your location.' }]}
        />
        <FormInputs.FormItem
          label="Description"
          name="description"
          placeholder="Description"
          type="textarea"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your Description.' }]}
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
        <div className="pull-right">
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            icon="login"
          >
            Commencez l'exploration
          </Button>
        </div>
      </FormInputs.Form>
    );
  }
}

export default Form.create()(SignupOrganizerForm);
