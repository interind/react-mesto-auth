import React from 'react';
import classes from 'classnames';


export const MarkupForPopups = {
  Avatar: function Avatar(props) {
    const inputValidClass = classes('popup__input', {
      popup__input_type_error: props.avatarUser,
    });
    return (
      <React.Fragment>
        <input
          className={inputValidClass}
          type='url'
          placeholder='Ссылка на картинку'
          id='input-avatar'
          name='avatar'
          value={props.avatarUser}
          onChange={props.editAvatar}
          onInput={props.validationAvatar}
          required
        />
        {props.avatar !== '' && (
          <div className='popup__error'>
            <span
              className='popup__input-error popup__input-error_active'
              id='input-avatar-error '>
              {props.avatarMessage}
            </span>
          </div>
        )}
      </React.Fragment>
    );
  },
  Profile: function Profile(props) {
    const inputValidClass = classes('popup__input', {
      popup__input_type_error: props.nameProfile || props.about,
    });
    return (
      <React.Fragment>
        <input
          className={inputValidClass}
          id='input-name'
          type='text'
          name='name'
          minLength='2'
          maxLength='40'
          placeholder='Имя'
          value={props.nameProfile}
          onChange={props.editName}
          onInput={props.validationProfile}
          required
        />
        {props.nameProfile === '' && (
          <div className='popup__error'>
            <span
              className='popup__input-error popup__input-error_active'
              id='input-name-error'>
              {props.profileMessage.name}
            </span>
          </div>
        )}
        <input
          className={inputValidClass}
          id='input-about'
          type='text'
          name='about'
          minLength='2'
          maxLength='200'
          placeholder='Профессия'
          value={props.about}
          onChange={props.editAbout}
          onInput={props.validationProfile}
          required
        />
        {props.about === '' && (
          <div className='popup__error'>
            <span
              className='popup__input-error popup__input-error_active'
              id='input-about-error'>
              {props.profileMessage.about}
            </span>
          </div>
        )}
      </React.Fragment>
    );
  },
  Place: function Place(props) {
    const inputValidClass = classes('popup__input', {
      popup__input_type_error: props.place || props.link,
    });
    return (
      <React.Fragment>
        <input
          className={inputValidClass}
          type='text'
          placeholder='Название'
          id='input-place'
          name='place'
          minLength='1'
          value={props.place}
          maxLength='30'
          onChange={props.editPlace}
          onInput={props.validationPlace}
          required
        />
        {props.place === '' && (
          <div className='popup__error'>
            <span
              className='popup__input-error popup__input-error_active'
              id='input-place-error'>
              {props.placeMessage.place}
            </span>
          </div>
        )}
        <input
          className={inputValidClass}
          type='url'
          placeholder='Ссылка на картинку'
          id='input-link'
          value={props.link}
          name='link'
          onChange={props.editLink}
          onInput={props.validationPlace}
          required
        />
        {props.link !== '' && (
          <div className='popup__error'>
            <span
              className='popup__input-error popup__input-error_active'
              id='input-link-error'>
              {props.placeMessage.link}
            </span>
          </div>
        )}
      </React.Fragment>
    );
  },
  Check: function Check(props) {
    const inputValidClass = classes('popup__input popup__input_type_check', {
      popup__input_type_error: props.password || props.email,
    });
    return (
      <React.Fragment>
        <input
          className={inputValidClass}
          type='email'
          placeholder='Почта'
          id='input-email'
          value={props.email}
          name='email'
          onChange={props.editEmail}
          onInput={props.validationCheck}
          required
        />
        {props.email !== '' && (
          <div className='popup__error'>
            <span
              className='popup__input-error popup__input-error_active'
              id='input-email-error'>
              {props.placeMessage.email}
            </span>
          </div>
        )}
        <input
          className={inputValidClass}
          type='password'
          placeholder='Пароль'
          id='input-password'
          name='password'
          minLength='6'
          value={props.password}
          maxLength='30'
          onChange={props.editPassword}
          onInput={props.validationCheck}
          autoComplete='off'
          required
        />
        {props.password && (
          <div className='popup__error'>
            <span
              className='popup__input-error popup__input-error_active'
              id='input-password-error'>
              {props.placeMessage.password}
            </span>
          </div>
        )}
      </React.Fragment>
    );
  },
  Tool: function Tool(props) {

    return (
      <div
        className={props.classTool}
        onMouseDown={(evt) =>
          evt.currentTarget === evt.target && props.onClose()
        }
        >
      <div className='popup__container popup__container_type_tool'>
        <img
          className='popup__pic popup__pic_type_tool'
          src={props.icon}
          alt={props.alt}></img>
        <p className='popup__title popup__title_type_tool'>{props.title}</p>
        <button
          className='popup__button-close'
          onClick={props.onClose}></button>
      </div>
      </div>
    );
  },
};
