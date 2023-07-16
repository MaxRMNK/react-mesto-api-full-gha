import { apiConfig } from "./utils";

/**
 * Вариант доработки:
 * Откорректировать методы здесь и их вызов в других компонентах, чтобы методы принимали не переменные, а объекты.
 * Например: "setUserInfo(name, about){..." => "setUserInfo({name, about}){..."
 * Зачем: Чтобы не беспокоиться о соблюдении порядка передачи значений
 */
class Api {
  constructor(options) {
    this._token = localStorage.getItem('jwt');

    this._urlApi = options.baseUrl;
    this._headers = options.headers;
    // this._headers['Authorization'] = `Bearer ${this._token}`;
     // Стало? В.Малий. 1:38:00
    // this._token = options.headers['authorization']; // Было
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // получить список всех карточек в виде массива (GET)
  getInitialCards(token) {
    return fetch(`${this._urlApi}/cards`, {
      //method: 'GET',
      headers: { ...this._headers, Authorization: `Bearer ${token}`},
    })
      .then(this._getResponseData);
  }

  // получить данные пользователя (GET)
  getUser(token) {
    return fetch(`${this._urlApi}/users/me`, {
      //method: 'GET',
      headers: { ...this._headers, Authorization: `Bearer ${token}`},
    })
      .then(this._getResponseData);
  }

  // Выводим информацию на страницу только если исполнились оба промиса - загрузка профиля пользователя и загрузка карточек
  getAllPageData(token) {
    return Promise.all([ this.getUser(token), this.getInitialCards(token) ]);
  }

  // заменить данные пользователя (PATCH)
  setUserInfo(name, about){ //changeUserInfo
    return fetch(`${this._urlApi}/users/me`, {
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${this._token}`},
      body: JSON.stringify({
        // name: 'Marie Skłodowska Curie',
        // about: 'Physicist and Chemist'
        name: name,
        about: about
      })
    })
      .then(this._getResponseData);
  }

  // заменить аватар (PATCH)
  setAvatar(avatar){
    return fetch(`${this._urlApi}/users/me/avatar`, { // this._urlApi + '/users/me/avatar'
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${this._token}`},
      body: JSON.stringify({ avatar: avatar })
    })
      .then(this._getResponseData);
  }

  // добавить карточку (POST)
  addCardInDb(data){
    return fetch(`${this._urlApi}/cards`, {
      method: 'POST',
      headers: { ...this._headers, Authorization: `Bearer ${this._token}`},
      body: JSON.stringify(data)
    })
      .then(this._getResponseData);
  }

  // удалить карточку (DELETE)
  deleteCard(id){
    return fetch(`${this._urlApi}/cards/${id}`, {
      method: 'DELETE',
      headers: { ...this._headers, Authorization: `Bearer ${this._token}`},
    })
      .then(this._getResponseData);
  }

  // "залайкать" карточку (PUT) + удалить лайк карточки (DELETE)
  // Раньше метод назывался "setLikeCard", были те же аргументы + изменил условие с "if (!isLiked){..." на "if (isLiked){..."
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._urlApi}/cards/${id}/likes`, {
        method: 'PUT',
        headers: { ...this._headers, Authorization: `Bearer ${this._token}`},
      })
        .then(this._getResponseData);
    } else {
      return fetch(`${this._urlApi}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: { ...this._headers, Authorization: `Bearer ${this._token}`},
      })
        .then(this._getResponseData);
    }
  }

}

export const api = new Api( apiConfig );
