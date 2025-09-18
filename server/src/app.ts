import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares';
import dotenv from 'dotenv';

const app = express();
const PORT = 8080;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {});
