import express, { json } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errors } from 'celebrate';
import helmet from 'helmet';
import router from './routes/index.js';
import 'dotenv/config';
import errorHandler from './middleware/errorHandler.js';
import NotFoundError from './errors/notFoundErr.js';
import { requestLogger, errorLogger } from './middleware/logger.js';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/movieappdb' } = process.env;
const app = express();

app.use(helmet());

const options = {
  origin: [
    'http://localhost:3001',
    'https://movieexplorer.nomoredomainsmonster.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use(cors(options));

// app.use(cors({ origin: ['http://localhost:3001', 'https://movieexplorer.nomoredomainsmonster.ru'], credentials: true, maxAge: 60 }));

app.use(json());
app.use(cookieParser());
app.use(requestLogger);

app.use(router);

app.use((req, res, next) => {
  const error = new NotFoundError('Маршрут не найден');
  next(error);
});
app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // central error handler

async function init() {
  await mongoose.connect(MONGO_URL);

  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

init();
