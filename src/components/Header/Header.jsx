import React, { Component } from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <header className={s.header}>
      <img src="https://www.logogenie.net/download/preview/medium/3589659" />
      <div className={s.loginBlock}>
        <NavLink to={'/login'}>Login</NavLink>
      </div>
    </header>
  )

}

export default Header;
