const InternalServerError = 500;
const NotFound = 404;
const BadRequest = 400;

module.exports.incorrectData = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(BadRequest).send({ message: `Введены некорректные данные: ${err.message}` });
  };
  if (err.name === 'CastError') {
    return res.status(NotFound).send({ message: `Данные не обнаружены: ${err.message}` });
  };
  res.status(InternalServerError).send({ message: `Произошла ошибка, где то рыдает разработчик: ${err.message}` });
};

module.exports.notFoundItem = (item, res) => {
  if (item === null) {
    return res.status(NotFound).send({ message: `Такой объект отсутствует` });
  }
  res.send({ data: item });
}

module.exports.notFoundItemId = (_req, res, _id, err) => {
  if (`req.params.${_id}.length` !== 24) {
    return res.status(NotFound).send({ message: `Введен некорректный ID` });
  }
  incorrectData({ err, res });
}