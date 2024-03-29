import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { appStateType } from '../redux/redux-store';

let mapStateToPropsForRedirect = (state: appStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapStatePropsType = {
  isAuth: boolean;
};

type MapDispatchPropsType = {};

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    let { isAuth, ...restProps } = props;
    if (!props.isAuth) {
      return <Redirect to={'/login'} />;
    }
    return <WrappedComponent {...(restProps as WCP)} />;
  };

  let ConnectedAuthRedirectComponent = connect<
    MapStatePropsType,
    MapDispatchPropsType,
    WCP,
    appStateType
  >(
    mapStateToPropsForRedirect,
    {},
  )(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}
