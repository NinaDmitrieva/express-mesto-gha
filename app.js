const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 });


app.use(bodyParser.json());
app.use(require('./routes/users'));
app.use(require('./routes/cards'));

// тут будет авторизация но это не точно
// app.use((req, res, next) => {
//   req.user = {
//     _id: '5d8b8592978f8bd833ca8133'
//   };

//   next();
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


