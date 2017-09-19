import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import moment from 'moment';

import ConcertItem from './ConcertItem';

export default class ConcertList extends Component {
  static propTypes = {
    concerts: PropTypes.array,
    size: PropTypes.number,
    isMusicien: PropTypes.bool,
    sendInterest: PropTypes.func.isRequired,
    authUser: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.renderConcert = this.renderConcert.bind(this);
  }
  render() {
    const { concerts, size } = this.props;
    return (
      <div className="ConcertList">
        <Row gutter={16}>
          {concerts.slice(0, size || concerts.length).map(this.renderConcert)}
        </Row>
      </div>
    );
  }

  renderConcert(concert) {
    const { sendInterest, isMusicien, authUser } = this.props;
    const musicien = authUser && authUser.get('musicien');
    const isInterestedIn = !musicien ? false : musicien.get('interestedIn').find(interest => interest.get('concertId') === concert.concertId);
    return (
      <Col className="gutter-row" md={8} key={concert.concertId}>
        <ConcertItem
          isInterestedIn={isInterestedIn}
          isInterested={concert.isInterested}
          title={concert.shortTitle}
          subTitle={concert.shortTitle}
          description={concert.description}
          time={moment(concert.time).format('LT')}
          duration={concert.duration}
          musicalStyles={concert.musicalStyles}
          artisteCategories={concert.artisteCategories}
          concertDate={moment(concert.concertDate).format('L')}
          imageSrc={concert.images[0]}
          isMusicien={isMusicien}
          sendInterest={() => sendInterest(concert.concertId)}
        />
      </Col>
    );
  }
}
