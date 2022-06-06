const User = require('../models/user');

module.exports.createUser = (req, res) =>{
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar})
    .then(user => res.send({ user }))
    // .then((user) => res.send({ user })) протести
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
}

module.exports.getUsers = (req, res) => {

  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
}

module.exports.getUserId = (req, res) => {

  User.findById(req.params.userId)
    .then(/*как то сравнить пользователей */)
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
}