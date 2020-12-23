class Api {
  constructor({ url, token, user, cards }) {
    this._url = url;
    this._token = token;
    this._user = user;
    this._cards = cards;
  }

  _getResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(new Error(`Ошибка api: ${res.status}`));
  }

  getInfoForUser() {
    return fetch(`${this._url}${this._user}`, {
      headers: {
        authorization: `${this._token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(this._getResponse);
  }

  getInfoForCards() {
    return fetch(`${this._url}${this._cards}`, {
      headers: {
        authorization: `${this._token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(this._getResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._url}${this._user}`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponse);
  }

  updateUserAvatar({ avatar }) {
    return fetch(`${this._url}${this._user}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._url}${this._cards}`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponse);
  }

  changeLikeCardStatus(infoId, isLike) {
    const toggleMethod = isLike ? 'PUT' : 'DELETE';
    return fetch(`${this._url}${this._cards}/likes/${infoId}`, {
      method: toggleMethod,

      headers: {
        authorization: `${this._token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(this._getResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}${this._cards}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(this._getResponse);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/',
  token: 'bba27b67-a97d-4fd9-b42d-01c5b1258337',
  user: 'users/me',
  cards: 'cards',
});

export default api;
