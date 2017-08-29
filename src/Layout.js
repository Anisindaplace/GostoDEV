import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Button } from 'antd';
import './Layout.css';

const { Header, Content } = Layout;

export const AppLayout = (props) => {
  return (
    <Layout className="layout">
      <Header className="bg-white">
        <div className="logo" />
        <Menu
          theme="white"
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
