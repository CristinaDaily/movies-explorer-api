import { Router } from 'express';
import { getCurrentUser, updateUser } from '../controllers/users.js';

const userRoutes = Router();

userRoutes.get('/me', getCurrentUser);
userRoutes.patch('/me', updateUser);

export default userRoutes;
