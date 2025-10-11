import { Router } from 'express';
import { getAllRoles } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = Router();

router.get('/roles/all', authMiddleware, getAllRoles);

export default router;
