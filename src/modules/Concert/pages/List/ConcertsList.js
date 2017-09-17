import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import moment from 'moment';

import Breacrumb from '../../../common/components/Breadcrumb/Breadcrumb';
import ConcertItem from '../../components/ConcertItem';

import FetchConcerts from '../../hocs/FetchConcerts';

@FetchConcerts
class ConcertsPages extends Component {
  static propTypes = {
    concerts: PropTypes.array,
  };

  render() {
    const { concerts } = this.props;
    return (
      <div>
        <Breacrumb pageTitle="Concerts" />
        <div className="section before-after">
          <div className="container clearfix">
            <Row gutter={16}>
              {concerts.map(concert => (
                <Col className="gutter-row" md={8}>
                  <ConcertItem
                    title={concert.shortTitle}
                    subtitle={concert.shortTitle}
                    description={concert.description}
                    concertDate={moment(concert.concertDate).format('L')}
                    imageSrc={concert.images[0]}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default ConcertsPages;
