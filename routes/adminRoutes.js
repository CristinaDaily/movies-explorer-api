import { Router } from 'express';
import { createUser, login } from '../controllers/users.js';
import { validateUser, validateLoginData } from '../middleware/validate.js'

const adminRoutes = Router();

adminRoutes.post('/signup', validateUser, createUser);
adminRoutes.post('/signin', validateLoginData, login);

export default adminRoutes;
