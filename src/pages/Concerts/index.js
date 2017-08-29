import React, { Component } from 'react';
import { Row, Col } from 'antd';

import bg from './bg.jpg';
import concert1 from './concert1.jpg';
import Breacrumb from '../../components/Breadcrumb/Breadcrumb';
import ConcertItem from './components/ConcertItem';

class ConcertsPages extends Component {
  render() {
    return (
      <div>
        <Breacrumb pageTitle="Concerts" imageSrc={bg} />
        <div className="section before-after">
          <div className="container clearfix">
            <Row gutter={16}>
              <Col className="gutter-row" md={8}>
                <ConcertItem title="Test" subtitle="Hello world" imageSrc={concert1} />
              </Col>
              <Col className="gutter-row" md={8}>
                <ConcertItem title="Test" subtitle="Hello world" imageSrc={concert1} />
              </Col>
              <Col className="gutter-row" md={8}>
                <ConcertItem title="Test" subtitle="Hello world" imageSrc={concert1} />
              </Col>
              <Col className="gutter-row" md={8}>
                <ConcertItem title="Test" subtitle="Hello world" imageSrc={concert1} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default ConcertsPages;
