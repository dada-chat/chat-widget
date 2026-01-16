export interface WidgetConfig {
  siteKey: string;
  apiBaseUrl: string;
  socketUrl: string;
}

export const getWidgetConfig = (): WidgetConfig | null => {
  const script = document.querySelector(
    'script[src*="widget.js"][data-dadachat-site-key]'
  ) as HTMLScriptElement | null;

  if (!script) {
    console.error("[Dadachat] Widget script tag not found.");
    return null;
  }

  const siteKey = script.dataset.dadachatSiteKey;

  if (!siteKey) {
    console.error("[Dadachat] data-dadachat-site-key is required.");
    return null;
  }

  const isLocal =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";

  const DEFAULT_API_BASE = isLocal
    ? "http://localhost:4000"
    : "https://dadachat-backend.onrender.com";

  const apiBaseUrl = DEFAULT_API_BASE;

  const socketUrl = apiBaseUrl;

  return {
    siteKey,
    apiBaseUrl,
    socketUrl,
  };
};
