import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Alert, Button, notification } from 'antd';
import pluralize from 'pluralize';

import FormInputs from '../../common/components/Form';

import { musicienTypes, styleMusicaux } from '../constants/constants';

class CreateConcertForm extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    createConcert: PropTypes.func.isRequired,
  }

  state = {
    isSubmitting: false,
  }

  handleSubmit = (e) => {
    const { form, createConcert, history } = this.props;
    e.preventDefault();
    form.validateFields((error, values) => {
      if (!error) {
        this.setState({ isSubmitting: true });
        return createConcert(values).then(({ payload }) => {
          this.setState({ isSubmitting: false });
          if (payload.success) {
            form.resetFields();
            notification.success({
              message: 'Concert',
              description: 'Le concert a été bien créé, maintenant il faut commencer à chercher des artistes',
              duration: 5,
            });
            history.push('/musiciens');
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
          label="Titre court"
          name="shortTitle"
          placeholder="Titre court"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your shortTitle.' }]}
        />
        <FormInputs.FormItem
          label="Description"
          name="description"
          placeholder="Description de l'annonce"
          type="textarea"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your description.' }]}
        />
        <FormInputs.FormItem
          label="Date du concert"
          name="concertDate"
          placeholder="Date du concert"
          component={FormInputs.DateForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your concertDate.' }]}
        />
        <FormInputs.FormItem
          label="Heure du RDV"
          name="time"
          placeholder="Heure du RDV"
          component={FormInputs.TimePickerForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your time.' }]}
        />
        <FormInputs.FormItem
          label="Duration"
          name="duration"
          placeholder="La durée du concert"
          component={FormInputs.InputNumberForm}
          decorator={getFieldDecorator}
          validationRules={[{ required: true, message: 'Please input your duration.' }]}
          formatter={value => value ? `${value}h` : ''}
          parser={value => value.replace('h', '')}
        />
        <FormInputs.FormItem
          label="Catégorie d’artistes"
          name="artisteCategories"
          placeholder="Choissisez vos catégories d’artistes"
          mode="tags"
          component={FormInputs.SelectForm}
          options={musicienTypes}
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
          label="Taille du groupe"
          name="groupSize"
          placeholder="Taille du groupe"
          component={FormInputs.InputNumberForm}
          decorator={getFieldDecorator}
          min={0}
          validationRules={[{ required: true, message: 'Please input your group size.' }]}
          formatter={value => value ? `${pluralize('membre', value, true)}` : ''}
          parser={value => value.replace(pluralize('membre', value), '')}
        />
        <FormInputs.FormItem
          label="Matériel de musique"
          name="isMaterial"
          helpText="Est-ce que vous mettez à disposition des artistes du matériel de musique"
          component={FormInputs.SwitchForm}
          decorator={getFieldDecorator}
        />
        <FormInputs.FormItem
          label="Avantages"
          name="advantages"
          placeholder="Qu'est-ce que vous proposez comme avantages"
          type="textarea"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
        />
        <FormInputs.FormItem
          label="Remarques"
          name="remarks"
          placeholder="Avez-vous des remarques à écrire"
          type="textarea"
          component={FormInputs.InputForm}
          decorator={getFieldDecorator}
        />
        <div className="FileInput--big">
          <FormInputs.FormItem
            label="Image"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={this.normalizeFile}
            multiple
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
        <div className="pull-right">
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            icon="login"
          >
            Créer votre concert
          </Button>
        </div>
      </FormInputs.Form>
    );
  }
}

export default Form.create()(CreateConcertForm);
