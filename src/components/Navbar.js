import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from 'classnames';
import PropTypes from 'prop-types';

Navbar.propTypes = {
  info: PropTypes.string,
  link: PropTypes.string,
  email: PropTypes.string,
  signOut: PropTypes.func,
  selectorPlace: PropTypes.string,
};

Navbar.defaultProps = {
  selectorPlace: '',
  info: '',
  link: '',
  email: '',
};

function Navbar({ email, info, link, signOut, selectorPlace }) {
  const history = useHistory();

  const title = classes({
    'Вход': history.location.pathname === '/sign-up',
    'Регистрация': history.location.pathname === '/sign-in',
    'Выйти': history.location.pathname === '/',
  });
  const selector = classes('navbar', {
    navbar_place_header: selectorPlace === 'header',
    navbar_place_form: selectorPlace === 'form',
    navbar_place_page: selectorPlace === 'page',
  });

  return (
    <nav className={selector}>
      {email && <p className='navbar__info'>{email}</p>}
      {selectorPlace === 'form' && <p className='navbar__info'>{info}</p>}
      <Link
        className='navbar__link'
        to={link}
        onClick={(evt) => signOut(evt)}>
        {title}
      </Link>
    </nav>
  );
}

export default Navbar;
