import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createMusicien } from '../../../../../Musicien/redux/reducer';
import SignupMusicienForm from './components/SignupMusicienForm';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    create: data => dispatch(createMusicien(data)),
  };
};

@connect(null, mapDispatchToProps)
class SignupPage extends Component {
  static propTypes = {
    create: PropTypes.func.isRequired,
  }

  render() {
    const { create } = this.props;
    return (
      <div className="Signin">
        <h1 className="Section__Title text-center">Créer votre profil de Musicien</h1>
        <SignupMusicienForm createMusicien={create} />
      </div>
    );
  }
}

export default SignupPage;

