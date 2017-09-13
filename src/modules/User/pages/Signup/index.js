import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Link } from 'react-router-dom';
import { Row, Col, Button, Icon } from 'antd';

import { signin } from '../../redux/authReducer';

import SignupMusicienPage from './pages/SignupMusicien';
import SignupOrganizerPage from './pages/SignupOrganizer';

import Breacrumb from '../../../common/components/Breadcrumb/Breadcrumb';
import Route from '../../../common/components/Routes/Route';
import bg from '../../../common/assets/bg.jpg';
import './style.scss';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signin: data => dispatch(signin(data)),
  };
};

@connect(null, mapDispatchToProps)
class SignupPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props;
    return (
      <div className="Signup">
        <Breacrumb pageTitle="Sign up" imageSrc={bg} />
        <div className="section before-after">
          <div className="container">
            {match.isExact ? this.renderContent() : this.renderRoutes()}
          </div>
        </div>
      </div>
    );
  }

  renderContent() {
    return (
      <Row gutter={48} type="flex" justify="center">
        <Col sm={20} md={10}>
          <div className="UserType">
            <h2 className="UserType__Header">Organisateur de concerts</h2>
            <div className="UserType__Description">Commencez par créer votre profil d'Organisateur et publier des annonces</div>
            <Button
              className="UserType__Button"
              type="primary"
              size="large"
            >
              <Link to="/signup/organizer">Continuer <Icon type="right" /></Link>
            </Button>
          </div>
        </Col>
        <Col sm={20} md={10}>
          <div className="UserType">
            <h2 className="UserType__Header">Musicien</h2>
            <div className="UserType__Description">Commencez par créer votre profil de Musicien pour postuler aux différentes annonces créées</div>
            <Button
              className="UserType__Button"
              type="primary"
              size="large"
            >
              <Link to="/signup/musicien">Continuer <Icon type="right" /></Link>
            </Button>
          </div>
        </Col>
      </Row>
    );
  }

  renderRoutes() {
    return (
      <Switch>
        <Route path="/signup/musicien" component={SignupMusicienPage} />
        <Route path="/signup/organizer" component={SignupOrganizerPage} />
      </Switch>
    );
  }
}

export default SignupPage;

