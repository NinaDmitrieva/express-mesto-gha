const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const User = require('../models/user'); "добавлен email, passw; доработан createUser; создан роут для логина.JWT в процессе" 

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      email: email,
      password: hash
    }))
    .then((user) => res.send(user))
    const token = jwt.sign({id: user.id},)//попытка токена, тут нужен ключ и срок годности токена
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
      }
      return res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' });
    });
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      res.send({ message: 'Всё верно!' });
    })
    .catch((err) => {
      return res.status(401).send({ message: err.message });
    });
};

module.exports.getUserInfo = (req, res) => {
  //проверить что это текущий пользователь,
  //если это он то
    User.find({})
      .then((users) => res.send({ data: users }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' }));
}

