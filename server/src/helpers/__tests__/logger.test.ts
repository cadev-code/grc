import {
  describe,
  it,
  expect,
  jest,
  beforeAll,
  afterAll,
  beforeEach,
} from '@jest/globals';
import { logger } from '../logger';
import TransportStream from 'winston-transport';

type LoggerLevel = 'info' | 'warn' | 'error' | 'debug';
type Environment = 'development' | 'production';

// Define un símbolo único para acceder al mensaje formateado
const messageSymbol: unique symbol = Symbol.for('message');

// Define la interfaz para el mensaje logueado
interface LoggedMessage {
  level: string;
  message: string;
  timestamp: string;
  [messageSymbol]: string;
}

const environments: Environment[] = ['development', 'production'];

environments.forEach((env) => {
  describe(`logger in ${env}`, () => {
    // Guarda los transportes originales
    const originalTransports = logger.transports;

    // Crea una clase de transporte falso para espiar los logs
    class FakeTransport extends TransportStream {
      log = jest.fn((info: LoggedMessage, callback?: () => void) => {
        if (callback) callback(); // Llama al callback si se proporciona (necesario para cambiar el nivel del log)
      });
    }

    // Crea un transporte falso para espiar los logs
    const fakeTransport = new FakeTransport({ level: 'silly' }); // aceptar todos los niveles

    beforeAll(() => {
      // Reemplaza los transportes originales con el falso
      logger.clear();
      logger.add(fakeTransport);

      // Simula el entorno de producción
      process.env.NODE_ENV = 'production';
    });

    afterAll(() => {
      // Restaura los transportes originales
      logger.clear();
      originalTransports.forEach((t) => logger.add(t));
    });

    beforeEach(() => {
      // Limpia los mocks antes de cada test (importante para no tener falsos positivos)
      fakeTransport.log.mockClear();
    });

    // Test dinámico para cada nivel de log
    const levels: LoggerLevel[] = ['info', 'warn', 'error'];

    levels.forEach((level) => {
      it(`should call the transport and format the log correctly for ${level}`, () => {
        // Realiza un log de prueba
        const message = `${level} log message in ${env}`;
        (logger[level] as (msg: string) => void)(message);

        // Obtiene el logueo registrado
        const logged = fakeTransport.log.mock.calls[0][0] as LoggedMessage;

        // Verifica que el transporte haya sido llamado con el mensaje correcto
        expect(fakeTransport.log).toHaveBeenCalledWith(
          expect.objectContaining({
            level,
            message,
          }),
          expect.any(Function),
        );

        expect(logged.timestamp).toMatch(
          /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
        );
        expect(logged[messageSymbol]).toBe(
          `[${logged.timestamp}] ${logged.level}: ${message}`,
        );
      });
    });

    it('should properly log Error objects', () => {
      const error = new Error('Test error message');
      logger.error(JSON.stringify(error));

      expect(fakeTransport.log).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'error',
          message: JSON.stringify(error),
        }),
        expect.any(Function),
      );
    });

    it('should handle complex objects in logs', () => {
      const complexObject = { user: { id: 1, name: 'Test' }, action: 'create' };
      logger.info(JSON.stringify(complexObject));

      expect(fakeTransport.log).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'info',
          message: JSON.stringify(complexObject),
        }),
        expect.any(Function),
      );
    });
  });
});
