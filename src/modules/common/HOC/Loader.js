import PropTypes from 'prop-types';
import React, { Component } from 'react';

import MainLoader from '../components/MainLoader';

const Loader = (WrappedComponent) => {
  class WrapperComponent extends Component {
    static propTypes = {
      loading: PropTypes.bool,
    };

    render() {
      const { loading } = this.props;
      if (loading) return <MainLoader />;
      return <WrappedComponent {...this.props} />;
    }
  }

  return WrapperComponent;
};

export default Loader;
