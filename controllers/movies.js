import Movie from '../models/movie.js';
import BadRequestError from '../errors/badRequestErr.js';
import NotFoundError from '../errors/notFoundErr.js';

export const getMovie = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

export const createMovie = (req, res, next) => {
  const movieData = req.body;
  //const owner = req.user.id;
  Movie.create({ ...movieData })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      }
      next(error);
    });
};

// подумать не добавить ли строчку что нельзя удалить фильм чужого пользователя,
// тогда нужно добавить poplate owner  при создании
export const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id не найден)');
      }
      return Movie.findByIdAndDelete(req.params.movieId);
    })
    .then((deletedMovie) => {
      res.send(deletedMovie);
    })
    .catch(next);
};
