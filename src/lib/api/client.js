import { API_BASE_URL, API_TIMEOUT, TOKEN_KEYS } from "@/config";

function getCookie(name) {
  if (typeof document === "undefined") return null;

  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] || null
  );
}

function clearAuthCookies() {
  if (typeof document === "undefined") return;

  document.cookie = `${TOKEN_KEYS.ACCESS}=; Max-Age=0; path=/`;
  document.cookie = `${TOKEN_KEYS.REFRESH}=; Max-Age=0; path=/`;
}

async function request(url, options = {}, hasRetried = false) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);
  const token = getCookie(TOKEN_KEYS.ACCESS);

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (response.status === 401 && !hasRetried) {
      clearAuthCookies();

      if (typeof window !== "undefined") {
        window.location.assign("/login");
      }
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(data?.message || "API request failed");
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } finally {
    clearTimeout(timeout);
  }
}

export const api = {
  get: (url, config) => request(url, { method: "GET", ...config }),
  post: (url, data, config) =>
    request(url, { method: "POST", body: JSON.stringify(data), ...config }),
  put: (url, data, config) =>
    request(url, { method: "PUT", body: JSON.stringify(data), ...config }),
  patch: (url, data, config) =>
    request(url, { method: "PATCH", body: JSON.stringify(data), ...config }),
  delete: (url, config) => request(url, { method: "DELETE", ...config }),
};

export default api;
