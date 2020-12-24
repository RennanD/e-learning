import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import './database';

import router from './routes';

import appErrors from './middlewares/handleExceptions';

const app = express();

app.use(express.json());
app.use(router);
app.use(appErrors);

export default app;
