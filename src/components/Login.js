import React from 'react';
import PropTypes from 'prop-types';
import * as auth from '../utils/auth.js';
import Header from './Header';
import Navbar from './Navbar';
import PopupWithForm from './PopupWithForm';
import InfoTooltip from './InfoTooltip';
import { MarkupForPopups } from './MarkupForPopups';

Login.propTypes = {
  isOpen: PropTypes.bool,
  toggleNavbar: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

function Login({ isOpen, toggleNavbar, onLogin, isNavbarOpen }) {
  let localEmail = localStorage.getItem('email');
  const [activeButton, setActiveButton] = React.useState(true);
  const [isLoadingButton, setIsLoadingButton] = React.useState(false);
  const [emailAndPassword, setEmailAndPassword] = React.useState({
    email: localEmail ? localEmail : '',
    password: '',
  });
  const [messageStatus, setMessageStatus] = React.useState({
    isOpenTool: false,
    status: false,
    message: '',
  });
  const [validCheck, setValidCheck] = React.useState({
    password: '',
    email: '',
  });
  const textButton = isLoadingButton ? 'Проверка...' : 'Войти';
  const checkPopup = {
    id: 5,
    name: 'check',
    title: 'Вход',
    buttonTitle: `${textButton}`,
    linkInfo: {
      link: '/sign-up',
      title: 'Регистрация',
      info: '',
    },
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

  function onClose() {
    setMessageStatus({
      ...messageStatus,
      isOpenTool: false,
      status: false,
    });
  }

  function infoMessage(text, boole) {
    setMessageStatus({
      ...messageStatus,
      isOpenTool: true,
      status: boole,
      message: text,
    });
  }

  function verifiesAuthorization(evt) {
    evt.preventDefault();
    if (!emailAndPassword.password || !emailAndPassword.email) {
      return;
    }
    setIsLoadingButton(true);
    auth
      .authorizationPost({
        ...emailAndPassword,
      })
      .then((data) => {
        if (data.token) {
          setIsLoadingButton(false);
          onLogin(data.token, evt);
        } else if (!data.token && data.message) {
          infoMessage(data.message, false);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  }
  return (
    <React.Fragment>
      <InfoTooltip isTooltip={messageStatus} onClose={onClose} />
      {isNavbarOpen && (
        <Navbar selectorPlace={'page'} linkInfo={checkPopup.linkInfo} />
      )}
      <Header linkInfo={checkPopup.linkInfo} toggleNavbar={toggleNavbar} />
      <div className='page__elements'>
        <PopupWithForm
          key={checkPopup.id}
          name={checkPopup.name}
          title={checkPopup.title}
          buttonTitle={checkPopup.buttonTitle}
          isOpen={isOpen}
          active={activeButton}
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

