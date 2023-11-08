import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import BadRequestError from '../errors/badRequestErr.js';
import ConflictError from '../errors/conflictError.js';
import NotFoundError from '../errors/notFoundErr.js';
import AuthenticationError from '../errors/authenticationError.js'
import generateTtoken from '../utils/jwt.js';

const SOLT_ROUNDS = 10;
const MONGO_DUPLCATE_ERROR_CODE = 11000;

export const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, SOLT_ROUNDS)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const userWithourPassword = user.toObject();
      delete userWithourPassword.password;
      res.send(userWithourPassword);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data was passed when creating a user'));
      }
      if (error.code === MONGO_DUPLCATE_ERROR_CODE) {
        next(new ConflictError('This user already exists'));
      }
      next(error);
    });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = generateTtoken({ _id: user._id });
    return res.send({ token, email: user.email, _id: user._id });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError('Incorrect data'));
    }
    if (error.message === 'NotAutanticate') {
      return next(new AuthenticationError('Wrong email or password'));
    }
    return next(error);
  }
};

export const getCurrentUser = (req, res) => {
  res.send('getCurrentUser ');
  // here should be a middlew which save user._id to request
};

export const updateUser = (req, res) => {
  res.send('UserUpdate');
};
