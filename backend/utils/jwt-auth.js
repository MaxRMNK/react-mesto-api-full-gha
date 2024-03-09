// Почему так лучше: подключение пакета JWT, секретный ключ, настройка его срока жизни,
// генерация и проверка токена находятся в одном месте.
// см. вебинар: Наталья Дружинина, cohort_61, 2023-06-02.
const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY_ENV } = process.env;

const jwtDevKey = 'dev-secret-key'; // "Секретный" ключ для режима разработки
const SECRET_KEY = NODE_ENV === 'production' ? SECRET_KEY_ENV : jwtDevKey;

const signToken = (payload) => jwt.sign(payload, SECRET_KEY, {
  expiresIn: '7d', // Срок жизни токена: Сейчас - 7 дней.
});

// До верификации ключа из env и dev
const checkToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
  signToken,
  checkToken,
};
