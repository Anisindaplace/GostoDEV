import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Breacrumb from '../common/components/Breadcrumb/Breadcrumb';
import EditableCell from '../common/components/Table/EditableCell';
import ConcertItem from '../Concert/components/ConcertItem';
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
    }];
  }

  getUserType() {
    const { authUser } = this.props;
    if (authUser.get('isAdmin')) {
      return 'admin';
    } else if (authUser.get('musicien')) {
      return 'musicien';
    } else if (authUser.get('organizer')) {
      return 'organizer';
    }
    return 'unkown user';
  }

  render() {
    const { authUser } = this.props;
    return (
      <div className="Plateform">
        <Breacrumb pageTitle="Plateform" />
        <div className="section before-after">
          <div className="container">
            <Row gutter={32}>
              <Col md={8}>
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
              <Col md={16}>
                {this.renderContentByType(this.getUserType())}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }

  renderContentByType(type) {
    const { authUser } = this.props;
    switch (type) {
      case 'organizer': {
        const concerts = authUser.getIn(['organizer', 'Concerts']);
        const concertsSize = concerts.size;
        return (
          <Card
            className="m-b-15"
            title="Vos
            concerts"
            extra={<Button type="primary"><Link to="/concerts/new">Créer un concert</Link></Button>}
          >
            {
              concertsSize === 0
                ? (
                  <div className="">
                    Vous n'avez toujours pas créer votre premier concert, <Link to="/concerts/new">Cliquer ici pour en créer</Link>
                  </div>
                )
                : (
                  <Row gutter={16}>
                    {concerts.map(concert => (
                      <Col span={12}>
                        <ConcertItem
                          title={concert.get('shortTitle')}
                          description={concert.get('description')}
                          imageSrc={concert.getIn(['images', '0'])}
                          concertDate={moment(concert.get('concertDate')).format('L')}
                        />
                      </Col>
                    ))}
                  </Row>
                )
            }
          </Card>
        );
      }
      default: return <div />;
    }
  }
}

export default Plateform;
