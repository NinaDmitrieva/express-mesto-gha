const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      return res.status(500).send({ message: `Произошла ошибка, попробуйте еще раз: ${err.message}` });
    });
};

module.exports.getUsers = (_req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка, попробуйте еще раз: ${err.message}` }));
};

module.exports.getUserId = (req, res) => {
  User.findOne(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Такого пользователя нет' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      return res.status(500).send({ message: `Произошла ошибка, попробуйте еще раз: ${err.message}` });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      return res.status(500).send({ message: `Произошла ошибка, попробуйте еще раз: ${err.message}` });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      return res.status(500).send({ message: `Произошла ошибка, попробуйте еще раз: ${err.message}` });
    });
};
