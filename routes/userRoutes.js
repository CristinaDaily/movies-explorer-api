import { Router } from 'express';
import { getCurrentUser, updateUser } from '../controllers/users.js';
import { validateUserUpdate } from '../middleware/validate.js';

const userRoutes = Router();

userRoutes.get('/me', getCurrentUser);
userRoutes.patch('/me', validateUserUpdate, updateUser);

export default userRoutes;
