import React from 'react';
import PropTypes from 'prop-types';

import IsAuthenticated from '../../../User/common/HOC/IsAuthenticated';
import Loader from '../../HOC/Loader';
import Route from './Route';

const PrivateRoute = ({ component, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      component={Loader(IsAuthenticated(component))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
