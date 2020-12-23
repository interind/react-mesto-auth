import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar({ linkInfo, handleLogOut }) {
  const { link, email, info, title } = linkInfo;
  const history = useHistory();
  function signOut(evt) {
    if (title === 'Выйти') {
      localStorage.removeItem('token');
      handleLogOut(evt);
      history.push('/sign-in');
    }
  }
  return (
    <nav className='header__navbar'>
      {(email || info) && <p className='header__auth'>{(email || info)}</p>}
      <Link className='header__link' to={link} onClick={signOut}>
        {title}
      </Link>
    </nav>
  );
}

export default Navbar;