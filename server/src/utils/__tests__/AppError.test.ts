import { describe, expect, it } from '@jest/globals';
import { AppError } from '../AppError';

describe('AppError', () => {
  it('should create an instance of AppError with all parameters', () => {
    const errMessage = 'Test error message';
    const errStatus = 400;
    const errCode = 'TEST_ERROR';
    const errLog = 'test log message';

    const appError = new AppError(errMessage, errStatus, errCode, errLog);

    expect(appError).toBeInstanceOf(AppError);
    expect(appError).toBeInstanceOf(Error);

    expect(appError.message).toBe(errMessage);
    expect(appError.status).toBe(errStatus);
    expect(appError.code).toBe(errCode);
    expect(appError.logMessage).toBe(errLog);
  });

  it('should maintain Error prototype chain', () => {
    const appError = new AppError('Test', 400, 'TEST', 'Log');

    // Verifica que hereda correctamente de Error
    expect(appError.name).toBe('Error');
    expect(appError.stack).toBeDefined();
    expect(typeof appError.stack).toBe('string');
  });

  it('should handle special characters in parameters', () => {
    const specialMessage = 'Error with special chars: áéíóú ñ 中文 🚀';
    const specialCode = 'ERROR_WITH_SPECIAL_CHARS_123';
    const specialLog = 'Log with symbols: @#$%^&*()';

    const appError = new AppError(specialMessage, 422, specialCode, specialLog);

    expect(appError.message).toBe(specialMessage);
    expect(appError.code).toBe(specialCode);
    expect(appError.logMessage).toBe(specialLog);
  });
});
