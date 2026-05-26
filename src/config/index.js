export * from "./api";
export * from "./constants";
export * from "./routes";

export const appConfig = {
  name: "BME",
  version: "0.1.0",
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1",
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 30000),
  },
  auth: {
    accessTokenKey: "access_token",
    refreshTokenKey: "refresh_token",
  },
};

export default appConfig;

