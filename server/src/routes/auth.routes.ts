import e from 'cors';
import { Router } from 'express';
import { validateInput } from '../middlewares';
import { createUser } from '../controllers';
import { newUserSchema } from '../schemas';

const router = Router();

router.post('/auth/create-user', validateInput(newUserSchema), createUser);

export default router;
