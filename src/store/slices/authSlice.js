"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN_KEYS } from "@/config";

function readTokenCookie() {
  if (typeof document === "undefined") return null;
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${TOKEN_KEYS.ACCESS}=`))
      ?.split("=")[1] || null
  );
}

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    const token = readTokenCookie();
    if (!token) return rejectWithValue("No token");

    try {
      const { API_BASE_URL } = await import("@/config");
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) return rejectWithValue("Unauthorized");
      const data = await res.json();
      return data.data?.user ?? data.data ?? null;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    initialized: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
      state.initialized = true;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.initialized = true;
        state.user = action.payload;
        state.isLoggedIn = !!action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.initialized = true;
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuthUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthInitialized = (state) => state.auth.initialized;
export const selectAuthLoading = (state) => state.auth.isLoading;
