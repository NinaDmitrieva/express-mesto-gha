const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:usersId', getUserId);
router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);
//router.post('/users/singin', login);
router.post('/users/signup', createUser);


module.exports = router;
