import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Alert, Button, notification, Steps } from 'antd';
import { reduxForm, Field } from 'redux-form';
import {
  SelectField,
  TextField,
} from 'redux-form-antd';

import FormInputs from '../../../../../../common/components/Form';

const musicienType = [{
  value: 'groupe',
  label: 'Groupe',
}, {
  value: 'artiste-solo',
  label: 'Artiste solo',
}, {
  value: 'duo',
  label: 'Duo',
}, {
  value: 'trio',
  label: 'Trio',
}, {
  value: 'quatuor',
  label: 'Quatuor',
}, {
  value: 'chorale',
  label: 'Chrole',
}];

const styleMusicaux = [{
  value: 'rock',
  label: 'Rock',
}, {
  value: 'jazz',
  label: 'Jazz',
}, {
  value: 'world',
  label: 'World',
}, {
  value: 'chanson',
  label: 'Chanson',
}, {
  value: 'electro',
  label: 'Electro',
}, {
  value: 'hip-hop',
  label: 'Hip-Hop',
}, {
  value: 'groove',
  label: 'Groove',
}, {
  value: 'classique',
  label: 'Classique',
}];

const steps = [{
  title: 'Login',
  icon: 'user',
}, {
  title: 'Vérification',
  icon: 'solution',
}, {
  title: 'Image',
  icon: 'image',
}];

class SignupMusicienForm extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    createMusicien: PropTypes.func.isRequired,
  }

  state = {
    current: 0,
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
    const { current } = this.state;
    return (
      <div className="m-w-400">
        <Steps current={current}>
          {steps.map(item => <Steps.Step key={item.title} title={item.title} icon={<Icon type={item.icon} />} />)}
        </Steps>
        <div className="steps-content p-t-30">
          <form>
            {this.renderStep(current)}
          </form>
        </div>
        <div className="steps-action text-center">
          {
            this.state.current < steps.length - 1 &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === steps.length - 1 &&
            <Button
              type="primary"
              htmlType="submit"
              icon="login"
            >
              Commencez l'exploration
            </Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </div>
    );
  }

  renderStep(stepIndex) {
    switch (stepIndex) {
      case 0: return (
        <div>
          <Field
            label="Nom d'utilisateur"
            name="username"
            placeholder="Nom d'utilisateur"
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            component={TextField}
            hintText="Street"
            validationRules={[{ required: true, message: 'Please input your username.' }]}
          />
          <Field
            label="Addresse mail"
            name="email"
            placeholder="Addresse mail"
            component={TextField}
            validationRules={[{ required: true, message: 'Please input your email.' }]}
          />
          <Field
            label="Mot de passe"
            name="password"
            placeholder="Mot de passe"
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            component={TextField}
            type="password"
            validationRules={[{ required: true, message: 'Please input your Password.' }]}
          />
        </div>
      );

      case 1: return (
        <div>
          <Field
            label="Type"
            name="type"
            placeholder="Choissisez votre type"
            component={SelectField}
            options={musicienType}
            validationRules={[{ required: true, message: 'Please choose your type.' }]}
          />
          <Field
            label="Nom de scène"
            name="sceneName"
            placeholder="Nom de scène"
            component={TextField}
            validationRules={[{ required: true, message: 'Please input your scene name.' }]}
          />
          <Field
            label="Site internet"
            name="website"
            placeholder="http://www.example.com/"
            component={TextField}
            validationRules={[{ required: true, message: 'Please input your website.' }]}
          />
          <Field
            label="Présentation/Biographie"
            name="biography"
            placeholder="Parlez-nous un peu de vous..."
            type="textarea"
            component={TextField}
          />
          <Field
            label="Style musicaux"
            name="musicalStyles"
            mode="tags"
            placeholder="Choissisez vos styles musicaux"
            helpText="Vous pouvez choisir un ou plusieurs style musicaux"
            component={SelectField}
            options={styleMusicaux}
          />
          <Field
            label="Influence / Répertoire"
            name="repositories"
            mode="tags"
            placeholder="Choissisez vos répertoires"
            helpText="Vous pouvez choisir un ou plusieurs répertoire"
            component={SelectField}
            options={styleMusicaux}
          />
          <Field
            label="Members"
            name="members"
            placeholder="Avec qui vous travailler ..."
            type="textarea"
            helpText="Ce champ n'est pas obligatoire si vous êtes un artiste solo"
            component={TextField}
          />
          <Field
            label="Instruments"
            name="instruments"
            mode="tags"
            placeholder="Choissisez vos instruments"
            helpText="Vous pouvez choisir un ou plusieurs instrument"
            component={SelectField}
            options={styleMusicaux}
          />
          <Field
            label="Sons"
            name="songs"
            placeholder="Montrez-nous ce que vous savez faire ..."
            type="textarea"
            helpText="Veuillez mettre chaque son dans une ligne"
            component={TextField}
          />
        </div>
      );
    }
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'SignupMusicienForm',
})(SignupMusicienForm);
