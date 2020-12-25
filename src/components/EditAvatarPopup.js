import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import { MarkupForPopups } from './MarkupForPopups.js';

function EditAvatarPopup({ isLoadingButton, isOpen, onClose, onUpdateAvatar }) {
  const textButton = isLoadingButton ? 'Сохранение...' : 'Сохранить';
  const avatarPopup = {
    id: 1,
    name: 'avatar',
    title: 'Обновить аватар',
    buttonTitle: `${textButton}`,
  };

  const inputRef = React.useRef();
  const [avatarUser, setAvatar] = React.useState('');
  let [activeButton, setActiveButton] = React.useState(true);
  const [validAvatar, setValidAvatar] = React.useState('');

  function validationAvatar(evt) {
    !evt.target.validity.valid
      ? setValidAvatar(evt.target.validationMessage)
      : setValidAvatar('');
  }

  function setAvatarUser() {
    setAvatar(inputRef.current.value);
    setActiveButton(!inputRef.current.value);
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
      key={avatarPopup.id}
      name={avatarPopup.name}
      title={avatarPopup.title}
      buttonTitle={avatarPopup.buttonTitle}
      isOpen={isOpen}
      onClose={onClose}
      active={activeButton}
      onSubmit={handleSubmit}>
      <MarkupForPopups.Avatar
        avatarUser={avatarUser}
        inputRef={inputRef}
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
