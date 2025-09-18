import { Router } from 'express';
import { validateInput } from '../middlewares';
import { createUser } from '../controllers';
import { createUserSchema } from '../schemas';

const router = Router();

router.post('/auth/users', validateInput(createUserSchema), createUser);

export default router;
