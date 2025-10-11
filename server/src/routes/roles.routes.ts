import { Router } from 'express';
import { createRol, getAllRoles } from '../controllers';
import { authMiddleware, validateInput } from '../middlewares';
import { createRolSchema } from '../schemas';

const router = Router();

router.get('/roles/all', authMiddleware, getAllRoles);
router.post(
  '/roles',
  authMiddleware,
  validateInput(createRolSchema),
  createRol,
);

export default router;
