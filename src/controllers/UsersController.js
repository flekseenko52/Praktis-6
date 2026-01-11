// Контроллер пользователей — обрабатывает HTTP-запросы и координирует Model ↔ View
const User = require('../models/User');

// GET /users — отобразить список всех пользователей
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.render('userList', { users }); // Передача данных во View
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при загрузке пользователей');
  }
}

// GET /users/new — показать форму создания
function showCreateForm(req, res) {
  res.render('userForm', { user: null, title: 'Добавить пользователя' });
}

// POST /users — создать нового пользователя
async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    await User.create({ name, email });
    res.redirect('/users'); // Перенаправление на список
  } catch (err) {
    console.error(err);
    res.status(400).send('Ошибка при создании пользователя');
  }
}

// GET /users/:id/edit — форма редактирования
async function showEditForm(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Пользователь не найден');
    res.render('userForm', { user, title: 'Редактировать пользователя' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при загрузке пользователя');
  }
}

// PUT /users/:id — обновить пользователя
async function updateUser(req, res) {
  try {
    const { name, email } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(400).send('Ошибка при обновлении пользователя');
  }
}

// DELETE /users/:id — удалить пользователя
async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при удалении пользователя');
  }
}

module.exports = {
  getAllUsers,
  showCreateForm,
  createUser,
  showEditForm,
  updateUser,
  deleteUser
};