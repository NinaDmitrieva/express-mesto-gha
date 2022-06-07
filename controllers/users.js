const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({name, about, avatar})
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
}

module.exports.getUsers = (_req, res) => {

  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
}

module.exports.getUserId = (req, res) => {

  User.findById(req.params.userId)
    .then((user) =>{
      if(!user) {
        res.status(500).send({ message: `Что то пошло не так` });
        return
      }
      res.send(user)
    })
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
}