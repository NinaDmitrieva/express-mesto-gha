const router = require('express').Router();
const User = require('../models/user');

// router.get('/users', (req, res)=> {
//   User.find({})
//     .then(users => res.send({data:users}))
//     .catch(()=> res.status(500).send({message:`Что то пошло не так`}))
// });

// router.get('/users/:userId', (req, res) => {
//   User.findById({})
//     .then()
// //User.find или User.findById
// })

// router.post('/users', (req, res) => {
//   //User.find или User.findById
// })

const {
  createUser,
  getUsers,
  getUserId
} = require('../controllers/users');

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users', getUserId);


module.exports = router;