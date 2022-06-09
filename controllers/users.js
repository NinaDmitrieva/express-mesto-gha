const { incorrectData, notFoundItem, notFoundItemId } = require('../utils/utils');

const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => incorrectData(err, res));
};

module.exports.getUsers = (_req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => incorrectData(err, res));
};

module.exports.getUserId = (req, res) => {
  User.findOne(req.params.userId)
    .then((user) => notFoundItemId(user, res))
    .catch((err) => notFoundItem(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => incorrectData(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => incorrectData(err, res));
};
