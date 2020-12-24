export const BASE_URL = 'https://auth.nomoreparties.co/';

function getResponse(res) {
  return res.status === '200' || '400' || '401'
    ? res.json()
    : Promise.reject(new Error(`Ошибка api: ${res.status}`));
}

export const register = (password, email) => { // регистрация
  return fetch(`${BASE_URL}signup`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ password, email }),
  })
    .then(getResponse)
};

export const authorizationPost = ({ password, email }) => { // получение токена
  return fetch(`${BASE_URL}signin`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponse)
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`,
    },
  }).then(getResponse)
};
