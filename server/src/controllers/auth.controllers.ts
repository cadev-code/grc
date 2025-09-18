import { Request, Response } from 'express';
import prisma from '../prisma_client';
import { encryptPassword } from '../helpers';
import { CreateUserBody } from '../schemas';

export const createUser = async (
  req: Request<object, object, CreateUserBody>,
  res: Response,
) => {
  const { fullname, username, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(400).json({ error: 'El nombre de usuario ya existe.' });
      return;
    }

    const passwordHash = await encryptPassword(password);

    await prisma.user.create({
      data: {
        fullname,
        username,
        passwordHash,
      },
    });

    res.status(201).json({ message: 'Usuario creado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor.' });
  }
};
