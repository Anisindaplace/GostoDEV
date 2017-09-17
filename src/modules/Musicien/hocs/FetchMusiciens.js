import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMusiciens } from '../redux/reducer';

const mapStateToProps = (state, ownProps) => {
  return {
    musiciens: state.musiciens.get('entities').valueSeq().toJS(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchMusiciensData: () => dispatch(fetchMusiciens()),
  };
};

const FetchMusiciens = (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class WrapperComponent extends Component {
    static propTypes = {
      fetchMusiciensData: PropTypes.func.isRequired,
    }

    componentWillMount() {
      const { fetchMusiciensData } = this.props;
      fetchMusiciensData();
    }
    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  return WrapperComponent;
};

export default FetchMusiciens;
