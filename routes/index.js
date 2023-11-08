import { Router } from 'express';
import userRoutes from './userRoutes.js';
import movieRoutes from './movieRoutes.js';
import adminRoutes from './adminRoutes.js';
import auth from '../middleware/auth.js'

const router = Router();

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);
router.use('/', adminRoutes);

export default router;
