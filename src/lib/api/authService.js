import api from "./client";
import { TOKEN_KEYS } from "@/config";

function setTokenCookie(name, value, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function clearTokenCookies() {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_KEYS.ACCESS}=; Max-Age=0; path=/`;
  document.cookie = `${TOKEN_KEYS.REFRESH}=; Max-Age=0; path=/`;
}

export const authService = {
  async login(email, password) {
    const data = await api.post("/auth/login", { email, password });
    const token = data.data?.token ?? data.token;
    if (token) {
      setTokenCookie(TOKEN_KEYS.ACCESS, token);
    }
    return data;
  },

  async register(name, email, password, passwordConfirmation) {
    const data = await api.post("/auth/register", {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    const token = data.data?.token ?? data.token;
    if (token) {
      setTokenCookie(TOKEN_KEYS.ACCESS, token);
    }
    return data;
  },

  async logout() {
    try {
      await api.post("/auth/logout", {});
    } finally {
      clearTokenCookies();
    }
  },

  async me() {
    const data = await api.get("/auth/me");
    return data.data?.user ?? data.data ?? null;
  },
};

export default authService;
