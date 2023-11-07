import { Router } from 'express';
import userRoutes from './userRoutes.js';
import movieRoutes from './movieRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/', adminRoutes);

export default router;
