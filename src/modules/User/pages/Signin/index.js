import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signin } from '../../redux/authReducer';

import Breacrumb from '../../../common/components/Breadcrumb/Breadcrumb';
import SigninForm from './components/SigninForm';
import bg from '../../../common/assets/bg.jpg';

class SigninPage extends Component {
  static propTypes = {
    signin: PropTypes.func.isRequired,
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="Signin">
        <Breacrumb pageTitle="Signin" imageSrc={bg} />
        <div className="section before-after">
          <div className="container">
            <SigninForm
              logging={auth.getIn(['_metadata', 'logging'])}
              signin={this.props.signin}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signin: data => dispatch(signin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);

