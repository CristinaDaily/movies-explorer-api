import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AuthenticationError from '../errors/authenticationError.js';

const { JWT_SECRET, NODE_ENV } = process.env;

export default function auth(req, res, next) {
  let payload;
  try {
    //const token = req.headers.authorization;
    const token = req.cookies.jwt;

    if (!token) {
      throw new AuthenticationError('Authorization required');
    }
    const validToken = token.replace('Bearer ', '');
    payload = jwt.verify(validToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AuthenticationError('Something wrong with the token'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AuthenticationError('Token has expired'));
    }
    return next(error);
  }
  req.user = payload;
  return next();
}
