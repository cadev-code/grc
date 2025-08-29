import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use(authRoutes);

app.listen(PORT, () => {});
