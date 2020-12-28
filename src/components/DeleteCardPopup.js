import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm.js';

DeleteCardPopup.propTypes = {
  isOpen: PropTypes.bool,
  isCard: PropTypes.object,
  isLoadingButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  toggleEventListenerWindow: PropTypes.func.isRequired,
};

function DeleteCardPopup({
  isOpen,
  isCard,
  onClose,
  onDeleteCard,
  isLoadingButton,
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

  const textButton = isLoadingButton ? 'Удаляем...' : 'Да';
  const deletePopup = {
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
      name={deletePopup.name}
      title={deletePopup.title}
      buttonTitle={deletePopup.buttonTitle}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
