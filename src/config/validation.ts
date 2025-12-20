export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  password: {
    minLength: 6,
    maxLength: 50,
    message: 'Password must be at least 6 characters',
  },
  phone: {
    pattern: /^[0-9+\-\s()]{10,15}$/,
    message: 'Please enter a valid phone number',
  },
  name: {
    minLength: 2,
    maxLength: 100,
    message: 'Name must be between 2 and 100 characters',
  },
  address: {
    minLength: 5,
    maxLength: 255,
    message: 'Address must be between 5 and 255 characters',
  },
  review: {
    minLength: 10,
    maxLength: 1000,
    message: 'Review must be between 10 and 1000 characters',
  },
  rating: {
    min: 1,
    max: 5,
    message: 'Rating must be between 1 and 5',
  },
};

export const validateEmail = (email: string): boolean => {
  return VALIDATION.email.pattern.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION.password.minLength;
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION.phone.pattern.test(phone);
};

