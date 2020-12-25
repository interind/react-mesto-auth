import React from 'react';
import PropTypes from 'prop-types';
import * as auth from '../utils/auth.js';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import PopupWithForm from './PopupWithForm';
import { MarkupForPopups } from './MarkupForPopups';
import Navbar from './Navbar';

Register.propTypes = {
  isOpen: PropTypes.bool,
  toggleNavbar: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

Register.defaultProps = {
  isOpen: false,
};

function Register({ isOpen, toggleNavbar, onRegister, isNavbarOpen }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoadingButton, setIsLoadingButton] = React.useState(false);
  const [messageStatus, setMessageStatus] = React.useState({
    isOpenTool: false,
    status: false,
    message: '',
  });
  const [activeButton, setActiveButton] = React.useState(true);
  const [validCheck, setValidCheck] = React.useState({
    password: '',
    email: '',
  });
  const textButton = isLoadingButton ? 'Проверка...' : 'Регистрация';
  const checkPopup = {
    id: 6,
    name: 'check',
    title: 'Регистрация',
    buttonTitle: `${textButton}`,
    linkInfo: {
      link: '/sign-in',
      title: 'Вход',
      info: 'Вы уже зарегистрировались?',
    },
  };
  const regNavbar = {
    link: checkPopup.linkInfo.link,
    title: checkPopup.linkInfo.title,
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

  function setPasswordUser(evt) {
    setPassword(evt.target.value);
    setActiveButton(!evt.target.value);
  }

  function setEmailUser(evt) {
    setEmail(evt.target.value);
    setActiveButton(!evt.target.value);
  }

  function clearInput() {
    setPassword('');
    setEmail('');
  }

  function verifiesRegistration(evt) {
    evt.preventDefault();

    clearInput();
    setIsLoadingButton(true);

    auth
      .register(password, email)
      .then((res) => {
        if (res.data) {
          setIsLoadingButton(false);
          onRegister(res);
          localStorage.setItem('email', email);
          infoMessage(res.data, true);
        } else if (res.error) {
          infoMessage(res.error, false);
        } else if (res.message) {
          infoMessage(res.message, false);
        } else {
          console.error('другая ошибка: res');
        }
      })
      .catch((err) => {
        infoMessage('', false);
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
      <Header linkInfo={regNavbar} toggleNavbar={toggleNavbar} />
      <div className='page__elements'>
        <PopupWithForm
          isOpen={isOpen}
          active={activeButton}
          key={checkPopup.id}
          name={checkPopup.name}
          title={checkPopup.title}
          buttonTitle={checkPopup.buttonTitle}
          linkInfo={checkPopup.linkInfo}
          onSubmit={verifiesRegistration}>
          <MarkupForPopups.Check
            email={email}
            password={password}
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

export default Register;
