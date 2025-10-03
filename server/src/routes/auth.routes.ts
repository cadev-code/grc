import { Request, Response, Router } from 'express';
import { authMiddleware, validateInput } from '../middlewares';
import { createUser, login } from '../controllers';
import { createUserSchema, loginSchema } from '../schemas';

const router = Router();

router.post('/auth/users', validateInput(createUserSchema), createUser);
router.post('/auth/login', validateInput(loginSchema), login);

// Rutas protegidas
router.get('/auth/me', authMiddleware, (req: Request, res: Response) => {
  res.json({
    user: (req as Request & { user: { id: number; username: string } }).user,
  });
});

// Logout
router.post('/auth/logout', (req: Request, res: Response) => {
  res.clearCookie('access_token').json({ message: 'Sesión cerrada' });
});

export default router;
