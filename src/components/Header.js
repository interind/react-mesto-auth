import React from 'react';
import headerLogo from '../images/header/logoFon.svg';
import Navbar from './Navbar';

function Header({ linkInfo, handleLogOut, onNavbar, offNavbar }) {
  const checked = (event) => event.target.checked ? onNavbar() : offNavbar();

  return (
    <header className='header page__header'>
      <img className='logo logo_place_header' src={headerLogo} alt='Логотип' />
      <label>
        <input
          type='checkbox'
          className='header__button-menu'
          onChange={checked}></input>
        <span id='span' className='header__button-menu'></span>
      </label>
      {linkInfo && (
        <Navbar
          linkInfo={linkInfo}
          selectorPlace={'header'}
          handleLogOut={handleLogOut}
        />
      )}
    </header>
  );
}

export default Header;
