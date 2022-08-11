import React from 'react';
import PageHeader, { MapStatePropsType, MapDispatchPropsType } from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';
import { appStateType } from '../../redux/redux-store';

type PropsType = MapStatePropsType & MapDispatchPropsType;

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <PageHeader {...this.props} />;
  }
}
const mapStateToProps = (state: appStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});
export default connect<MapStatePropsType, MapDispatchPropsType, {}, appStateType>(mapStateToProps, {
  logout,
})(HeaderContainer);
