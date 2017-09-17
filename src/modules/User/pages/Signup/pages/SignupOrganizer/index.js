import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createOrganizer } from '../../../../../Organizer/redux/reducer';
import SignupOrganizerForm from './components/SignupOrganizerForm';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    create: data => dispatch(createOrganizer(data)),
  };
};

@connect(null, mapDispatchToProps)
class SignupPage extends Component {
  static propTypes = {
    create: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  render() {
    const { create, history } = this.props;
    return (
      <div className="Signin">
        <h1 className="Section__Title text-center">Créer votre profil d'organisateur de concert</h1>
        <SignupOrganizerForm createOrganizer={create} history={history} />
      </div>
    );
  }
}

export default SignupPage;

