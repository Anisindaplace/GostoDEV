import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Table } from 'antd';

import Breacrumb from '../common/components/Breadcrumb/Breadcrumb';
import EditableCell from '../common/components/Table/EditableCell';
import './style.scss';

class Plateform extends Component {
  static propTypes = {
    authUser: PropTypes.object.isRequired,
  }

  getDataSource() {
    const { authUser } = this.props;
    return [{
      key: 'name',
      info: 'Full Name: ',
      description: authUser.get('displayName'),
      isEditable: true,
    }, {
      key: 'description',
      info: 'About Me: ',
      description: 'Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56',
      isEditable: true,
    }, {
      key: 'birthday',
      info: 'Birthday: ',
      description: 'December 14th, 1980',
      isEditable: true,
    }, {
      key: 'email',
      info: 'Email: ',
      description: authUser.get('email'),
      isEditable: false,
    }, {
      key: 'userType',
      info: 'User type: ',
      description: authUser.get('isAdmin') ? "You're admin!" : authUser.get('type'),
      isEditable: false,
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
                <Card title="Information personnelle" className="m-b-15">
                  <div className="UserImage">
                    <div
                      className="image-upload-container"
                      style={{ backgroundImage: `url(${authUser.get('profileImageURL')})` }}
                    />
                  </div>
                  <ul className="PersonalInfo">
                    {this.getDataSource().map((source) => {
                      return (
                        <li>
                          <span className="title">{source.info}</span>
                          <span className="text">
                            {!source.isEditable
                              ? source.description
                              : <EditableCell
                                value={source.description}
                                onChange={() => {}}
                              />
                            }
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              </Col>
              <Col md={12}>
                <Card className="m-b-15" title="Vos contributions">
                  Retrouvez ici les concerts auxquels vous avez contribué
                </Card>
                <Card title="Vos souhaits">
                  Retrouvez ici les concerts auxquels vous êtes interessé
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
