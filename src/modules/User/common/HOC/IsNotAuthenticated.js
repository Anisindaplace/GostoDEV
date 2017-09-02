import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getDisplayName } from '../../../common/utils';

const IsNotAuthenticated = (WrappedComponent) => {
  class WrapperComponent extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool,
      location: PropTypes.object.isRequired,
    }

    render() {
      const { isAuthenticated, location } = this.props;
      const { from } = location.state || { from: { pathname: '/plateform' } };
      return !isAuthenticated
        ? <WrappedComponent {...this.props} />
        : <Redirect to={from} />;
    }
  }

  WrapperComponent.displayName = `IsNotAuthenticated(${getDisplayName(WrappedComponent)})`;
  return WrapperComponent;
};

export default IsNotAuthenticated;
