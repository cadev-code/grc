import { encryptPassword } from '../encryptPassword';
import { compareEncryptedPassword } from '../compareEncryptedPassword';
import { describe, expect, it } from '@jest/globals';

describe('encryptPassword', () => {
  it('should encrypt a password successfully', async () => {
    const password = 'mySecurePassword123';
    const hashedPassword = await encryptPassword(password);

    // Verificar que el hash no sea igual a la contraseña original
    expect(hashedPassword).not.toBe(password);

    // Verificar que el hash tenga el formato correcto (longitud y estructura)
    expect(hashedPassword).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/);
  });

  it('should generate different hashes for the same password', async () => {
    const password = 'mySecurePassword123';
    const hash1 = await encryptPassword(password);
    const hash2 = await encryptPassword(password);

    // Verificar que los hashes sean diferentes (debido al salt aleatorio)
    expect(hash1).not.toBe(hash2);
  });

  it('should generate hashes that can be verified', async () => {
    const password = 'mySecurePassword123';
    const hashedPassword = await encryptPassword(password);

    // Verificar que la contraseña original coincida con el hash
    const isValid = await compareEncryptedPassword(password, hashedPassword);
    expect(isValid).toBe(true);
  });

  it('should handle special characters in passwords', async () => {
    const password = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Verificar que una contraseña con caracteres especiales se pueda encriptar
    const hashedPassword = await encryptPassword(password);
    expect(hashedPassword).toBeTruthy();

    // Verificar que se pueda validar correctamente
    const isValid = await compareEncryptedPassword(password, hashedPassword);
    expect(isValid).toBe(true);
  });
});
