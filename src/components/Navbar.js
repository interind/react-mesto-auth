import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from 'classnames';

function Navbar({ linkInfo, handleLogOut, selectorPlace }) {
  const { link, email, info, title } = linkInfo;
  const selector = classes('navbar', {
    'navbar_place_header': selectorPlace === 'header',
    'navbar_place_form': selectorPlace === 'form',
    'navbar_place_page': selectorPlace === 'page',
  });
  const history = useHistory();
  function signOut(evt) {
    if (title === 'Выйти') {
      localStorage.removeItem('token');
      handleLogOut(evt);
      history.push('/sign-in');
    }
  }
  return (
    <nav className={selector}>
      {(email || info) && <p className='navbar__info'>{(email || info)}</p>}
      <Link className='navbar__link' to={link} onClick={signOut}>
        {title}
      </Link>
    </nav>
  );
}

export default Navbar;
