import React, { Component } from 'react';
import { Row, Col } from 'antd';

import bg from './bg.jpg';
import concert1 from './concert1.jpg';
import concert2 from './concert2.jpg';
import concert3 from './concert3.jpg';
import concert4 from './concert4.jpg';
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
                <ConcertItem title="Tales au Wall street Pigalle" subtitle="Wall street" imageSrc={concert1} />
              </Col>
              <Col className="gutter-row" md={8}>
                <ConcertItem title="Test" subtitle="Hello world" imageSrc={concert2} />
              </Col>
              <Col className="gutter-row" md={8}>
                <ConcertItem title="Test" subtitle="Hello world" imageSrc={concert3} />
              </Col>
              <Col className="gutter-row" md={8}>
                <ConcertItem title="Test" subtitle="Hello world" imageSrc={concert4} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default ConcertsPages;
