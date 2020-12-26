import React from 'react';
import classes from 'classnames';
import PropTypes from 'prop-types';
import enable from '../images/check/iconOk.svg';
import disable from '../images/check/iconUnion.svg';
import { MarkupForPopups } from './MarkupForPopups';

InfoTooltip.propTypes = {
  isTooltip: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

function InfoTooltip({ isOpen, onClose, toggleEventListenerWindow }) {
  const { isOpenTool, status, message } = isOpen;
  const defaultTitle = status
    ? 'Вы успешно зарегистрировались.'
    : 'Что-то пошло не так! Попробуйте ещё раз.';
  const tool = {
    title: message !== '' ? message : defaultTitle,
    alt: status ? 'Регистрация пройдена' : 'Регистрация не пройдена',
    icon: status ? enable : disable,
    classTool: classes('popup', {
      'popup_opened popup__type_tool': isOpenTool,
    }),
  };
  React.useEffect(() => {
    toggleEventListenerWindow(isOpen);
  }, [isOpen, toggleEventListenerWindow]);

  // const closePopupsEsc = React.useCallback((evt) => {
  //   if (evt.key === 'Escape') {
  //     onClose();
  //     window.removeEventListener('keydown', closePopupsEsc);
  //   }
  // },[onClose])

  // React.useEffect(() => {
  //   return window.addEventListener('keydown', closePopupsEsc);
  // }, [closePopupsEsc, isTooltip])

  return (
    <MarkupForPopups.Tool
      key={tool.id}
      alt={tool.alt}
      icon={tool.icon}
      title={tool.title}
      classTool={tool.classTool}
      onClose={onClose}
    />
  );
}

export default InfoTooltip;
