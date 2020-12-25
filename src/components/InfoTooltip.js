import React from 'react';
import classes from 'classnames';
import enable from '../images/check/iconOk.svg';
import disable from '../images/check/iconUnion.svg';
import { MarkupForPopups } from './MarkupForPopups';

function InfoTooltip({ isTooltip, onClose }) {
  const { isOpenTool, status, message } = isTooltip;
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
