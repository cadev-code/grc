import { Router } from 'express';
import { createRol, deleteRol, getAllRoles, updateRol } from '../controllers';
import { authMiddleware, validateInput } from '../middlewares';
import { createRolSchema, updateRolSchema } from '../schemas';

const router = Router();

router.get('/roles/all', authMiddleware, getAllRoles);

router.post(
  '/roles',
  authMiddleware,
  validateInput(createRolSchema),
  createRol,
);

router.put('/roles', authMiddleware, validateInput(updateRolSchema), updateRol);

router.delete('/roles/:id', authMiddleware, deleteRol);

export default router;
