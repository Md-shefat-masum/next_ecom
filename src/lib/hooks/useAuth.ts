'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser, setLoading, logout as logoutAction } from '@/store/slices/authSlice';
import { authService } from '@/lib/api/services';
import { config } from '@/config';
import { LoginRequest, RegisterRequest, UpdateProfileRequest } from '@/types';

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get(config.auth.tokenKey);
      if (token) {
        try {
          const response = await authService.me();
          dispatch(setUser(response.data));
        } catch {
          Cookies.remove(config.auth.tokenKey);
          Cookies.remove(config.auth.refreshTokenKey);
          dispatch(setUser(null));
        }
      } else {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  const login = useCallback(async (data: LoginRequest) => {
    dispatch(setLoading(true));
    try {
      const response = await authService.login(data);
      const { token, refresh_token, user } = response.data;
      
      Cookies.set(config.auth.tokenKey, token, { expires: 1 });
      if (refresh_token) {
        Cookies.set(config.auth.refreshTokenKey, refresh_token, { expires: 7 });
      }
      
      dispatch(setUser(user));
      router.push('/dashboard');
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      throw error;
    }
  }, [dispatch, router]);

  const register = useCallback(async (data: RegisterRequest) => {
    dispatch(setLoading(true));
    try {
      const response = await authService.register(data);
      const { token, refresh_token, user } = response.data;
      
      Cookies.set(config.auth.tokenKey, token, { expires: 1 });
      if (refresh_token) {
        Cookies.set(config.auth.refreshTokenKey, refresh_token, { expires: 7 });
      }
      
      dispatch(setUser(user));
      router.push('/dashboard');
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      throw error;
    }
  }, [dispatch, router]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore logout errors
    } finally {
      Cookies.remove(config.auth.tokenKey);
      Cookies.remove(config.auth.refreshTokenKey);
      dispatch(logoutAction());
      router.push('/login');
    }
  }, [dispatch, router]);

  const updateProfile = useCallback(async (data: UpdateProfileRequest) => {
    const response = await authService.updateProfile(data);
    dispatch(setUser(response.data));
    return response;
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };
}

export default useAuth;

