import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma_client';

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
