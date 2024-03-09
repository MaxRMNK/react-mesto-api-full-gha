/* eslint-disable no-console */
require('dotenv').config(); // Для получения SECRET_KEY из переменной окружения.

// !!! routes/index.js - Удалить после проверки роут /crash-test

const express = require('express');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser'); // В.2.Для хранения Токена в куках
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// const cors = require('cors'); // CORS через модуль
const cors = require('./middlewares/cors'); // CORS через мидлвару

const router = require('./routes'); // Файл index берется по-умолчанию, указывать не надо
const { errorHandler } = require('./middlewares/error'); // Моя обработка ошибок
const { requestLogger, errorLogger } = require('./middlewares/logger'); // Логгеры

// Старый вариант. Сейчас переменные MONGO_DB и PORT вынесены в .env:
// const { MONGO_DB, PORT } = require('./utils/utils'); // Для CORS модуля достать и allowedCors

// Новый вариант. Если в .env нет переменных с данными, будут заданы значения по умолчанию:
const { MONGO_DB = 'mongodb://localhost:27017/mestodb', PORT = 3001 } = process.env;
// На локалхосте бэк запускаем на 3001 порту, т.к. на 3000 порту запускается фронтенд.
// На рабочем сервере бэк на 3000 порт, т.к. фронт работает на 80/443 (?) порту.

const app = express();

const limiter = rateLimit({
  max: 100, // можно совершить максимум 100 запросов с одного IP
  windowMs: 15 * 60 * 1000, // за 15 минут
});
app.use(limiter); // подключаем rate-limiter
app.use(helmet());

// Подключение к mongodb + Обработка ошибок подключения.
mongoose.connect(MONGO_DB, { useNewUrlParser: true })
  .then(() => { console.log('Успешное подключение к базе данных'); })
  .catch(() => { console.log('Ошибка подключения к базе данных'); });

// Сборка пакетов в JSON-формате. Вместо bodyParser теперь express:
app.use(express.json());
// Чтобы данные в полученном объекте body могли быть любых типов, а не только строки и массивы:
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser()); // Для получения токена из куков

// const corsOptions = {
//   allowedCors, // перенес в utils.js
//   // credentials: true, // Нужно только для куков
//   // ! Также нужно добавить в заголовки fetch фронтэнда: credentials: 'include'
// };
// app.use(cors(corsOptions));
app.use(cors);

app.use(requestLogger); // Логгер запросов. Подключать до всех обработчиков роутов
app.use(router);
app.use(errorLogger); // Логгер ошибок. Подключать после обработчиков роутов и до ошибок

app.use(errors()); // Обработчик ошибок celebrate
app.use(errorHandler); // Централизованный обработчик ошибок

// Запуск HTTP-сервера на заданном номере порта, для обработки поступающих к серверу запросов
// Выводит лог как только сервер будет запущен
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`); // Приложение прослушивает порт ${PORT}
});
