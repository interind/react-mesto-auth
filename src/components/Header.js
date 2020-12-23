import React from 'react';
import headerLogo from '../images/header/logoFon.svg';
import Navbar from './Navbar';

function Header({ linkInfo, handleLogOut }) {
  return (
    <header className='header page__header'>
      <img className='logo logo_place_header' src={headerLogo} alt='Логотип' />
      {linkInfo && <Navbar linkInfo={linkInfo} handleLogOut={handleLogOut} />}
    </header>
  );
}

export default Header;
