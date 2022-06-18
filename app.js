const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 });

app.use(bodyParser.json());
app.use(cookieParser());

app.use(require('./routes/users'));
app.use(require('./routes/cards'));

app.all('*', (_req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
