const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
    minlength: [2, 'Имя должно содержать больше 2 символов'],
    maxlength: [30, 'Слишком длинное имя, уложитесь в 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Данное поле обязательно для заполнения'],
    minlength: [2, 'Данное поле должно содержать не менее 2 символов'],
    maxlength: [30, 'Данное поле должно содержать не более 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Обязательно заполните это поле'],
  },
});

module.exports = mongoose.model('user', userSchema);
