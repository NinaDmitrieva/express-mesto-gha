const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String, default: "Жак-Ив Кусто",
    required: false,
    minlength: [2, 'Имя должно содержать больше 2 символов'],
    maxlength: [30, 'Слишком длинное имя, уложитесь в 30 символов'],
  },
  about: {
    type: String, default: "Исследователь",
    required: false,
    minlength: [2, 'Данное поле должно содержать не менее 2 символов'],
    maxlength: [30, 'Данное поле должно содержать не более 30 символов'],
  },
  avatar: {
    type: String, default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    required: false,
  },
  email: {
    type: String,
    required: [true, 'Обязательно заполните это поле'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Обязательно заполните это поле'],
    minlength: 8,
    select: false
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
