import React, { Suspense } from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import PreloaderImg from './components/common/Preloader/PreloaderImg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import { withSuspense } from './hoc/WithSuspense';
import { appStateType } from './redux/redux-store';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (event: any) => {
    alert("Some Error occured");
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandlerejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandlerejection", this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <PreloaderImg />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/profile" />} />
            <Route path="/dialogs" render={() => <SuspendedDialogs />} />
            <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
            <Route path="/users" render={() => <UsersContainer pageTitle={"Users"} />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: appStateType) => ({
  initialized: state.app.initialized
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp }),
  withRouter)
  (App);
