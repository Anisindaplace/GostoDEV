import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDisplayName } from '../../../common/utils';
import { getProfile } from '../../redux/authReducer';

function mapStateToProps(state, ownProps) {
  const user = state.auth.get('user');
  const loaded = state.auth.getIn(['_metadata', 'logged', 'status']);
  return {
    loading: state.auth.getIn(['_metadata', 'logging']),
    loaded,
    isAuthenticated: loaded && !!user && !user.isEmpty(),
    authUser: user,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getUserProfile: () => dispatch(getProfile()),
  };
}

const FetchUser = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class WrapperComponent extends Component {
    static propTypes = {
      getUserProfile: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool.isRequired,
    }

    componentWillMount() {
      const { getUserProfile, isAuthenticated } = this.props;
      if (!isAuthenticated) {
        getUserProfile();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WrapperComponent.displayName = `FetchUser(${getDisplayName(WrappedComponent)})`;
  return WrapperComponent;
};

export default FetchUser;
