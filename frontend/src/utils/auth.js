// export const BASE_URL = 'https://auth.nomoreparties.co';
// export const BASE_URL = 'http://localhost:3001';

import { BASE_URL } from "./utils"

const getResponseData = (res) => {
  // console.log('Auth.getResponseData:', res);

  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // credentials: 'include', // Здесь и в других заголовках fetch нужно только для Куков
    body: JSON.stringify({email, password})
  })
  .then(getResponseData)
  // .then((res) => {
  //   console.log(res);
  //   // return res;
  // })
  // .catch((err) => console.log(err));
};


export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  .then(getResponseData)
};


export const checkToken = (token) => {
  console.log('Auth.js, checkToken', token);
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    // credentials: 'include',
  })
  .then(getResponseData)
};
