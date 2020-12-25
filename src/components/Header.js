import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import headerLogo from '../images/header/logoFon.svg';

Header.propTypes = {
  linkInfo: PropTypes.object,
  signOut: PropTypes.func,
  selector: PropTypes.string,
  toggleNavbar: PropTypes.func.isRequired,
};

Header.defaultProps = {
  selector: 'header',
};

function Header({ linkInfo, signOut, toggleNavbar, selector }) {
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
      {linkInfo && (
        <Navbar
          linkInfo={linkInfo}
          selectorPlace={selector}
          signOut={signOut}
        />
      )}
    </header>
  );
}

export default Header;
