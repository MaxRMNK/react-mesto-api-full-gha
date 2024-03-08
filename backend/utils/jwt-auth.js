// Почему так лучше: подключение пакета JWT, секретный ключ, настройка его срока жизни,
// генерация и проверка токена находятся в одном месте.
// см. вебинар: Наталья Дружинина, cohort_61, 2023-06-02.
const jwt = require('jsonwebtoken');

// const SECRET_KEY = 'X3d2jQTz2LqewAIjD0uyfKSLZ5II0p01g4fVYwazgjuZRgzqsA9Y5Qnt9sgmY0tu'; // 64

const { NODE_ENV, SECRET_KEY_ENV } = process.env;
const SECRET_KEY_DEV = 'dev-secret-key'; // Секретный ключ для "режима разработки"
const SECRET_KEY = NODE_ENV === 'production' ? SECRET_KEY_ENV : SECRET_KEY_DEV;

const signToken = (payload) => jwt.sign(payload, SECRET_KEY, {
  expiresIn: '7d', // Срок жизни токена: Сейчас - 7 дней.
});
// // return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

// До верификации ключа из env и dev
const checkToken = (token) => jwt.verify(token, SECRET_KEY);
// // return jwt.verify(token, SECRET_KEY);

// const checkToken = (token) => {
//   // const payload = jwt.verify(SECRET_KEY, SECRET_KEY_DEV);
//   console.log(jwt.verify(SECRET_KEY, SECRET_KEY_DEV));

//   return jwt.verify(token, SECRET_KEY);

//   // try {
//   //   const payload = jwt.verify(SECRET_KEY, SECRET_KEY_DEV);
//   //   console.log('\x1b[31m%s\x1b[0m',
//   //     `Надо исправить. В продакшне используется тот же
//   //     секретный ключ, что и в режиме разработки.`,
//   //   );
//   // } catch (err) {
//   //   if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
//   //     console.log(
//   //       '\x1b[32m%s\x1b[0m',
//   //       'Всё в порядке. Секретные ключи отличаются',
//   //     );
//   //   } else {
//   //     console.log(
//   //       '\x1b[33m%s\x1b[0m',
//   //       'Что-то не так',
//   //       err,
//   //     );
//   //   }
//   // }
// };

// Вариант с хранением токена в localStorage, искать в сохраненках Спринта - ПР14, "версия 2".
// // Берет SECRET_KEY_ENV из переменной окружения
// const signToken = (payload) => jwt
//   .sign(payload, process.env['SECRET_KEY_ENV'], { expiresIn: EXPIRES_IN });
// const checkToken = (token) => jwt.
//   verify(token, process.env['SECRET_KEY_ENV']);

module.exports = {
  signToken,
  checkToken,
};
