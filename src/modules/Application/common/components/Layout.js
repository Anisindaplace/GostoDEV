import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Icon } from 'antd';

import logo from '../assets/el-gosto.png';
import './Layout.scss';

const { Header, Content } = Layout;

class AppLayout extends Component {
  static propTypes = {
    authUser: PropTypes.object,
    location: PropTypes.object.isRequired,
    signout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  mapRouteToKey = {
    '/': '1',
    '/concerts': '2',
    '/musiciens': '3',
  }

  render() {
    const { isAuthenticated, children, location } = this.props;
    return (
      <Layout className="layout bg-white">
        <div className="container">
          <Header className="bg-white">
            <div className="logo">
              <img src={logo} alt="El gosto" />
            </div>
            <div className="pull-right">
              {!isAuthenticated && this.renderMeta()}
            </div>
            <Menu
              theme="white"
              mode="horizontal"
              className="pull-right"
              defaultSelectedKeys={[this.mapRouteToKey[location.pathname]]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/">Accueil</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/concerts">Concerts</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/musiciens">Musiciens</Link></Menu.Item>
              {isAuthenticated && this.renderUserInfo()}
            </Menu>
          </Header>
        </div>
        <Content>
          {children}
        </Content>
      </Layout>
    );
  }

  renderMeta() {
    return [
      <Button type="primary" key="signup"><Link to="/signup">S'inscrire</Link></Button>,
      <Button type="secondary" key="signin"><Link to="/signin">Se connecter</Link></Button>,
    ];
  }

  renderUserInfo() {
    const { authUser, signout } = this.props;
    return (
      <Menu.SubMenu
        title={
          <div className="UserAvatar">
            <Avatar src={authUser.get('profileImageURL')} />
            <span className="UserAvatar__Name">{authUser.get('displayName')}</span>
          </div>
        }
      >
        <Menu.Item><Icon type="edit" /> Profil</Menu.Item>
        <Menu.Item>
          <div onClick={signout}>
            <Icon type="logout" /> Se déconnecter
          </div>
        </Menu.Item>
      </Menu.SubMenu>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default AppLayout;
