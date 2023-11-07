import { Router } from 'express';

const movieRoutes = Router();

movieRoutes.get('/', (req, res) => { res.send('GET'); });
movieRoutes.post('/', (req, res) => { res.send('POST'); });
movieRoutes.delete('/:movieId', (req, res) => { res.send('delete ID'); });

export default movieRoutes;
