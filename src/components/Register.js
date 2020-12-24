import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Header from './Header';
import PopupWithForm from './PopupWithForm';
import { MarkupForPopups } from './MarkupForPopups';
import * as auth from '../utils/auth.js';
import { InfoTooltip } from './InfoTooltip';

function Register({ isLoadingButton, isOpen }) {
  const history = useHistory();
  const textButton = isLoadingButton ? 'Сохранение...' : 'Регистрация';
  const checkPopup = {
    id: 6,
    name: 'check',
    title: 'Регистрация',
    buttonTitle: `${textButton}`,
    linkInfo: { link: '/sign-in', title: 'Вход', info: 'Вы уже зарегистрировались?' },
  };
  const regNavbar = {
    link: checkPopup.linkInfo.link,
    title: checkPopup.linkInfo.title,
  };

  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState({isOpenMessage: false, status: false});
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
    setMessage({ ...message, isOpenMessage: false});
  }

  function setPasswordUser(evt) {
    setPassword(evt.target.value);
    setActiveButton(!evt.target.value);
  }
  function setEmailUser(evt) {
    setEmail(evt.target.value);
    setActiveButton(!evt.target.value);
  }
  function onRegister(evt) {
    evt.preventDefault();
    setPassword('');
    setEmail('');
    auth
      .register(password, email)
      .then((res) => {
        console.log('reg', res);
        if (res.data) {
          localStorage.setItem('email', res.data.email);
          setMessage({
            ...message,
            isOpenMessage: true,
            status: true,
          });
          history.push('/sign-in');
        } else {
          setMessage({
            ...message,
            isOpenMessage: true,
            status: false,
          });
        }
      })
      .catch((err) => {
        setMessage({
          ...message,
          isOpenMessage: true,
          status: false,
        });
        console.log(err.message)
      });
  }
  return (
    <React.Fragment>
      <InfoTooltip isOpen={message} onClose={onClose} />
      <Header linkInfo={regNavbar} />
      <div className='page__elements'>
        <PopupWithForm
          isOpen={isOpen}
          active={activeButton}
          key={checkPopup.id}
          name={checkPopup.name}
          title={checkPopup.title}
          buttonTitle={checkPopup.buttonTitle}
          linkInfo={checkPopup.linkInfo}
          onSubmit={onRegister}>
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

export default withRouter(Register);
