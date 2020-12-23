import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Header from './Header';
import * as auth from '../utils/auth.js';
import PopupWithForm from './PopupWithForm';
import { InfoTooltip } from './InfoTooltip';
import { MarkupForPopups } from './MarkupForPopups';

function Login({ isLoadingButton, isOpen, handleLogin }) {
  const history = useHistory();
  const textButton = isLoadingButton ? 'Сохранение...' : 'Войти';
  const checkPopup = {
    id: 5,
    name: 'check',
    title: 'Вход',
    buttonTitle: `${textButton}`,
    linkInfo: { link: '/sign-up', title: 'Регистрация', info: '' },
  };

  const [emailAndPassword, setEmailAndPassword] = React.useState({ email: '', password: '' });
  let [activeButton, setActiveButton] = React.useState(true);
  const [message, setMessage] = React.useState({
    isOpenMessage: false,
    status: false,
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
    setEmailAndPassword({...emailAndPassword, password: evt.target.value});
    setActiveButton(!evt.target.value);
  }

  function setEmailUser(evt) {
    setEmailAndPassword({ ...emailAndPassword, email: evt.target.value });
    setActiveButton(!evt.target.value);
  }

  function onClose() {
    setMessage({ ...message, isOpenMessage: false });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!emailAndPassword.password || !emailAndPassword.email) {
      return;
    }
    auth
      .authorizationPost({
        ...emailAndPassword,
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setEmailAndPassword({ email: '', password: '' });
          handleLogin(evt); // обновляем стейт внутри App.js
          history.push('/'); // и переадресуем пользователя!
        }
        else if(!data.token) {
          setMessage({
            ...message,
            isOpenMessage: true,
          });
        }
      })
      .catch((err) => console.log(err)); // запускается, если пользователь не найден
  }
  return (
    <React.Fragment>
      <InfoTooltip isOpen={message} onClose={onClose} />
      <Header linkInfo={checkPopup.linkInfo} />
      <div className='page__elements'>
        <PopupWithForm
          key={checkPopup.id}
          name={checkPopup.name}
          title={checkPopup.title}
          buttonTitle={checkPopup.buttonTitle}
          isOpen={isOpen}
          active={activeButton}
          onSubmit={handleSubmit}>
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
