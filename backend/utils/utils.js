// Эти HTTP_STATUS вроде бы ни где не используются. Можно удалить?
// module.exports.HTTP_STATUS = {
//   OK: 200,
//   CREATED: 201, // Создано (пользователь/карточка)
//   ERROR_BAD_REQUEST: 400, // ValidationError: Ошибка валидации, Некорректный запрос (ID)
//   ERROR_UNAUTHORIZED: 401, // UnauthorizedError: Неправильные почта или пароль
//   ERROR_ACCESS_DENIDED: 403, // ForbiddenError: Доступ запрещен
//   ERROR_NOT_FOUND: 404, // NotFoundError: Страница (пользователь, карточка) не найдена
//   ERROR_CONFLICT: 409, // ConflictError: Дубликат уникального поля
//   ERROR_SERVER: 500, // UnhandledError: Internal Server Error, Default Error
//   ERROR_DUPLICATE_KEY: 11000, // 409
// };

// Массив доменов, с которых разрешены кросс-доменные запросы
// Для мидлвары cors.js или модуля cors
const allowedCors = [
  'https://mesto.maxrmnk.nomoredomains.work',
  // 'http://mesto.maxrmnk.nomoredomains.work',
  // 'http://localhost:3000',
];

const {
  // // Локалхост
  // MONGO_DB = 'mongodb://localhost:27017/mestodb',
  // PORT = 3001,
  // Виртуальная машина
  MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
} = process.env;

module.exports = {
  allowedCors,
  MONGO_DB,
  PORT,
};
