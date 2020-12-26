import React from 'react';
import PropTypes from 'prop-types';
import headerLogo from '../images/header/logoFon.svg';
import Navbar from './Navbar';

Header.propTypes = {
  toggleNavbar: PropTypes.func.isRequired,
};

function Header({
  toggleNavbar,
  signOut,
  email,
  link,
  selectorPlace,
  isNavbarOpen,
}) {
  return (
    <header className='header page__header'>
      <img className='logo logo_place_header' src={headerLogo} alt='Логотип' />
      <label>
        <input
          type='checkbox'
          className='header__button-menu'
          onChange={toggleNavbar}></input>
        <span id='span' className='header__button-menu'></span>
      </label>
      {!isNavbarOpen && (<Navbar
        selectorPlace={selectorPlace}
        email={email}
        link={link}
        signOut={signOut}
      />)}
    </header>
  );
}

export default Header;
