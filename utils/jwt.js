import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET, NODE_ENV } = process.env;

const generateTtoken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret', { expiresIn: 3600 });

export default generateTtoken;
