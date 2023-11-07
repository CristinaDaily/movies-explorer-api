import { Router } from 'express';
import { createUser } from '../controllers/users.js';

const adminRoutes = Router();

adminRoutes.post('/signup', createUser);
adminRoutes.post('/signin', () => {});

export default adminRoutes;
