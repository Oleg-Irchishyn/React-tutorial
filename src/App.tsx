import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import { LoginPage } from './components/LoginPage/LoginPage';
import PreloaderImg from './components/common/Preloader/PreloaderImg';
import './App.css';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import { withSuspense } from './hoc/WithSuspense';
import { appStateType } from './redux/redux-store';
import { UsersPage } from './components/Users/UsersPage';
import { MessageOutlined, ProfileOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Content, Footer, Sider } = Layout;

const items2 = [
  {
    label: 'My Profile',
    key: 'submenu-profile',
    children: [
      {
        label: <NavLink to="/profile">Profile</NavLink>,
        key: 'submenu-profile-item-1',
        icon: <ProfileOutlined />,
      },
      {
        label: <NavLink to="/dialogs">Messages</NavLink>,
        key: 'submenu-profile-item-2',
        icon: <MessageOutlined />,
      },
    ],
  },
  {
    label: 'Developers',
    key: 'submenu-developers',
    children: [
      {
        label: <NavLink to="/developers">Developers</NavLink>,
        key: 'submenu-developers-item-1',
        icon: <UserOutlined />,
      },
    ],
  },
  {
    label: <NavLink to="/chat">Chat</NavLink>,
    key: 'submenu-chat',
    icon: <WechatOutlined />,
  },
  {
    label: 'News',
    key: 'submenu-news',
    disabled: true,
  },
  {
    label: 'Music',
    key: 'submenu-music',
    disabled: true,
  },
  {
    label: 'Settings',
    key: 'submenu-settings',
    disabled: true,
  },
];

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));
const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedChatPage = withSuspense(ChatPage);

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

class App extends React.Component<MapStatePropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: Event | PromiseRejectionEvent) => {
    alert('Some Error occured');
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandlerejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandlerejection', this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <PreloaderImg />;
    }
    return (
      <Layout>
        <HeaderContainer />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['']}
                defaultOpenKeys={['submenu-profile']}
                style={{ height: '100%' }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/profile" />} />
                <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
                <Route path="/developers" render={() => <UsersPage pageTitle={'Developers'} />} />
                <Route path="/login" render={() => <LoginPage />} />
                <Route path="/chat" render={() => <SuspendedChatPage />} />
                <Route path="*" render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Samurai Social Network</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: appStateType) => ({
  initialized: state.app.initialized,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp }),
  withRouter,
)(App);
