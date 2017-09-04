import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signin } from '../../redux/authReducer';

import Breacrumb from '../../../common/components/Breadcrumb/Breadcrumb';
import SigninForm from './components/SigninForm';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signin: data => dispatch(signin(data)),
  };
};

@connect(null, mapDispatchToProps)
class SigninPage extends Component {
  static propTypes = {
    signin: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  }

  render() {
    const { loading: logging } = this.props;
    return (
      <div className="Signin">
        <Breacrumb pageTitle="Sign in" />
        <div className="section before-after">
          <div className="container">
            <SigninForm
              logging={logging}
              signin={this.props.signin}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SigninPage;

