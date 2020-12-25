import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({
  isOpen,
  isCard,
  onClose,
  onDeleteCard,
  isLoadingButton,
}) {
  const textButton = isLoadingButton ? 'Удаляем...' : 'Да';
  const deletePopup = {
    id: 4,
    name: 'delete',
    title: 'Вы уверены?',
    buttonTitle: `${textButton}`,
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    onDeleteCard(isCard);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      key={deletePopup.id}
      name={deletePopup.name}
      title={deletePopup.title}
      buttonTitle={deletePopup.buttonTitle}
      onSubmit={handleSubmit}
    />
  );
}

DeleteCardPopup.propTypes = {
  isOpen: PropTypes.bool,
  isCard: PropTypes.object,
  isLoadingButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
};

export default DeleteCardPopup;
