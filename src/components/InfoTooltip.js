
import React from 'react';
import classes from 'classnames';
import enable from '../images/check/iconOk.svg';
import disable from '../images/check/iconUnion.svg';
import { MarkupForPopups } from './MarkupForPopups';


export function InfoTooltip({ isOpen, onClose}) { // подумать как провести регистрацию onOff
  const { isOpenMessage, status } = isOpen;
  const tool = {
    id: 7,
    title: status
      ? 'Вы успешно зарегистрировались.'
      : 'Что-то пошло не так! Попробуйте ещё раз.',
    alt: status ? 'Регистрация пройдена' : 'Регистрация не пройдена',
    icon: status ? enable : disable,
    classTool: classes('popup', {
      'popup_opened popup__type_tool': isOpenMessage,
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