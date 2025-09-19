import { Router } from 'express';
import { validateInput } from '../middlewares';
import { createUser, login } from '../controllers';
import { createUserSchema, loginSchema } from '../schemas';

const router = Router();

router.post('/auth/users', validateInput(createUserSchema), createUser);
router.post('/auth/login', validateInput(loginSchema), login);

export default router;
