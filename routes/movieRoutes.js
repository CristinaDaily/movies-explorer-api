import { Router } from 'express';
import { getMovie, createMovie, deleteMovie } from '../controllers/movies.js';
import { validateMovie, validateMovieId } from '../middleware/validate.js';

const movieRoutes = Router();

movieRoutes.get('/', getMovie);
movieRoutes.post('/', validateMovie, createMovie);
movieRoutes.delete('/:movieId', validateMovieId, deleteMovie);

export default movieRoutes;
