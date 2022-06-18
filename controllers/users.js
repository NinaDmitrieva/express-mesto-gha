/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const User = require('../models/user');

const JWT = 'SECRET_KEY';

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: 'Такой пользователь уже существует' });
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email,
          password: hash,
        }))
        .then((user) => res.status(200).send({
          name: user.name,
          email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
          }
          return res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' });
        });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Неправильные почта или пароль' });
      }
      if (!email || !password) {
        return res.status(403).send({ message: 'Оба поля обязательны для заполнения' });
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return res.status(401).send({ message: 'Неправильные почта или пароль' });
      }
      const token = jwt.sign({
        id: user._id,
      }, JWT);

      return res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
        })
        .send({ message: 'Всё верно!' });
    })
    .catch((err) => res.status(401).send({ message: `Введены некорректные данные: ${err.message}` }));
};

module.exports.getUsers = (_req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' }));
};

module.exports.getUserId = (req, res) => {
  const { usersId } = req.params;
  User.findById(usersId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Такого пользователя нет' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
      }
      return res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Такого пользователя нет' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
      }
      return res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Такого пользователя нет' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
      }
      return res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' });
    });
};

module.exports.getUserInfo = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' }));
};
