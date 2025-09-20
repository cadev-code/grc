import { describe, expect, it } from '@jest/globals';
import { compareEncryptedPassword } from '../compareEncryptedPassword';
import { encryptPassword } from '../encryptPassword';

describe('compareEncryptedPassword', () => {
  it('should return true for matching password and hash', async () => {
    const password = 'correctPassword123';
    const hash = await encryptPassword(password);

    const isValid = await compareEncryptedPassword(password, hash);
    expect(isValid).toBe(true);
  });

  it('should return false for non-matching password and hash', async () => {
    const password = 'correctPassword123';
    const wrongPassword = 'wrongPassword123';
    const hash = await encryptPassword(password);

    const isValid = await compareEncryptedPassword(wrongPassword, hash);
    expect(isValid).toBe(false);
  });

  it('should handle special characters correctly', async () => {
    const password = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const hash = await encryptPassword(password);

    const isValid = await compareEncryptedPassword(password, hash);
    expect(isValid).toBe(true);
  });

  it('should return false for malformed hash', async () => {
    const password = 'somePassword123';
    const malformedHash = 'not-a-valid-hash';

    const isValid = await compareEncryptedPassword(password, malformedHash);
    expect(isValid).toBe(false);
  });

  it('should be case sensitive', async () => {
    const password = 'Password123';
    const hash = await encryptPassword(password);

    const isValidLower = await compareEncryptedPassword('password123', hash);
    const isValidUpper = await compareEncryptedPassword('PASSWORD123', hash);

    expect(isValidLower).toBe(false);
    expect(isValidUpper).toBe(false);
  });
});
