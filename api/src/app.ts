import 'dotenv/config';
import 'reflect-metadata';

import './database';

import express from 'express';

const app = express();

app.use(express.json());

export default app;
