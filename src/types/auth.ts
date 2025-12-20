export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  address?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string;
  password?: string;
  password_confirmation?: string;
}

