import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.js';
import Profile from './Profile';

Main.propTypes = {
  cards: PropTypes.array,
  onAddPlace: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  handleCardLike: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleCardDelete: PropTypes.func.isRequired,
};

function Main({
  cards,
  onAddPlace,
  onEditAvatar,
  onEditProfile,
  handleCardLike,
  handleCardClick,
  handleCardDelete,
}) {

  return (
    <React.Fragment>
      <Profile
        onAddPlace={onAddPlace}
        onEditAvatar={onEditAvatar}
        onEditProfile={onEditProfile}
      />
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
    </React.Fragment>
  );
}

export default Main;
