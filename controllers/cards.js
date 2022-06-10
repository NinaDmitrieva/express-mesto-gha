const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
      }
      return res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' });
    });
};

module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' }));
};

module.exports.deleteCardId = (req, res) => {
  const { cardsId } = req.params;
  Card.findByIdAndRemove(cardsId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка отсутствует' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Введены некорректные данные:${err.message}` });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Введены некорректные данные:${err.message}` });
      }
      return res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка отсутствует' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Введен некорректный ID' });
      }
      return res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка отсутствует' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Введен некорректный ID' });
      }
      return res.status(500).send({ message: 'Произошла ошибка, попробуйте еще раз' });
    });
};
