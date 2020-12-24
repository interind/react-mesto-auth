import React from 'react';
import { withRouter} from 'react-router-dom';
import Header from './Header';
import * as auth from '../utils/auth.js';
import PopupWithForm from './PopupWithForm';
import InfoTooltip from './InfoTooltip';
import { MarkupForPopups } from './MarkupForPopups';

function Login({ isLoadingButton, isOpen, handleLogin, onNavbar, offNavbar, onLogin, history }) {

  const textButton = isLoadingButton ? 'Сохранение...' : 'Войти';
  const checkPopup = {
    id: 5,
    name: 'check',
    title: 'Вход',
    buttonTitle: `${textButton}`,
    linkInfo: { link: '/sign-up', title: 'Регистрация', info: '' },
  };
  const localEmail = localStorage.getItem('email');
  const [emailAndPassword, setEmailAndPassword] = React.useState({
    email: localEmail ? localEmail : '',
    password: '',
  });
  let [activeButton, setActiveButton] = React.useState(true);
  const [messageStatus, setMessageStatus] = React.useState({
    isOpenMessage: false,
    status: false,
    message: '',
  });
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

  function setPasswordUser(evt) {
    setEmailAndPassword({ ...emailAndPassword, password: evt.target.value });
    setActiveButton(!evt.target.value);
  }

  function setEmailUser(evt) {
    setEmailAndPassword({ ...emailAndPassword, email: evt.target.value });
    setActiveButton(!evt.target.value);
  }

  function onClose() {
    setMessageStatus({
      ...messageStatus,
      isOpenMessage: false,
      status: false,
    });
  }

  function verifiesAuthorization(evt) {
    evt.preventDefault();
    if (!emailAndPassword.password || !emailAndPassword.email) {
      return;
    }
    auth
      .authorizationPost({
        ...emailAndPassword,
      })
      .then((data) => {
        console.log('login', data);
        if (data.token) {
          onLogin(data.token);
          localStorage.setItem('email', emailAndPassword.email);
          setEmailAndPassword({ email: '', password: '' });
          handleLogin(evt); // обновляем стейт внутри App.js
          history.push('/'); // и переадресуем пользователя!
        } else if (!data.token && data.message) {
          setMessageStatus({
            ...messageStatus,
            isOpenMessage: true,
            status: false,
            message: data.message,
          });
        }
      })
      .catch((err) => console.log(err)); // запускается, если пользователь не найден
  }
  return (
    <React.Fragment>
      {!messageStatus.status && <InfoTooltip isOpen={messageStatus} onClose={onClose} />}
      <Header
        linkInfo={checkPopup.linkInfo}
        onNavbar={onNavbar}
        offNavbar={offNavbar}
      />
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

export default withRouter(Login);
