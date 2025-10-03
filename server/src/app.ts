import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8080;

dotenv.config();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.use(express.json());

app.use(authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {});
