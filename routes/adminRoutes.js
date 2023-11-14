import { Router } from 'express';
import { createUser, login, signout } from '../controllers/users.js';
import { validateUser, validateLoginData } from '../middleware/validate.js';
import auth from '../middleware/auth.js';

const adminRoutes = Router();

adminRoutes.post('/signup', validateUser, createUser);
adminRoutes.post('/signin', validateLoginData, login);
adminRoutes.post('/signout', auth, signout);

export default adminRoutes;
