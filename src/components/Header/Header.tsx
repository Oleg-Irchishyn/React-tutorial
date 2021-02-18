import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

export type MapStatePropsType = {
  isAuth: boolean;
  login: string | null;
};

export type MapDispatchPropsType = {
  logout: () => void;
};

const Header: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  return (
    <header className={s.header}>
      <img src="https://www.logogenie.net/download/preview/medium/3589659" />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {' '}
            {props.login} - <button onClick={props.logout}>Logout</button>{' '}
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
