import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import { MarkupForPopups } from './MarkupForPopups';

Login.propTypes = {
  isOpen: PropTypes.bool,
  isLoadingButton: PropTypes.bool,
  onLogin: PropTypes.func.isRequired,
  signOut: PropTypes.func,
};

function Login({
  isOpen,
  onLogin,
  signOut,
  isLoadingButton,
}) {
  const localEmail = localStorage.getItem('email');
  const [activeButton, setActiveButton] = React.useState(true);
  const [emailAndPassword, setEmailAndPassword] = React.useState({
    email: localEmail ? localEmail : '',
    password: '',
  });
  const [validCheck, setValidCheck] = React.useState({
    password: '',
    email: '',
  });
  const textButton = isLoadingButton ? 'Проверка...' : 'Войти';
  const checkPopup = {
    name: 'check',
    title: 'Вход',
    buttonTitle: `${textButton}`,
  };

  function validationCheck(evt) {
    !evt.target.validity.valid
      ? setValidCheck({
          [evt.target.name]: evt.target.validationMessage,
        })
      : setValidCheck({
          [evt.target.name]: '',
        });
  }

  function setPasswordUser(evt) {
    setEmailAndPassword({
      ...emailAndPassword,
      password: evt.target.value,
    });
    setActiveButton(!evt.target.value);
  }

  function setEmailUser(evt) {
    setEmailAndPassword({ ...emailAndPassword, email: evt.target.value });
    setActiveButton(!evt.target.value);
  }

  function verifiesAuthorization(evt) {
    evt.preventDefault();
    if (!emailAndPassword.password || !emailAndPassword.email) {
      return;
    }
    onLogin(emailAndPassword, evt)
  }
  return (
    <React.Fragment>
      <div className='page__elements'>
        <PopupWithForm
          name={checkPopup.name}
          title={checkPopup.title}
          buttonTitle={checkPopup.buttonTitle}
          isOpen={isOpen}
          active={activeButton}
          signOut={signOut}
          onSubmit={verifiesAuthorization}>
          <MarkupForPopups.Check
            email={emailAndPassword.email}
            password={emailAndPassword.password}
            placeMessage={validCheck}
            editEmail={setEmailUser}
            editPassword={setPasswordUser}
            validationCheck={validationCheck}
          />
        </PopupWithForm>
      </div>
    </React.Fragment>
  );
}

export default Login;

