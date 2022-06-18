const jwt = require('jsonwebtoken');

const JWT = 'SECRET_KEY';

const auth = (req, res, next) => {
  const { cookies } = req;

  if (!cookies) {
    next(res.status(401).send({ error: 'Вы НЕ прошли авторизацию' }));
  } else {
    const token = cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, JWT);
    } catch (err) {
      next(res.status(401).send({ error: 'Вы НЕ прошли авторизацию' }));
    }

    req.user = payload;
    next();
  }
};

module.exports = auth;
