import React from 'react';
import { Link } from 'react-router-dom';
import classes from 'classnames';
import PropTypes from 'prop-types';

Navbar.propTypes = {
  link: PropTypes.string,
  email: PropTypes.string,
  info: PropTypes.string,
  title: PropTypes.string,
  signOut: PropTypes.func.isRequired,
  selectorPlace: PropTypes.string,
};

Navbar.defaultProps = {
  link: '/sign-up',
  email: '',
  info: '',
  title: 'Регистрация',
};

function Navbar({ link, email, info, title }, {signOut, selectorPlace }) {
  // const { link, email, info, title } = linkInfo;
  const selector = classes('navbar', {
    navbar_place_header: selectorPlace === 'header',
    navbar_place_form: selectorPlace === 'form',
    navbar_place_page: selectorPlace === 'page',
  });

  return (
    <nav className={selector}>
      {(email || info) && <p className='navbar__info'>{email || info}</p>}
      <Link className="navbar__link" to={link} onClick={signOut}>
        {title}
      </Link>
    </nav>
  );
}

export default Navbar;
