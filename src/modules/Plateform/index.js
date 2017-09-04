import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Table } from 'antd';

import Breacrumb from '../common/components/Breadcrumb/Breadcrumb';
import EditableCell from '../common/components/Table/EditableCell';
import './style.scss';

const dataSource = [{
  key: '1',
  info: 'About Me: ',
  description: 'Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56',
}, {
  key: '2',
  info: 'Birthday: ',
  description: 'December 14th, 1980',
}, {
  key: '3',
  info: 'Birthplace: ',
  description: 'Austin, Texas, USA',
}, {
  key: '4',
  info: 'Lives in: ',
  description: 'San Francisco, California, USA',
}];

class Plateform extends Component {
  static propTypes = {
    authUser: PropTypes.object.isRequired,
  }

  onCellChange(...args) {
    console.log(...args);
  }

  getColumns() {
    return [{
      key: 'info',
      dataIndex: 'info',
      title: 'Information',
    }, {
      key: 'description',
      dataIndex: 'description',
      title: 'Description',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, record, 'courseName')}
        />
      ),
    }];
  }

  render() {
    const { authUser } = this.props;
    return (
      <div className="Plateform">
        <Breacrumb pageTitle="Plateform" />
        <div className="section before-after">
          <div className="container">
            <Row gutter={32}>
              <Col md={12}>
                <Card title="Information personnelle">
                  <div className="UserImage">
                    <div
                      className="image-upload-container"
                      style={{ backgroundImage: `url(${authUser.get('profileImageURL')})` }}
                    />
                  </div>
                  <Table dataSource={dataSource} columns={this.getColumns()} showHeader={false} pagination={false} />
                </Card>
              </Col>
              <Col md={12}>
                <Card title="Hello">
                  hello
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Plateform;
