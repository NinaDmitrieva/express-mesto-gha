const router = require('express').Router();
const User = require('../models/user');

router.get('/users', (req, res)=> {
  User.find({})
   .then(films => res.send({data:users}))
   .catch(()=> res.status(500).send({message:`Что то пошло не так`}))
});

router.get(' /users/:userId', (req,res) => {
//User.find или User.findById
})

module.exports = router;