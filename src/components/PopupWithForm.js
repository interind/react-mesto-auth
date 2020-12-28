import React from 'react';
import classes from 'classnames';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

PopupWithForm.propTypes = {
  active: PropTypes.bool,
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.object,
  buttonTitle: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  userAuthInfo: PropTypes.object,
  signOut: PropTypes.func,
};

PopupWithForm.defaultProps = {
  active: false,
  isOpen: false,
  children: null,
  onClose: undefined,
};

function PopupWithForm({
  active,
  name,
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
  buttonTitle,
  userAuthInfo,
  signOut,
}) {
  const disabledButton = active ? 'disabled' : '';
  const popup = classes(`popup popup_type_${name}`, { popup_opened: isOpen });
  const classTitle = classes('popup__title', {
    popup__title_type_check: name === 'check',
  });
  const classButtonSubmit = classes('popup__button-submit', {
    'popup__button-submit_type_check': name === 'check',
    'popup__button-submit_disabled': active && (name !== 'check'),
  });

  return (
    <React.Fragment>
      <div
        className={popup}
        onMouseDown={(evt) => evt.currentTarget === evt.target && onClose()}>
        <form
          className={`popup__container popup__container_type_${name}`}
          name={name}
          onSubmit={onSubmit}>
          <h2 className={classTitle}>{title}</h2>
          {children}
          <button
            className={classButtonSubmit}
            type='submit'
            title={buttonTitle}
            disabled={disabledButton}>
            {buttonTitle}
          </button>
          {userAuthInfo && (
            <Navbar
              info={userAuthInfo.info}
              link={userAuthInfo.link}
              signOut={signOut}
              selectorPlace={'form'}
            />
          )}
          {onClose && (
            <button
              className='popup__button-close'
              type='button'
              title='закрыть'
              onClick={onClose}></button>
          )}
        </form>
      </div>
    </React.Fragment>
  );
}

export default PopupWithForm;
