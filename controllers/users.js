/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/AuthError');
const BadReqError = require('../errors/BadReqError');
const ConflictError = require('../errors/ConflictError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const JWT = 'SECRET_KEY';

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (user) {
        throw new ConflictError('Такой пользователь уже существует');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        }))
        .then((user) => res.status(201).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          id: user._id,
          email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadReqError('Введены некорректные данные');
          }
          if (err.code === 11000) {
            throw new ConflictError('Такой пользователь есть, вероятно это вы)');
          }
          next(err);
        });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      if (!email || !password) {
        throw new ForbiddenError('Оба поля обязательны для заполнения');
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new AuthError('Неправильные почта или пароль');
      }
      const token = jwt.sign({
        _id: req.user._id,
      }, JWT, {
        expiresIn: '7d',
      });

      return res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
        })
        .send({ token });
    })
    .catch(() => {
      throw new AuthError('Введены некорректные данные');
    })
    .cath(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserId = (req, res, next) => {
  const { usersId } = req.params;
  User.findById(usersId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadReqError('Введены некорректные данные');
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadReqError('Введены некорректные данные');
      }
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadReqError('Введены некорректные данные');
      }
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};
