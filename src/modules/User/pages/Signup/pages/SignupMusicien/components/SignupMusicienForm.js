import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Alert, Button, notification, Steps } from 'antd';
import classNames from 'classnames';

import { musicienTypes, styleMusicaux, instruments } from '../constants';
import FormInputs from '../../../../../../common/components/Form';

const steps = [{
  title: 'Login',
  icon: 'user',
}, {
  title: 'Profil',
  icon: 'solution',
}, {
  title: 'Image',
  icon: 'cloud-upload-o',
}];

class SignupMusicienForm extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    createMusicien: PropTypes.func.isRequired,
  }

  state = {
    current: 0,
    isSubmitting: false,
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleSubmit = (e) => {
    const { form, createMusicien, history } = this.props;
    e.preventDefault();
    form.validateFields((error, values) => {
      if (!error) {
        this.setState({ isSubmitting: true });
        return createMusicien(values).then(({ payload }) => {
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

  normalizeFile = (evt) => {
    if (Array.isArray(evt)) {
      return evt;
    }
    return evt && evt.fileList;
  }

  render() {
    const { current, isSubmitting } = this.state;
    const { getFieldDecorator, getFieldError } = this.props.form;
    const error = getFieldError('formValidation');

    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Steps.Step key={item.title} title={item.title} icon={<Icon type={item.icon} />} />)}
        </Steps>
        <div className="steps-content p-t-40">
          <FormInputs.Form
            size="large"
            layout="horizontal"
            decorator={getFieldDecorator}
            onSubmit={this.handleSubmit}
            className="clearfix m-auto"
            style={{ maxWidth: '600px' }}
          >
            <div className={classNames('FormSection', current === 0 && 'visible')}>
              <FormInputs.FormItem
                label="Nom d'utilisateur"
                name="username"
                placeholder="Nom d'utilisateur"
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                component={FormInputs.InputForm}
                decorator={getFieldDecorator}
                validationRules={[
                  { required: true, message: 'Please input your username.' },
                  { type: 'string', pattern: /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/, message: 'The username must include only Alphanumeric characters' },
                ]}
              />
              <FormInputs.FormItem
                label="Addresse mail"
                name="email"
                placeholder="Addresse mail"
                component={FormInputs.InputForm}
                decorator={getFieldDecorator}
                validationRules={[
                  { required: true, message: 'Please input an email.' },
                  { type: 'email', message: 'Please input a correct email.' },
                ]}
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
            </div>
            <div className={classNames('FormSection', current === 1 && 'visible')}>
              <FormInputs.FormItem
                label="Type"
                name="type"
                placeholder="Choissisez votre type"
                component={FormInputs.SelectForm}
                options={musicienTypes}
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
                validationRules={[{ required: true, type: 'url', message: 'Please input a correct website url.' }]}
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
                label="Style musicaux"
                name="musicalStyles"
                mode="tags"
                placeholder="Choissisez vos styles musicaux"
                helpText="Vous pouvez choisir un ou plusieurs style musicaux"
                component={FormInputs.SelectForm}
                options={styleMusicaux}
                decorator={getFieldDecorator}
              />
              <FormInputs.FormItem
                label="Répertoire"
                name="repository"
                helpText="Reprises ou chansons originales"
                component={FormInputs.SwitchForm}
                decorator={getFieldDecorator}
              />
              <FormInputs.FormItem
                label="Influence"
                name="inspirations"
                type="textarea"
                placeholder="Quels artistes t’inspirent ?"
                helpText="Quels artistes t’inspirent ? Des exemples de titres que tu reprends ?"
                component={FormInputs.InputForm}
                decorator={getFieldDecorator}
              />
              <FormInputs.FormItem
                label="Members"
                name="members"
                placeholder="Avec qui vous travaillez ..."
                type="textarea"
                helpText="Ce champ n'est pas obligatoire si vous êtes un artiste solo"
                component={FormInputs.InputForm}
                decorator={getFieldDecorator}
              />
              <FormInputs.FormItem
                label="Instruments"
                name="instruments"
                mode="tags"
                placeholder="Choissisez vos instruments"
                helpText="Vous pouvez choisir un ou plusieurs instrument"
                component={FormInputs.SelectForm}
                options={instruments}
                decorator={getFieldDecorator}
              />
              <FormInputs.FormItem
                label="Sons"
                name="songs"
                placeholder="Montrez-nous ce que vous savez faire ..."
                type="textarea"
                helpText="Veuillez mettre chaque son dans une ligne"
                component={FormInputs.InputForm}
                decorator={getFieldDecorator}
              />
            </div>
            <div className={classNames('FormSection', current === 2 && 'visible', 'FormSection--Image')}>
              <FormInputs.FormItem
                label="User Image"
                name="images"
                valuePropName="fileList"
                getValueFromEvent={this.normalizeFile}
                component={FormInputs.FileForm}
                decorator={getFieldDecorator}
              />
            </div>
            {error &&
              <Alert
                message="Error"
                description={error.join(',')}
                type="error"
                showIcon
                className="m-b-15"
              />
            }
            <div className="steps-action text-center p-t-40">
              {
                this.state.current < steps.length - 1 &&
                <Button type="primary" onClick={() => this.next()}>Passer à l'étape suivante</Button>
              }
              {
                this.state.current === steps.length - 1 &&
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  icon="login"
                >
                  Commencez l'exploration
                </Button>
              }
              {
                this.state.current > 0
                &&
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Revenir en arrière
                </Button>
              }
            </div>
          </FormInputs.Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(SignupMusicienForm);
