import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { Request, Response } from 'express';
import { Mock } from 'jest-mock';
import prisma from '../../prisma_client';
import { encryptPassword, logger } from '../../helpers';
import { createUser } from '../auth.controllers';

// Mock de prisma client
jest.mock('../../prisma_client', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

// Mock de helpers encryptPassword y logger
jest.mock('../../helpers', () => ({
  encryptPassword: jest.fn(),
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

// Definir res falso (solo lo necesario)
type MockResponse = {
  status: Mock<(code: number) => MockResponse>;
  json: Mock<(body: unknown) => MockResponse>;
};

// Mock de la respuesta express
const mockRes = (): MockResponse => {
  const res: MockResponse = {
    status: jest.fn((_code: number) => res),
    json: jest.fn((_body: unknown) => res),
  };
  return res;
};

describe('auth controllers', () => {
  describe('createUser', () => {
    type FindUniqueFn = typeof prisma.user.findUnique;
    type EncryptPasswordFn = typeof encryptPassword;
    type CreateFn = typeof prisma.user.create;

    let req: Request;
    let res: Response;

    beforeEach(() => {
      // Limpiar todos los mocks antes de cada test
      jest.clearAllMocks();

      // Declaración de req con type assertion
      req = {
        body: {
          fullname: 'Test User',
          username: 'testuser',
          password: 'testUser1@',
        },
      } as Request;

      // Definir res y cambiar el tipado MockResponse a Response
      res = mockRes() as unknown as Response;
    });

    it('should create a user', async () => {
      // Simula que no existe ningún usuario
      (
        prisma.user.findUnique as jest.MockedFunction<FindUniqueFn>
      ).mockResolvedValue(null);

      // Simula la creación del password hash
      (
        encryptPassword as jest.MockedFunction<EncryptPasswordFn>
      ).mockResolvedValue('hashedPassword');

      // Simula la creación del usuario
      (prisma.user.create as jest.MockedFunction<CreateFn>).mockResolvedValue({
        id: 1,
        fullname: req.body.fullname,
        username: req.body.username,
        passwordHash: 'hashedPassword',
      });

      await createUser(req, res);

      // Verificar llamadas a funciones
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { username: req.body.username },
      });

      // Verificar encriptación de contraseña
      expect(encryptPassword).toHaveBeenCalledWith(req.body.password);

      // Verificar creación de usuario con los datos correctos
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          fullname: req.body.fullname,
          username: req.body.username,
          passwordHash: 'hashedPassword',
        },
      });

      // Verificar logs
      expect(logger.info).toHaveBeenCalledWith(
        `Usuario creado exitosamente - Fullname: ${req.body.fullname}, Username: ${req.body.username}`,
      );

      // Verificar respuestas
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Usuario creado exitosamente',
      });
    });

    it('should return error if prisma.findUnique failure', async () => {
      // Simula que el usuario existe
      (
        prisma.user.findUnique as jest.MockedFunction<FindUniqueFn>
      ).mockRejectedValue(new Error('DB failed'));

      await expect(createUser(req, {} as Response)).rejects.toThrow(
        'DB failed',
      );
    });

    it('should throw AppError if user already exists', async () => {
      // Simula que el usuario existe
      (
        prisma.user.findUnique as jest.MockedFunction<FindUniqueFn>
      ).mockResolvedValue({
        id: 1,
        fullname: req.body.fullname,
        username: req.body.username,
        passwordHash: 'hashedPassword',
      });

      // Verifica que se lanza el error correcto
      await expect(createUser(req, {} as Response)).rejects.toMatchObject({
        message: 'Nombre de usuario ya existe',
        status: 409,
        code: 'USER_ALREADY_EXISTS',
        logMessage: `Intento de creación de usuario fallido - El nombre de usuario '${req.body.username}' ya existe`,
      });
    });

    it('should return error if encryptPassword failure', async () => {
      // Simula que no existe ningún usuario
      (
        prisma.user.findUnique as jest.MockedFunction<FindUniqueFn>
      ).mockResolvedValue(null);
      // Simula un error en encryptPassword
      (
        encryptPassword as jest.MockedFunction<EncryptPasswordFn>
      ).mockRejectedValue(new Error('Hash failed'));

      // Verifica que se lanza el error correcto
      await expect(createUser(req, {} as Response)).rejects.toThrow(
        'Hash failed',
      );
    });

    it('should return error if prisma.create failure', async () => {
      // Simula que no existe ningún usuario
      (
        prisma.user.findUnique as jest.MockedFunction<FindUniqueFn>
      ).mockResolvedValue(null);

      // Simula la creación del password hash
      (
        encryptPassword as jest.MockedFunction<EncryptPasswordFn>
      ).mockResolvedValue('hashedPassword');

      // Simula que el usuario existe
      (prisma.user.create as jest.MockedFunction<CreateFn>).mockRejectedValue(
        new Error('DB failed'),
      );

      await expect(createUser(req, {} as Response)).rejects.toThrow(
        'DB failed',
      );
    });

    it('should return error if logger.info failure', async () => {
      // Simula que no existe ningún usuario
      (
        prisma.user.findUnique as jest.MockedFunction<FindUniqueFn>
      ).mockResolvedValue(null);

      // Simula la creación del password hash
      (
        encryptPassword as jest.MockedFunction<EncryptPasswordFn>
      ).mockResolvedValue('hashedPassword');

      // Simula la creación del usuario
      (prisma.user.create as jest.MockedFunction<CreateFn>).mockResolvedValue({
        id: 1,
        fullname: req.body.fullname,
        username: req.body.username,
        passwordHash: 'hashedPassword',
      });

      // Simula que logger.info lanza un error
      (logger.info as jest.Mock).mockImplementation(() => {
        throw new Error('Logger failed');
      });

      // Verifica que se lanza el error cuando falla el logger
      await expect(createUser(req, res)).rejects.toThrow('Logger failed');
    });
  });
});
