export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: Record<string, string[]>;
  status?: number;
}

export type ErrorCode = 
  | 'AUTH_REQUIRED'
  | 'AUTH_INVALID'
  | 'AUTH_EXPIRED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR'
  | 'RATE_LIMIT'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorState {
  hasError: boolean;
  error: ApiError | null;
}

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  AUTH_REQUIRED: 'Authentication required. Please log in.',
  AUTH_INVALID: 'Invalid credentials. Please try again.',
  AUTH_EXPIRED: 'Your session has expired. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  RATE_LIMIT: 'Too many requests. Please wait a moment.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
};

