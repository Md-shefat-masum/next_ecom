"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentUser, selectAuthInitialized } from "@/store/slices/authSlice";

/**
 * Bootstraps auth state on app load by calling /auth/me if a token cookie exists.
 * Mount once inside SiteLayout (or the root layout).
 */
export function AuthSync() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchCurrentUser());
    }
  }, [initialized, dispatch]);

  return null;
}

export default AuthSync;
