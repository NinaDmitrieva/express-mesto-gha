const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({name, about, avatar})
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: `Что то пошло не так`}))
}

module.exports.getUsers = (_req, res) => {

  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
    //.catch(() => res.status(500).send({ message: err }))
}

module.exports.getUserId = (req, res) => {

  User.findOne(req.params.userId)
    .then((user) => {
      if(!user) {
        res.status(500).send({ message: `туть` });
        //res.status(500).send({ message: err});
        return
      }
      res.send(user)
    })
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
    //.catch(() => res.status(500).send({ message: err }))
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about}, {new: true, runValidators: true})
    .then(user => res.send({ data: user } ))
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
};
