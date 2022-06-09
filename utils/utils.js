const InternalServerError = 500;
const NotFound = 404;
const BadRequest = 400;

module.exports.incorrectData = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(BadRequest).send({ message: `Введены некорректные данные: ${err.message}` });
    return
  };
  if (err.name === 'CastError') {
    res.status(NotFound).send({ message: `Данные не обнаружены: ${err.message}` });
    return
  };
  res.status(InternalServerError).send({ message: `Произошла ошибка, где то рыдает разработчик: ${err.message}` });
};

module.exports.notFoundItem = (item, res) => {
  if (item === null) {
    res.status(NotFound).send({ message: `Такой объект отсутствует` });
    return
  }
  res.send({ data: item });
}

module.exports.notFoundItemId = (_req, res, _id, err) => {
  if (`req.params.${id}.length` !== 24) {
    res.status(NotFound).send({ message: `Введен некорректный ID` });
    return
  }
  incorrectData({ err, res});
}


// 400 — переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
// 404 — карточка или пользователь не найден.
// 500 — ошибка по - умолчанию.