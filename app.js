import express, { json } from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import 'dotenv/config';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const { PORT, MONGO_URL } = process.env;

app.use(json());

app.use(router);

app.use(errorHandler); // central error handler

async function init() {
  await mongoose.connect(MONGO_URL);

  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

init();
