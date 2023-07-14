const { checkToken } = require('../utils/jwt-auth');
const UnauthorizedError = require('../errors/unauthorized-err'); // 401 Unauthorized

// Вариант с хранением токена в localStorage, искать в сохраненках Спринта - ПР14, "версия 2".
// Вариант с хранением токена в куках - финальная версия спринта/ПР14

module.exports.auth = (req, res, next) => {
  // Настройка использования Токена. Исправляются файлы:
  // + controllers/users.js
  // + middlewares/auth.js
  // + app.js

  // В.1.: Получаем токен из заголовка запроса
  const { authorization } = req.headers;
  // Проверяем, что авторизационный заголовок есть и начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация 1');
  }
  const token = authorization.replace('Bearer ', '');

  // В.2.: Получаем токен из куков
  // const { token } = req.cookies;

  let payload;

  try { // верифицируем токен
    payload = checkToken(token);
  } catch (err) { // отправим ошибку, если не получилось
    throw new UnauthorizedError('Необходима авторизация / auth.js');
  }

  req.user = payload;

  next(); // пропускаем запрос дальше
};

// module.exports = auth;
