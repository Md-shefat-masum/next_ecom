export * from './constants';
export * from './routes';
export * from './api';
export * from './validation';
export * from './theme';
export * from './features';
export * from './seo';
export * from './storage';

// Main config object
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  appName: 'BMEStore',
  appVersion: '1.0.0',
  accessTokenName: 'access_token',
  refreshTokenName: 'refresh_token',
  tokenExpiresIn: 15 * 60 * 1000, // 15 minutes
  refreshTokenExpiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
    timeout: 30000,
  },
  auth: {
    tokenKey: 'access_token',
    refreshTokenKey: 'refresh_token',
  },
};

export default config;
