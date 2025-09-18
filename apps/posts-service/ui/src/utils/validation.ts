export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  EMAIL_INVALID: 'Invalid email address',
  PASSWORD_WEAK: 'Password must contain uppercase, lowercase and number',
  PASSWORD_MIN_LENGTH: (length: number) => `Password must be at least ${length} characters`,
  PASSWORDS_NO_MATCH: 'Passwords do not match',
  MIN_LENGTH: (field: string, length: number) => `${field} must be at least ${length} characters`,
  MAX_LENGTH: (field: string, length: number) => `${field} must not exceed ${length} characters`
} as const;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8 && PASSWORD_REGEX.test(password);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};
