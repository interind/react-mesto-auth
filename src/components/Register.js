import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import { MarkupForPopups } from './MarkupForPopups';

Register.propTypes = {
  isOpen: PropTypes.bool,
  isLoadingButton: PropTypes.bool,
  signOut: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

Register.defaultProps = {
  isOpen: false,
};

function Register({
  isOpen,
  signOut,
  onRegister,
  isLoadingButton,
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [activeButton, setActiveButton] = React.useState(true);
  const [validCheck, setValidCheck] = React.useState({
    password: '',
    email: '',
  });
  const textButton = isLoadingButton ? 'Проверка...' : 'Регистрация';
  const checkPopup = {
    name: 'check',
    title: 'Регистрация',
    buttonTitle: `${textButton}`,
    linkInfo: {
      link: '/sign-in',
      info: 'Вы уже зарегистрировались?',
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
    onRegister(password, email);
  }
  return (
    <React.Fragment>
      <div className='page__elements'>
        <PopupWithForm
          isOpen={isOpen}
          active={activeButton}
          name={checkPopup.name}
          title={checkPopup.title}
          buttonTitle={checkPopup.buttonTitle}
          userAuthInfo={checkPopup.linkInfo}
          signOut={signOut}
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
