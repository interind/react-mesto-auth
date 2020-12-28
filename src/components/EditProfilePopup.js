import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm.js';
import { MarkupForPopups } from './MarkupForPopups.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool,
  isLoadingButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  toggleEventListenerWindow: PropTypes.func.isRequired,
};

function EditProfilePopup({
  isLoadingButton,
  isOpen,
  onClose,
  onUpdateUser,
  toggleEventListenerWindow,
}) {
  React.useEffect(() => {
    if (isOpen) {
      toggleEventListenerWindow(true);
    }
    return () => {
      toggleEventListenerWindow(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const textButton = isLoadingButton ? 'Сохранение...' : 'Сохранить';
  const profile = {
    name: 'profile',
    title: 'Редактировать форму',
    buttonTitle: `${textButton}`,
  };
  const currentUser = React.useContext(CurrentUserContext);
  const [nameProfile, setName] = React.useState({ name: '' });
  const [description, setDescription] = React.useState({ about: '' });
  const [activeButton, setActiveButton] = React.useState(true);
  const [validProfile, setValidProfile] = React.useState({
    name: '',
    about: '',
  });

  function validationProfile(evt) {
    !evt.target.validity.valid
      ? setValidProfile({
          [evt.target.name]: evt.target.validationMessage,
        })
      : setValidProfile({
          [evt.target.name]: '',
        });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function setNameProfile(evt) {
    setName(evt.target.value);
    setActiveButton(!evt.target.value);
  }
  function setDescriptionProfile(evt) {
    setDescription(evt.target.value);
    setActiveButton(!evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: nameProfile,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      active={activeButton}
      name={profile.name}
      title={profile.title}
      buttonTitle={profile.buttonTitle}
      onSubmit={handleSubmit}>
      <MarkupForPopups.Profile
        about={description}
        nameProfile={nameProfile}
        profileMessage={validProfile}
        editName={setNameProfile}
        editAbout={setDescriptionProfile}
        validationProfile={validationProfile}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
