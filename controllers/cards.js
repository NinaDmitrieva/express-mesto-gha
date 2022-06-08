const Card = require('../models/card');
const { incorrectData, notFoundItem} = require('../utils/utils')

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id})
    .then((card) => res.send({data: card}))
    .catch((err) => incorrectData(err, res))
};


module.exports.getCards = (_req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch((err) => incorrectData(err, res))
};

module.exports.deleteCardId = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      notFoundItem(card, res)
      res.send(card)
    })
    .catch((err) => incorrectData(err, res))
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.send(card)
    })
    .catch((err) => incorrectData(err, res))
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.send(card)
    })
    .catch((err) => incorrectData(err, res))
};