import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import { signout } from '../User/redux/authReducer';

// Pages
import ConcertsPage from '../Concert';
import SigninPage from '../User/pages/Signin';
import SignupPage from '../User/pages/Signup';
import Plateform from '../Plateform';

import FetchUser from '../User/common/HOC/FetchUser';
import Layout from './common/components/Layout';
import PrivateRoute from '../common/components/Routes/PrivateRoute';
import PublicRoute from '../common/components/Routes/PublicRoute';
import Route from '../common/components/Routes/Route';

import './App.scss';
import './common.scss';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userSignout: () => dispatch(signout()),
  };
};

@FetchUser
@connect(null, mapDispatchToProps)
class App extends Component {
  static propTypes = {
    authUser: PropTypes.object,
    location: PropTypes.object.isRequired,
    userSignout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
  }

  render() {
    const { authUser, isAuthenticated, location, userSignout } = this.props;
    return (
      <div className="App">
        <Layout
          isAuthenticated={isAuthenticated}
          authUser={authUser}
          location={location}
          signout={userSignout}
        >
          {this.renderRoutes()}
        </Layout>
      </div>
    );
  }

  renderRoutes() {
    const { authUser, isAuthenticated, loaded, loading } = this.props;
    return (
      <Switch>
        <Route exact path="/concerts" component={ConcertsPage} />
        <PublicRoute
          path="/signin"
          component={SigninPage}
          authUser={authUser}
          loading={loading}
          loaded={loaded}
          isAuthenticated={isAuthenticated}
        />
        <PublicRoute
          path="/signup"
          component={SignupPage}
          authUser={authUser}
          loading={loading}
          loaded={loaded}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/plateform"
          component={Plateform}
          authUser={authUser}
          loading={loading}
          loaded={loaded}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    );
  }
}

export default App;
