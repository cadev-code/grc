import { Request, Response } from 'express';
import prisma from '../prisma_client';
import { encryptPassword, logger } from '../helpers';
import { CreateUserBody } from '../schemas';
import { AppError } from '../utils';

export const createUser = async (
  req: Request<object, object, CreateUserBody>,
  res: Response,
) => {
  const { fullname, username, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    throw new AppError(
      'Nombre de usuario ya existe',
      400,
      'USER_ALREADY_EXISTS',
      `Intento de creación de usuario fallido - El nombre de usuario '${username}' ya existe`,
    );
  }

  const passwordHash = await encryptPassword(password);

  await prisma.user.create({
    data: {
      fullname,
      username,
      passwordHash,
    },
  });

  logger.info(
    `Usuario creado exitosamente - Fullname: ${fullname}, Username: ${username}`,
  );
  res.status(201).json({ message: 'Usuario creado exitosamente' });
};
