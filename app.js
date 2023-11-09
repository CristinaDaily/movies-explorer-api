import express, { json } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/index.js';
import 'dotenv/config';
import errorHandler from './middleware/errorHandler.js';
import { errors } from 'celebrate';
import NotFoundError from './errors/notFoundErr.js';

const { PORT, MONGO_URL } = process.env;
const app = express();

app.use(cors({ origin: ['http://localhost:3001'], credentials: true, maxAge: 60 }));

app.use(json());
app.use(cookieParser());

app.use(router);

app.use((req, res, next) => {
  const error = new NotFoundError('Маршрут не найден');
  next(error);
});

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // central error handler

async function init() {
  await mongoose.connect(MONGO_URL);

  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

init();
