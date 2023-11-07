import Movie from '../models/movie.js';

export const getMovie = (req, res) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch((err) => console.log(err));
};

export const saveMovie = (req, res) => {
  const movieData = req.body;
  //const owner = req.user.id;
  Movie.create({ ...movieData })
    .then((movie) => res.send(movie))
    .catch((err) => console.log(err));
};

export const deleteMovie = (req, res) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        console.log('NotFoundError(Карточка с указанным id не найдена)');
      }
      return Movie.findByIdAndDelete(req.params.movieId);
    })
    .then((deletedMovie) => {
      res.send(deletedMovie);
    })
    .catch((err) => console.log(err));
};
