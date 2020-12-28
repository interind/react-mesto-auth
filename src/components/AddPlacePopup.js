import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm.js';
import { MarkupForPopups } from './MarkupForPopups.js';

AddPlacePopup.propTypes = {
  isOpen: PropTypes.bool,
  isLoadingButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  toggleEventListenerWindow: PropTypes.func.isRequired,
};

function AddPlacePopup({
  isLoadingButton,
  isOpen,
  onClose,
  onAddPlace,
  toggleEventListenerWindow,
}) {

  React.useEffect(() => {
    if (isOpen) {
      toggleEventListenerWindow(true);
    }
    return () => {
       toggleEventListenerWindow(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const textButton = isLoadingButton ? 'Сохранение...' : 'Сохранить';
  const placePopup = {
    name: 'place',
    title: 'Новое место',
    buttonTitle: `${textButton}`,
  };

  const [namePlace, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');
  const [activeButton, setActiveButton] = React.useState(true);

  const [validPlace, setValidPlace] = React.useState({
    place: '',
    link: '',
  });

  function validationPlace(evt) {
    !evt.target.validity.valid
      ? setValidPlace({
          [evt.target.name]: evt.target.validationMessage,
        })
      : setValidPlace({
          [evt.target.name]: '',
        });
  }

  function setPlaceName(evt) {
    setPlace(evt.target.value);
    setActiveButton(!evt.target.value);
  }
  function setLinkPlace(evt) {
    setLink(evt.target.value);
    setActiveButton(!evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    setPlace('');
    setLink('');
    onAddPlace({
      name: namePlace,
      link: link,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      active={activeButton}
      name={placePopup.name}
      title={placePopup.title}
      buttonTitle={placePopup.buttonTitle}
      onSubmit={handleSubmit}>
      <MarkupForPopups.Place
        link={link}
        place={namePlace}
        placeMessage={validPlace}
        editLink={setLinkPlace}
        editPlace={setPlaceName}
        validationPlace={validationPlace}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
