const Card = require('../models/cards');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
}

module.exports.getCards = (_req, res) => {

  Card.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
}

module.exports.getCardId = (req, res) => {

  Card.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(500).send({ message: `Что то пошло не так` });
        return
      }
      res.send(user)
    })
    .catch(() => res.status(500).send({ message: `Что то пошло не так` }))
}