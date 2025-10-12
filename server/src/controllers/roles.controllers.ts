import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma_client';
import { CreateRolBody, UpdateRolBody } from '../schemas';
import { AppError } from '../utils';
import { logger } from '../helpers';

export const getAllRoles = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await prisma.rol.findMany({
      orderBy: {
        title: 'asc',
      },
    });

    res.status(200).json({
      error: null,
      data: roles,
      count: roles.length,
    });
  } catch (error) {
    next(error);
  }
};

export const createRol = async (
  req: Request<object, object, CreateRolBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rol = req.body.rol.trim();
    const title = req.body.title.trim();

    const existingRol = await prisma.rol.findUnique({
      where: { rol },
    });

    const existingTitle = await prisma.rol.findUnique({
      where: { title },
    });

    if (existingRol) {
      throw new AppError(
        `Ya existe un rol con el identificador '${rol}'`,
        409,
        'ROL_ALREADY_EXISTS',
        `Intento de creación de rol fallido - El rol '${rol}' ya existe (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    if (existingTitle) {
      throw new AppError(
        `Ya existe un rol con el nombre '${title}'`,
        409,
        'ROL_WITH_TITLE_ALREADY_EXISTS',
        `Intento de creación de rol fallido - El nombre '${title}' se encuentra asignado a otro rol (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const newRol = await prisma.rol.create({
      data: {
        rol,
        title,
      },
    });

    logger.info(
      `Rol creado exitosamente - ID: ${newRol.id}, Rol: ${newRol.rol}, Title: ${newRol.title} (Creado por: ${req.user?.username || 'Unknown'})`,
    );

    res.status(201).json({ error: null, message: 'Rol creado exitosamente' });
  } catch (error) {
    next(error);
  }
};

export const updateRol = async (
  req: Request<object, object, UpdateRolBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.body.id;
    const rol = req.body.rol.trim();
    const title = req.body.title.trim();

    const existingRol = await prisma.rol.findUnique({
      where: { id },
    });

    if (!existingRol) {
      throw new AppError(
        `Rol inexistente`,
        404,
        'ROL_NOT_FOUND',
        `Intento de modificación de rol fallido - No se encontró un rol con el ID '${id}' (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const rolWithSameIdentifier = await prisma.rol.findFirst({
      where: {
        rol,
        id: { not: id },
      },
    });

    if (rolWithSameIdentifier) {
      throw new AppError(
        `Ya existe un rol con el identificador '${rol}'`,
        409,
        'ROL_ALREADY_EXISTS',
        `Intento de modificación de rol fallido - El rol '${rol}' ya existe (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const rolWithSameTitle = await prisma.rol.findFirst({
      where: {
        title,
        id: { not: id },
      },
    });

    if (rolWithSameTitle) {
      throw new AppError(
        `Ya existe un rol con el nombre '${title}'`,
        409,
        'ROL_WITH_TITLE_ALREADY_EXISTS',
        `Intento de modificación de rol fallido - El nombre '${title}' se encuentra asignado a otro rol (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    await prisma.rol.update({
      where: { id },
      data: {
        rol,
        title,
      },
    });

    logger.info(
      `Rol actualizado exitosamente - ID: ${id}, Nuevo Rol: ${rol}, Nuevo Title: ${title} (Modificado por: ${req.user?.username || 'Unknown'})`,
    );

    res
      .status(200)
      .json({ error: null, message: 'Rol actualizado exitosamente' });
  } catch (error) {
    next(error);
  }
};
