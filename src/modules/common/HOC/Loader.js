import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Spin } from 'antd';

const Loader = (WrappedComponent) => {
  class WrapperComponent extends Component {
    static propTypes = {
      loading: PropTypes.bool,
    };

    render() {
      const { loading } = this.props;
      if (loading) {
        return (
          <Spin tip="Loading">
            <WrappedComponent {...this.props} />
          </Spin>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return WrapperComponent;
};

export default Loader;
