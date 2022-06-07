const router = require('express').Router();
const {
  createCard,
  getCards,
  getCardId
} = require('../controllers/users');

router.post('/cards', createCard);
router.get('/cards', getCards);
router.get('/cards/:cardsId', getCardId);


module.exports = router;