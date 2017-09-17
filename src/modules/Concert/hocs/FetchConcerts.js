import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchConcerts } from '../redux/reducer';

const mapStateToProps = (state, ownProps) => {
  return {
    concerts: state.concerts.get('entities').valueSeq().toJS(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchConcertsData: () => dispatch(fetchConcerts()),
  };
};

const FetchConcerts = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class WrapperComponent extends Component {
    static propTypes = {
      fetchConcertsData: PropTypes.func.isRequired,
    }

    componentWillMount() {
      const { fetchConcertsData } = this.props;
      fetchConcertsData();
    }
    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  return WrapperComponent;
};

export default FetchConcerts;
