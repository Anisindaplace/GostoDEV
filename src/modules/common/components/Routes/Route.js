import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const RouteWrapper = ({ path, exact, match, component: Component, ...rest }) => {
  return (
    <Route
      path={path}
      exact={exact}
      match={match}
      render={props => <Component {...props} {...rest} />}
    />
  );
};

RouteWrapper.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
  match: PropTypes.bool,
};

export default RouteWrapper;
