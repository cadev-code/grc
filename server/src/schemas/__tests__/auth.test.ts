import { describe, expect, it } from '@jest/globals';
import { createUserSchema, loginSchema } from '../auth';

describe('auth schemas', () => {
  describe('createUserSchema', () => {
    it('should accept valid data', () => {
      const validData = {
        fullname: 'John Doe',
        username: 'john.doe@example',
        password: 'Password1!',
      };

      const result = createUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid data', () => {
      const invalidData = {
        fullname: 'John Doe',
        username: 'john.doe@example',
        password: 'Password1!',
      };

      const resultFullnameWrong = createUserSchema.safeParse({
        ...invalidData,
        fullname: 'John',
      });
      expect(resultFullnameWrong.success).toBe(false);

      const resultUsernameWrong = createUserSchema.safeParse({
        ...invalidData,
        username: 'Jho*',
      });
      expect(resultUsernameWrong.success).toBe(false);

      const resultPasswordWrong = createUserSchema.safeParse({
        ...invalidData,
        password: 'password',
      });
      expect(resultPasswordWrong.success).toBe(false);
    });
  });

  describe('loginSchema', () => {
    it('should accept valid data', () => {
      const validData = {
        username: 'john.doe@example',
        password: 'Password1!',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid data', () => {
      const invalidData = {
        username: 'john.doe@example',
        password: 'Password1!',
      };

      const resultUsernameWrong = createUserSchema.safeParse({
        ...invalidData,
        username: 'Jho*',
      });
      expect(resultUsernameWrong.success).toBe(false);

      const resultPasswordWrong = createUserSchema.safeParse({
        ...invalidData,
        password: 'password',
      });
      expect(resultPasswordWrong.success).toBe(false);
    });
  });
});
