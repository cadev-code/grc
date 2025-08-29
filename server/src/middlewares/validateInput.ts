import { error } from 'console';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateInput =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.errors });
      return;
    }
    req.body = result.data;
    next();
  };
