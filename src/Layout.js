import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Button } from 'antd';
import './Layout.scss';

const { Header, Content, Footer } = Layout;

export const AppLayout = (props) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px', float: 'right' }}
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Performers</Menu.Item>
          <Menu.Item key="3">
            <Button type="primary">Sign up</Button>
            <Button type="secondary">Sign in</Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="container" style={{ padding: '0 50px' }}>
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        El Gosto ©2017
      </Footer>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default AppLayout;
