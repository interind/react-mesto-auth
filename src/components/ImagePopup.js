import React from 'react';
import classes from 'classnames';
import PropTypes from 'prop-types';

ImagePopup.propTypes = {
  isOpen: PropTypes.bool,
  selectedCard: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  toggleEventListenerWindow: PropTypes.func.isRequired,
};

function ImagePopup({
  selectedCard,
  onClose,
  isOpen,
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

  const popup = classes('popup popup_type_zoom', { popup_opened: isOpen });
  const pic = classes('popup__pic', {
    popup__pic_type_check: selectedCard.name === 'check',
  });
  return (
    <div
      className={popup}
      onMouseDown={(evt) => evt.currentTarget === evt.target && onClose()}>
      <div className='popup__zoom'>
        <img className={pic} src={selectedCard.link} alt={selectedCard.name} />
        {selectedCard.name !== 'check' && (
          <span className='popup__place-pic'>{selectedCard.name}</span>
        )}
        <button
          className='popup__button-close'
          type='button'
          title='закрыть'
          onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
