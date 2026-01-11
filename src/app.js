// Точка входа приложения — настройка сервера Express и маршрутов
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override'); // для поддержки PUT/DELETE в формах

const UsersController = require('./controllers/UsersController');

// Инициализация приложения
const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB (замените URI на ваш)
mongoose.connect('mongodb://localhost:27017/ecommerce_db')
  .then(() => console.log('✅ Подключено к MongoDB'))
  .catch(err => console.error('❌ Ошибка подключения:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // позволяет использовать ?_method=PUT в URL
app.set('view engine', 'ejs'); // шаблонизатор
app.set('views', path.join(__dirname, 'views'));

// Маршруты
app.get('/', (req, res) => res.render('index'));

// CRUD для пользователей
app.get('/users', UsersController.getAllUsers);
app.get('/users/new', UsersController.showCreateForm);
app.post('/users', UsersController.createUser);
app.get('/users/:id/edit', UsersController.showEditForm);
app.put('/users/:id', UsersController.updateUser);
app.delete('/users/:id', UsersController.deleteUser);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});