import express, { json } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './routes/index.js';

const app = express();
const { PORT = 3000 } = process.env;

app.use(json());

app.use(router);

mongoose.connect('mongodb://localhost:27017/movieappdb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
