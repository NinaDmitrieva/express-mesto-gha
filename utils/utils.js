module.exports.incorrectData = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: `Введены некорректные данные: ${err.message}` });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: `Данные не обнаружены: ${err.message}` });
  }
  return res.status(500).send({ message: `Произошла ошибка, попробуйте еще раз: ${err.message}` });
};

module.exports.notFoundItem = (item, res) => {
  if (item === null) {
    return res.status(404).send({ message: 'Такой объект отсутствует' });
  }
  return res.send({ data: item });
};

module.exports.notFoundItemId = (_req, res, _id, err) => {
  if (`req.params.${_id}.length` !== 24) {
    return res.status(400).send({ message: 'Введен некорректный ID' });
  }
  return res.status(404).send({ err, res });
};

