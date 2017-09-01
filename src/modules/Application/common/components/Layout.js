import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Button } from 'antd';

import logo from '../assets/el-gosto.png';
import './Layout.css';

const { Header, Content } = Layout;

export const AppLayout = (props) => {
  return (
    <Layout className="layout bg-white">
      <div className="container">
        <Header className="bg-white">
          <div className="logo">
            <img src={logo} alt="El gosto" />
          </div>
          <Menu
            theme="white"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px', float: 'right' }}
          >
            <Menu.Item key="1">Accueil</Menu.Item>
            <Menu.Item key="3">Concerts</Menu.Item>
            <Menu.Item key="2">Musiciens</Menu.Item>
            <Menu.Item key="4">
              <Button type="primary">S'inscrire</Button>
              <Button type="secondary">Se connecter</Button>
            </Menu.Item>
          </Menu>
        </Header>
      </div>
      <Content>
        {props.children}
      </Content>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.oneOf([PropTypes.array, PropTypes.object]).isRequired,
};

export default AppLayout;
