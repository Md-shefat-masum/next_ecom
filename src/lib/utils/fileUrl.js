import { appConfig } from "@/config";

const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL || "";
const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || appConfig.version;

export function getFileUrl(contentPath) {
  if (!contentPath) return "";

  if (contentPath.startsWith("http://") || contentPath.startsWith("https://")) {
    const separator = contentPath.includes("?") ? "&" : "?";
    return `${contentPath}${separator}v=${appVersion}`;
  }

  const cleanBaseUrl = fileBaseUrl.replace(/\/+$/, "");
  const cleanPath = contentPath.replace(/^\/+/, "");

  if (!cleanBaseUrl) {
    return `/${cleanPath}?v=${appVersion}`;
  }

  return `${cleanBaseUrl}/${cleanPath}?v=${appVersion}`;
}

