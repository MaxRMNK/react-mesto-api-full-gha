[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# Проект "Mesto: настройка и деплой"
Адрес репозитория: https://github.com/MaxRMNK/react-mesto-api-full-gha

Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.

## Ссылки на проект
  * Frontend https://mesto.maxrmnk.nomoredomains.work
  * Backend https://api.mesto.maxrmnk.nomoredomains.work

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

    Отказался от модуля (https://www.npmjs.com/package/cors) в пользу собственной мидлвэр, чтобы просто потренироваться. В `app.js` оставил закомментированным код подключения и запуска модуля.
  + Настроена работа с переменными окружения с помощью модуля `dotenv` и файла `.env` - вынесены данные для подключения к БД и запуска приложения на сервере.

## Можно доработать
  * Вынести функции валидации из файлов `routes/` в `/middlewares/validatons.js`.
  * Тексты ошибок вынести в отдельный файл с константами.


## Разворачиваем проект локально
1. Склонировать проект, перейти в папку `/react-mesto-api-full-gha`
    ```shell
    git clone git@github.com:MaxRMNK/react-mesto-api-full-gha.git
    cd react-mesto-api-full-gha
    ```
2. Проверить версии устновленных MongoDB, Node.js и библиотеки пакетов NPM
    ```shell
    mongod -version # проверка версии MongoDB
    node -v # проверка версии Node.js
    npm -v # проверка версии NPM
    ```
3. Перейти в папку `frontend`; установить frontend-часть проекта и ее зависимости; вернуться в корневую директорию проекта
    ```shell
    cd frontend/
    npm install
    cd ..
    ```
4. Перейти в папку `backend`; установить backend-часть проекта и ее зависимости; вернуться в корневую директорию проекта
    ```shell
    cd backend/
    npm install
    cd ..
    ```

    **Внимание!** Для запуска проекта в директории `backend` может потребоватся создание `.env`-файла.


## Создание файла `.env` для хранения переменных окружения
Для хранения адреса базы данных, номера порта на котором запускается backend-часть приложения и секретного ключа для генерации и проверки токенов используются переменные окружения, которые хранятся в файле `.env` директории `backend`.

При запуске проекта локально создание файла env не обязательно, но ж
если адрес БД

  1. Перейти в папку `/react-mesto-api-full-gha/backend`
    ```shell
    cd react-mesto-api-full-gha/backend/
    ```

  2. Создать в папке `backend` файл `.env` и открыть его
    ```shell
    touch .env # создать
    vi .env # открыть в VIM
    ```

  3. Добавить в файл `.env` переменные окружения и сохранить изменения
    1. Добавить переменные окружения в файл `.env` по образцу:
      ```shell
      # Выберите один из режимов:
      # NODE_ENV="production"
      NODE_ENV="development"

      SECRET_KEY_ENV="gmY0tuX3d2jQTz2D0uyfKSLZ9Y5Qnt9s5II0p01g4fVYwazgjuZRgzqsALqewAIj" # Приватный ключ (пример)

      PORT=3001 # Порт запуска бэкенд части приложения
      MONGO_DB="mongodb://localhost:27017/mestodb" # Адрес подключения к БД
      ```

      В режиме "production" будет браться приватный ключ из переменной окружения SECRET_KEY_ENV, а в "development" будет использоваться ключ заданный в коде.

    2. Сохранить изменения, выйти из VIM и вернуться в корневую директорию проекта:

    Нажать на клавиатуре `ESC`

    ```shell
    :wq # сохранить и выйти
    ```
    ```shell
    cd ..
    ```

## Запуск проекта

  * Запуск сервера с hot-reload (режим разработки). После запуска приложение доступно на адресе `localhost:3000`
    ```shell
    npm run dev
    ```
    `Ctrl + C` - выход из режима разработки

  * Запуск сервера
    ```shell
    npm run start
    # или `node app.js`
    # или `npm start`
    ```
    `Ctrl + C` - остановка сервера




