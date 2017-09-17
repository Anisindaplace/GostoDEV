import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';

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
      info: 'Nom utilisateur: ',
      description: authUser.get('displayName'),
      isEditable: true,
    }, {
      key: 'type',
      info: 'Type: ',
      description: authUser.getIn(['musicien', 'type']),
    }, {
      key: 'scene',
      info: 'Nom de scène: ',
      description: authUser.getIn(['musicien', 'sceneName']),
    }, {
      key: 'website',
      info: 'Site internet: ',
      description: authUser.getIn(['musicien', 'website']),
      isEditable: false,
    }, {
      key: 'biography',
      info: 'Biographie: ',
      description: authUser.getIn(['musicien', 'biography']),
      isEditable: false,
    }, {
      key: 'userType',
      info: "Type d'utilisateur",
      description: authUser.get('isAdmin') ? "You're admin!" : authUser.get('musicien') ? 'Musicien' : 'Organisateur de concerts',
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
                      style={{ backgroundImage: `url(${authUser.get('image') || authUser.get('profileImageURL')})` }}
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
