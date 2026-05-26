import { API_ENDPOINTS } from "@/config";
import { api } from "@/lib/api/client";

export const configService = {
  getConfig: () => api.get(API_ENDPOINTS.CONFIG.ALL),
  getCurrency: () => api.get(API_ENDPOINTS.CONFIG.CURRENCY),
  getFeatures: () => api.get(API_ENDPOINTS.CONFIG.FEATURES),
};

