import 'dotenv/config';
import 'reflect-metadata';

import { resolve } from 'path';

import express from 'express';
import 'express-async-errors';

import './database';

import router from './routes';

import appErrors from './middlewares/handleExceptions';

const app = express();

app.use(express.json());
app.use(router);
app.use(appErrors);

app.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));

export default app;
