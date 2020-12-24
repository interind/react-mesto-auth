import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Main({
  cards,
  isOpenCard,
  onAddPlace,
  selectedCard,
  onEditAvatar,
  onEditProfile,
  closeAllPopups,
  handleCardLike,
  handleCardClick,
  handleCardDelete,
}) {
  const { name, about, avatar, _id } = React.useContext(CurrentUserContext);

  return (
    <React.Fragment>
      <section className='profile page__profile'>
        <img
          id={_id}
          src={avatar}
          alt='Аватарка'
          onClick={onEditAvatar}
          className='profile__avatar'
        />
        <div className='profile__info'>
          <h1 className='profile__title' title={name}>
            {name}
          </h1>
          <button
            type='button'
            title='изменить данные профиля'
            className='profile__edit-button'
            onClick={onEditProfile}></button>
          <p className='profile__subtitle' title={about}>
            {about}
          </p>
        </div>
        <button
          type='button'
          title='добавить картинки'
          className='profile__add-button'
          onClick={onAddPlace}></button>
      </section>
      <div className='elements page__elements'>
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card.createdAt + card._id}
              onCardLike={handleCardLike}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
            />
          );
        })}
      </div>
      <ImagePopup
        isOpen={isOpenCard}
        onClose={closeAllPopups}
        selectedCard={selectedCard}
      />
    </React.Fragment>
  );
}

Main.propTypes = {
  cards: PropTypes.array,
  isOpenCard: PropTypes.bool,
  selectedCard: PropTypes.object,
  onAddPlace: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  handleCardLike: PropTypes.func.isRequired,
  closeAllPopups: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleCardDelete: PropTypes.func.isRequired,
};

export default Main;
