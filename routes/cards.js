const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCardId,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/),
  }),
}), createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardsId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCardId);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

module.exports = router;
