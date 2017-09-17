import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Breacrumb from '../../../common/components/Breadcrumb/Breadcrumb';

import { createConcert } from '../../redux/reducer';
import CreateConcertForm from '../../components/CreateConcertForm';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    create: data => dispatch(createConcert(data)),
  };
};

@connect(null, mapDispatchToProps)
class CreateConcertPage extends Component {
  static propTypes = {
    create: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  render() {
    const { create, history } = this.props;
    return (
      <div className="CreateConcertPage">
        <Breacrumb
          pageTitle="Créer votre concert"
          pageDescription="Créer votre concert et partagez le avec le monde entier"
        />
        <div className="section before-after">
          <div className="container">
            <CreateConcertForm createConcert={create} history={history} />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateConcertPage;

