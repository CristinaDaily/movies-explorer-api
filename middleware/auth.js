import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET, NODE_ENV } = process.env;

export default function auth(req, res, next) {
  let payload;
  try {
    const token = req.headers.authorization;
    // const token = req.cookies.jwt;

    if (!token) {
      throw new Error('NotAutanticate');
    }
    const valideToken = token.replace('Bearer ', '');
    payload = jwt.verify(valideToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (error) {
    if (error.message === 'NotAutanticate') {
      return res.status(401).send({ message: 'Authorization required', error });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: 'Something wrong with the token', error });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
  req.user = payload;
  return next();
}
