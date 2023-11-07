import User from '../models/user.js';

export const createUser = (req, res) => {
  const { email, password, name } = req.body;
  User.create({ email, password, name })
    .then((user) => res.send(user));
};

export const getUser = (req, res) => {
  const currentUser = req.user._id;
  User.findById(currentUser)
    .then((user) => res.send(user));
};

export const updateUser = (req, res) => {
  res.send('UserUpdate');
};
