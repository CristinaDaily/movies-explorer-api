import { Router } from 'express';

const userRoutes = Router();

// userRoutes.get('/', getUsers);  i dont entirely know if we need
userRoutes.get('/me', (req, res) => { res.send('GET'); });
userRoutes.patch('/me', (req, res) => { res.send('PATCH'); });

export default userRoutes;
