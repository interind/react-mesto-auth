export const BASE_URL = 'https://auth.nomoreparties.co/';

export const register = (password, email) => { // регистрация пройдена
  return fetch(`${BASE_URL}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      try {
        if (response.status === 200) {
          return response.json();
        }
      } catch (e) {
          return e;
        }
    })
    .catch((err) => console.log(err));
};

export const authorizationPost = ({ password, email }) => { // получение токена
  console.log(password, email);
  return fetch(`${BASE_URL}signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      try {
        if (response.status === 200) {
          return response.json();
        }
      } catch (e) {
          return e;
        }
    })
    .then((data) => {
      // сохраняем токен
      return data;
    })
    .catch((err) => console.log(err));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
