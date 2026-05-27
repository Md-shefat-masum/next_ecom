"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCurrentUser,
  selectAuthInitialized,
  selectAuthLoading,
  selectAuthUser,
  selectIsLoggedIn,
} from "@/store/slices/authSlice";

/**
 * Returns the current auth state and initialises it on first render.
 * Safe to call in any client component.
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectAuthLoading);
  const initialized = useAppSelector(selectAuthInitialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchCurrentUser());
    }
  }, [initialized, dispatch]);

  return { user, isLoggedIn, isLoading, initialized };
}

export default useAuth;
