// export const BASE_URL = 'https://auth.nomoreparties.co'; // ПР10-12
export const BASE_URL = 'http://localhost:3001';
// export const BASE_URL = 'https://api.mesto.maxrmnk.nomoredomains.work';

export const apiConfig = {
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  baseUrl: BASE_URL,
  // credentials: 'include', // Здесь и в других заголовках fetch нужно только для Куков
  headers: {
    // authorization: 'fe0e2550-7db8-46d0-ad13-df530dd3ed8c',
    authorization: '',
    'Content-Type': 'application/json',
  },
}
