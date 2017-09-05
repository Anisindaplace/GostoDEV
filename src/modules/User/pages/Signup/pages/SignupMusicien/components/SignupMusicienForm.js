import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Alert, Button, notification } from 'antd';

import FormInputs from '../../../../../../common/components/Form';

const musicienType = [{
  key: 1,
  value: 'groupe',
  text: 'Groupe',
}, {
  key: 2,
  value: 'artiste-solo',
  text: 'Artiste solo',
}, {
  key: 3,
  value: 'duo',
  text: 'Duo',
}, {
  key: 4,
  value: 'trio',
  text: 'Trio',
}, {
  key: 5,
  value: 'quatuor',
  text: 'Quatuor',
}, {
  key: 6,
  value: 'chorale',
  text: 'Chrole',
}];

const styleMusicaux = [{
  key: 1,
  value: 'rock',
  text: 'Rock',
}, {
  key: 2,
  value: 'jazz',
  text: 'Jazz',
}, {
  key: 3,
  value: 'world',
  text: 'World',
}, {
  key: 4,
  value: 'chanson',
  text: 'Chanson',
}, {
  key: 5,
  value: 'electro',
  text: 'Electro',
}, {
  key: 6,
  value: 'hip-hop',
  text: 'Hip-Hop',
}, {
  key: 7,
  value: 'groove',
  text: 'Groove',
}, {
  key: 8,
  value: 'classique',
  text: 'Classique',
}];

class SignupMusicienForm extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    createMusicien: PropTypes.func.isRequired,
  }

  handleSubmit = (e) => {
    const { form, createMusicien, history } = this.props;
    e.preventDefault();
    form.validateFields((error, values) => {
      if (!error) {
        return createMusicien(values).then(({ payload }) => {
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
    const { getFieldDecorator, getFieldError, isSubmitting } = this.props.form;
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
          label="Mot de passe"
          name="password"
          placeholder="Mot de passe"
          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
          component={FormInputs.InputForm}
          type="password"
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your Password.' }]}
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
          label="Type"
          name="type"
          placeholder="Choissisez votre type"
          component={FormInputs.SelectForm}
          options={musicienType}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please choose your type.' }]}
        />
        <FormInputs.FormItem
          label="Nom de scène"
          name="sceneName"
          placeholder="Nom de scène"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your scene name.' }]}
        />
        <FormInputs.FormItem
          label="Site internet"
          name="website"
          placeholder="http://www.example.com/"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your website.' }]}
        />
        <FormInputs.FormItem
          label="Présentation/Biographie"
          name="biography"
          placeholder="Parlez-nous un peu de vous..."
          type="textarea"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
        />
        <FormInputs.FormItem
          label="Style musical"
          name="musicalStyle"
          placeholder="Choissisez vos styles musicaux"
          helpText="Vous pouvez choisir un ou plusieurs style musicaux"
          component={FormInputs.SelectForm}
          options={styleMusicaux}
          decorator={getFieldDecorator}
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
            loading={isSubmitting()}
            icon="login"
          >
            Commencez l'exploration
          </Button>
        </div>
      </FormInputs.Form>
    );
  }
}

export default Form.create()(SignupMusicienForm);
