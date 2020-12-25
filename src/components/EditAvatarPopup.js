import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import { MarkupForPopups } from './MarkupForPopups.js';

function EditAvatarPopup({ isLoadingButton, isOpen, onClose, onUpdateAvatar }) {
  const textButton = isLoadingButton ? 'Сохранение...' : 'Сохранить';
  const avatarPopup = {
    name: 'avatar',
    title: 'Обновить аватар',
    buttonTitle: `${textButton}`,
  };

  const [avatarUser, setAvatar] = React.useState('');
  let [activeButton, setActiveButton] = React.useState(true);
  const [validAvatar, setValidAvatar] = React.useState('');

  function validationAvatar(evt) {
    !evt.target.validity.valid
      ? setValidAvatar(evt.target.validationMessage)
      : setValidAvatar('');
  }

  function setAvatarUser(evt) {
    setAvatar(evt.target.value);
    setActiveButton(!evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    setAvatar('');

    onUpdateAvatar({
      avatar: avatarUser,
    });
  }

  return (
    <PopupWithForm
      name={avatarPopup.name}
      title={avatarPopup.title}
      buttonTitle={avatarPopup.buttonTitle}
      isOpen={isOpen}
      onClose={onClose}
      active={activeButton}
      onSubmit={handleSubmit}>
      <MarkupForPopups.Avatar
        avatarUser={avatarUser}
        editAvatar={setAvatarUser}
        avatarMessage={validAvatar}
        validationAvatar={validationAvatar}
      />
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool,
  isLoadingButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onUpdateAvatar: PropTypes.func.isRequired,
};

export default EditAvatarPopup;
