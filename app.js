import express, { json } from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import 'dotenv/config';

const app = express();
const { PORT, MONGO_URL } = process.env;

app.use(json());

app.use(router);

async function init() {
  await mongoose.connect(MONGO_URL);

  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

init();
