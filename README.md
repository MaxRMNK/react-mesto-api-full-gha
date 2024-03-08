[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# Проект "Mesto: настройка и деплой"
Адрес репозитория: https://github.com/MaxRMNK/react-mesto-api-full-gha

Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.

## Ссылки на проект
Frontend https://mesto.maxrmnk.nomoredomains.work
Backend https://api.mesto.maxrmnk.nomoredomains.work

## Описание
Проект выполнен в качестве проверочного задания в рамках учебной программы **[ЯндексПрактикум «Веб-разработчик»](https://practicum.yandex.ru/web/)**, курс 6 (спринт 8), **проектная работа #15**.

### Технологии
 - HTML5 и CSS3
 - JavaScript ES6
 - Библиотека (фреймворк) JavaScript React v.18.2.0
 - Модуль React Router DOM v.6.22.1
 - Серверная среда выполнения JavaScript - Node.js v.20.11.1
 - Библиотека пакетов NPM v.10.2.4
 - Фреймворк Express.js v.4.18.2
 - MongoDB v.4.4.22 и библиотека Mongoose v.7.6.8
 - ESLint v.8.43.0 и стайлгайд Airbnb v.15.0.0

## История изменений
Ранее работа велась в отдельных репозитариях:
  * Фронтенд на React: https://github.com/MaxRMNK/react-mesto-auth
  * Бэкенд: https://github.com/MaxRMNK/express-mesto-gha

В текущей проектной работе отдельные части приложения были объединены, настроено их взаимодействие и защита от внешних угроз.

### Фронтенд - `frontend/`
  + Отключен модуль web-vitals
  + Изменен URL подключения к серверу в файле `frontend/src/utils/utils.js`, вместо учебного сервера настроена работа с собственным API.
  + Незначительные изменения в обработке запросов к backend и полученных ответов

### Бэкенд - `backend/`
  + Подключен express-rate-limit для ограничения количества запросов и защиты от DoS-атак.
    https://www.npmjs.com/package/express-rate-limit
  + Подключен helmet для защиты приложения от веб-уязвимостей, с помощью функций промежуточной обработки, обеспечивающих настройку заголовков HTTP.
    https://expressjs.com/ru/advanced/best-practice-security.html.
  + Настроен сбор логов с помощью библиотеки `winston` и мидлвэр `express-winston` - подключение и настройка в мидлвэр `logger.js`.
  + Написана мидлвэр `cors.js` и настроена обработка кросс-доменных запросов (CORS). Адреса доменов с которых разрешены запросы хранятся в `backend/utils/utils.js`. - Это необходимо т.к. подразумевается, что бэкенд часть приложения находится на отдельном домене или поддомене основного сайта.

  Отказался от модуля (https://www.npmjs.com/package/cors) в пользу собственной мидлвэр, чтобы просто потренироваться. В `app.js` оставил закомментированным код подключения модуля.
  + Настроена работа с переменными окружения с помощью модуля `dotenv` и файла `.env` - вынесены данные для подключения к БД и запуска приложения на сервере.

## Можно доработать
  * Вынести функции валидации из файлов `routes/` в `/middlewares/validatons.js`.
  * Тексты ошибок вынести в отдельный файл с константами.






