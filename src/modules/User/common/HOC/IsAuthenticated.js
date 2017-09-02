import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getDisplayName } from '../../../common/utils';

const IsAuthenticated = (WrappedComponent) => {
  class WrapperComponent extends Component {
    static propTypes = {
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      authUser: PropTypes.object,
      isAuthenticated: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
    }

    componentWillMount() {
      const { authUser, loaded, location, history } = this.props;
      const userNotFound = (!!authUser && authUser.isEmpty()) || (loaded && !authUser);
      if (userNotFound) {
        history.replace('/signin', {
          from: encodeURI(location.pathname),
        });
      }
    }

    render() {
      const { isAuthenticated } = this.props;
      return isAuthenticated
        ? <WrappedComponent {...this.props} />
        : null;
    }
  }

  WrapperComponent.displayName = `IsAuthenticated(${getDisplayName(WrappedComponent)})`;
  return WrapperComponent;
};

export default IsAuthenticated;
