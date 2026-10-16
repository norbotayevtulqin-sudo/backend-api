Система управления учениками

REST API для управления учениками учебного центра.

Возможности
Получение списка учеников
Добавление нового ученика
Редактирование данных ученика
Удаление ученика
Хранение данных в PostgreSQL
Поиск учеников по имени в интерфейсе
Технологии
Node.js
Express.js
PostgreSQL
React
REST API
Git и GitHub
Структура данных

Данные ученика включают:

id — идентификатор
name — имя ученика
phone — номер телефона
group_name — название группы
created_at — дата создания записи
API Endpoints
Метод	Endpoint	Описание
GET	/	Проверка работы API
GET	/students	Получение списка учеников
POST	/students	Добавление ученика
PUT	/students/:id	Обновление данных
DELETE	/students/:id	Удаление ученика
Цель проекта

Проект создан для практического изучения backend-разработки с использованием Node.js, Express.js, PostgreSQL и REST API. Реализованы основные CRUD-операции: создание, чтение, обновление и удаление данных.

GitHub

https://github.com/norbotayevtulqin-sudo/backend-api
