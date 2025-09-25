// Expresiones regulares para validación
export const REGEX = {
  USERNAME: /^[a-z0-9.@-]{4,}$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,}$/,
} as const;

// Funciones de validación reutilizables
export const validate = {
  username: (value: string) => REGEX.USERNAME.test(value),
  password: (value: string) => REGEX.PASSWORD.test(value),
};

// Mensajes de error para cada validación
export const ERROR_MESSAGES = {
  username: {
    invalid:
      'El usuario debe tener al menos 4 caracteres y solo puede contener letras, números, puntos, @ y guiones',
  },
  password: {
    invalid:
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (!@#$%&*)',
  },
} as const;
