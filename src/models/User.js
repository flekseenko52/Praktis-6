// Модель пользователя — описывает структуру данных и бизнес-логику
const mongoose = require('mongoose');

// Схема пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Методы модели (CRUD реализуются через стандартные методы Mongoose)
module.exports = mongoose.model('User', userSchema);