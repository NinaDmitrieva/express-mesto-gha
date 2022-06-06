const mongoose = require('mongoose');
const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use('/users', require('./routes/users'))
app.use('/users/:usersId', require('./rourers/:usersId'));
app.use('/users', require('./rourers/users'))