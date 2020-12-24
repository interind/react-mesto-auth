import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm.js';
import { MarkupForPopups } from './MarkupForPopups.js';

function AddPlacePopup({ isLoadingButton, isOpen, onClose, onAddPlace }) {
  const textButton = isLoadingButton ? 'Сохранение...' : 'Сохранить';
  const placePopup = {
    id: 3,
    name: 'place',
    title: 'Новое место',
    buttonTitle: `${textButton}`,
  };

  const [namePlace, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');
  let [activeButton, setActiveButton] = React.useState(true);

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
      key={placePopup.id}
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

AddPlacePopup.propTypes = {
  isOpen: PropTypes.bool,
  isLoadingButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
};

export default AddPlacePopup;
