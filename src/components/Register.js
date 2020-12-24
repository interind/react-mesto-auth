import React from 'react';
import { withRouter} from 'react-router-dom';
import Header from './Header';
import PopupWithForm from './PopupWithForm';
import { MarkupForPopups } from './MarkupForPopups';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';

function Register({ isLoadingButton, isOpen, onNavbar, offNavbar, history }) {

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
    isOpenMessage: false,
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
      isOpenMessage: false,
      status: false,
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
        console.log('reg', res);
        if (res.data) {
          localStorage.setItem('email', res.data.email);
          setMessageStatus({
            ...messageStatus,
            isOpenMessage: true,
            status: true,
            message: res.data,
          });
          history.push('/sign-in');
        } else if (res.error) {
          setMessageStatus({
            ...messageStatus,
            isOpenMessage: true,
            status: false,
            message: res.error,
          });
        } else if (res.message) {
          setMessageStatus({
            ...messageStatus,
            isOpenMessage: true,
            status: false,
            message: res.message,
          });
        }
      })
      .catch((err) => {
        setMessageStatus({
          ...messageStatus,
          isOpenMessage: true,
          status: false,
        });
        console.log(err);
      });
  }
  return (
    <React.Fragment>
      <InfoTooltip isOpen={messageStatus} onClose={onClose} />
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

export default withRouter(Register);
