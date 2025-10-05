import { Request, Response } from 'express';
import prisma from '../prisma_client';
import { encryptPassword, logger } from '../helpers';
import { CreateUserBody, LoginBody } from '../schemas';
import { AppError } from '../utils';
import { compareEncryptedPassword } from '../helpers/compareEncryptedPassword';
import jwt from 'jsonwebtoken';

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
      409,
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

export const login = async (
  req: Request<object, object, LoginBody>,
  res: Response,
) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new AppError(
      'Credenciales inválidas',
      404,
      'USER_NOT_FOUND',
      `Intento de autenticación fallido - El nombre de usuario '${username}' no existe`,
    );
  }

  const isPasswordValid = await compareEncryptedPassword(
    password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new AppError(
      'Credenciales inválidas',
      401,
      'INVALID_CREDENTIALS',
      `Intento de autenticación fallido - Contraseña incorrecta para el usuario '${username}'`,
    );
  }

  const token = jwt.sign(
    {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
    },
    process.env.JWT_SECRET || 'default_secret',
    {
      expiresIn: '1h',
    },
  );

  logger.info(`Usuario autenticado exitosamente - User: ${username}`);

  res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60, // 1 hour
    })
    .json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
    });
};
