import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes';
import rolesRoutes from './routes/roles.routes';
import { errorHandler } from './middlewares';

const app = express();
const PORT = 8080;

dotenv.config();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.use(express.json());

app.use(authRoutes);
app.use(rolesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {});
