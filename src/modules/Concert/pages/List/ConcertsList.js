import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import Breacrumb from '../../../common/components/Breadcrumb/Breadcrumb';
import ConcertsList from '../../components/ConcertsList';

import FetchConcerts from '../../hocs/FetchConcerts';

@FetchConcerts
class ConcertsListPage extends Component {
  static propTypes = {
    concerts: PropTypes.array,
    authUser: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    sendInterest: PropTypes.func.isRequired,
  };

  render() {
    const { concerts, isAuthenticated, authUser, sendInterest } = this.props;
    return (
      <div>
        <Breacrumb pageTitle="Concerts" />
        <div className="section before-after">
          <div className="container clearfix">
            <Row gutter={16}>
              <ConcertsList
                concerts={concerts}
                isMusicien={isAuthenticated && authUser.get('musicien')}
                authUser={authUser}
                sendInterest={sendInterest}
              />
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default ConcertsListPage;
