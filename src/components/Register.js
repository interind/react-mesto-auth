import React from 'react';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import PopupWithForm from './PopupWithForm';
import { MarkupForPopups } from './MarkupForPopups';
import * as auth from '../utils/auth.js';

function Register({
  isLoadingButton,
  isOpen,
  onNavbar,
  offNavbar,
  onRegister,
}) {
  const textButton = isLoadingButton ? 'Сохранение...' : 'Регистрация';
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

  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [messageStatus, setMessageStatus] = React.useState({
    isOpenTool: false,
    status: false,
    message: '',
  });
  let [activeButton, setActiveButton] = React.useState(true);

  const [validCheck, setValidCheck] = React.useState({
    password: '',
    email: '',
  });

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
  function verifiesRegistration(evt) {
    evt.preventDefault();
    setPassword('');
    setEmail('');
    auth
      .register(password, email)
      .then((res) => {
        if (res.data) {
          onRegister(res);
          infoMessage(res.data, true);
        } else if (res.error) {
          infoMessage(res.error, false);
        } else if (res.message) {
          infoMessage(res.message, false);
        }
      })
      .catch((err) => {
        infoMessage('', false);
        console.log(err);
      });
  }
  return (
    <React.Fragment>
      <InfoTooltip isTooltip={messageStatus} onClose={onClose} />
      <Header linkInfo={regNavbar} onNavbar={onNavbar} offNavbar={offNavbar} />
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
