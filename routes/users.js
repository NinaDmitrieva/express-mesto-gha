const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.use(auth);
router.get('/users', getUsers);
router.get('/users/:usersId', getUserId);
router.get('/users/me', getUserInfo); // информация о текущем пользователе
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
