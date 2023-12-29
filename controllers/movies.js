import Movie from '../models/movie.js';
import BadRequestError from '../errors/badRequestErr.js';
import NotFoundError from '../errors/notFoundErr.js';
import ForbiddenError from '../errors/forbiddenError.js';

export const getMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

export const createMovie = (req, res, next) => {
  const movieData = req.body;
  const owner = req.user._id;

  Movie.create({ ...movieData, owner })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      }
      next(error);
    });
};

export const deleteMovie = async (req, res, next) => {
  const userId = req.user._id;

  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id не найден)');
      }
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError('Невозможно удалить фильм другого пользователя');
      }
      return Movie.findByIdAndDelete(req.params.movieId);
    })
    .then((deletedMovie) => {
      res.send(deletedMovie);
    })
    .catch((err) => {
      next(err);
    });
};
