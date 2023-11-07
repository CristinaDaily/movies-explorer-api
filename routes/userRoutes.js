import { Router } from 'express';
import { getUser, updateUser } from '../controllers/users.js';

const userRoutes = Router();

userRoutes.get('/me', getUser);
userRoutes.patch('/me', updateUser);

export default userRoutes;
