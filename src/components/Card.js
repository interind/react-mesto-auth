import React from 'react';
import PropTypes from 'prop-types';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const { _id } = React.useContext(CurrentUserContext);
  const [visible, setVisible] = React.useState(true);

  return (
    <React.Fragment>
      {visible && (
        <div className='element'>
          <img
            src={card.link}
            alt={card.name}
            className='element__pic'
            onError={() => {
              setVisible(false);
            }}
            onClick={() => onCardClick(card)}
          />
          <button
            className={`element__button-trash ${
              card.owner &&
              (card.owner._id === _id ? 'element__button-trash_visible' : '')
            }`}
            type='button'
            title='кнопка удаления карточки'
            onClick={() => onCardDelete(card)}></button>
          <div className='element__info'>
            <h2 className='element__title' title={card.name}>
              {card.name}
            </h2>
            {card.likes && (
              <div className='element__like'>
                <button
                  className={`element__button-like element__button-like_color_white ${
                    card.likes.find((id) => id._id === _id)
                      ? 'element__button-like_color_black'
                      : ''
                  }`}
                  type='button'
                  title='кнопка для лайков'
                  onClick={() => onCardLike(card)}></button>
                <span
                  className='element__counter-like'
                  title={card.likes.map(
                    (like, index) => index + 1 + '🖤' + like.name
                  )}>
                  {card.likes.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

Card.propTypes = {
  card: PropTypes.object,
  onCardLike: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

export default Card;
