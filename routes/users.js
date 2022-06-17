const router = require('express').Router();
const auth = require('./../middlewares/auth')
const {
  createUser,
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
  getUserInfo,
  login,
} = require('../controllers/users');

router.post('/users/singin', login);
router.post('/users/signup', createUser);

router.use(auth)
router.get('/users', getUsers);
router.get('/users/:usersId', getUserId);
router.get('/users/me', getUserInfo);  //информация о текущем пользователе
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
