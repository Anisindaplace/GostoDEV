import React from 'react';
import PropTypes from 'prop-types';

import IsNotAuthenticated from '../../../User/common/HOC/IsNotAuthenticated';
import Loader from '../../HOC/Loader';
import Route from './Route';

const PublicRoute = ({ component, ...routeProps }) => (
  <Route
    {...routeProps}
    component={Loader(IsNotAuthenticated(component))}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
