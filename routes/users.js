const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserId
} = require('../controllers/users');

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:usersId', getUserId);


module.exports = router;