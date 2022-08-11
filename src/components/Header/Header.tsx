import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Header } from 'antd/lib/layout/layout';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Menu, MenuProps, Button } from 'antd';

export type MapStatePropsType = {
  isAuth: boolean;
  login: string | null;
};

export type MapDispatchPropsType = {
  logout: () => void;
};

const PageHeader: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const items1: MenuProps['items'] = ['Developers'].map((key) => ({
    key,
    label: <NavLink to="/developers">{key}</NavLink>,
  }));

  return (
    <Header className="header">
      <div className="logo" />
      <Row>
        <Col span={20}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['developers']}
            items={items1}
          />
        </Col>
        <Col span={4}>
          {props.isAuth ? (
            <div>
              <Avatar icon={<UserOutlined />} />
              <span className={s.text}>{props.login} </span>
              <Button onClick={props.logout}>Logout</Button>
            </div>
          ) : (
            <Button>
              <NavLink to={'/login'}> Login </NavLink>
            </Button>
          )}
        </Col>
      </Row>
    </Header>
  );
};

export default PageHeader;
