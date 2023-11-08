import { Router } from 'express';
import { getMovie, createMovie, deleteMovie } from '../controllers/movies.js';

const movieRoutes = Router();

movieRoutes.get('/', getMovie);
movieRoutes.post('/', createMovie);
movieRoutes.delete('/:movieId', deleteMovie);

export default movieRoutes;
