import { Router } from 'express';
import { createUser, login } from '../controllers/users.js';

const adminRoutes = Router();

adminRoutes.post('/signup', createUser);
adminRoutes.post('/signin', login);

export default adminRoutes;
