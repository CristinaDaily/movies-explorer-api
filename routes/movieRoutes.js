import { Router } from 'express';
import { getMovie, saveMovie, deleteMovie } from '../controllers/movies.js';

const movieRoutes = Router();

movieRoutes.get('/', getMovie);
movieRoutes.post('/', saveMovie);
movieRoutes.delete('/:movieId', deleteMovie);

export default movieRoutes;
