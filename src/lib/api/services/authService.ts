import { api } from '../client';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, UpdateProfileRequest, User } from '@/types';

export const authService = {
  login: (data: LoginRequest) => 
    api.post<ApiResponse<AuthResponse>>('/auth/login', data),

  register: (data: RegisterRequest) => 
    api.post<ApiResponse<AuthResponse>>('/auth/register', data),

  logout: () => 
    api.post<ApiResponse<null>>('/auth/logout'),

  refresh: () => 
    api.post<ApiResponse<{ token: string }>>('/auth/refresh'),

  me: () => 
    api.get<ApiResponse<User>>('/auth/me'),

  updateProfile: (data: UpdateProfileRequest) => 
    api.put<ApiResponse<User>>('/auth/profile', data),
};

export default authService;

