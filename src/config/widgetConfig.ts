export interface WidgetConfig {
  siteKey?: string;
  apiBaseUrl?: string;
  socketUrl?: string;
}

export const getWidgetConfig = (): WidgetConfig => {
  const scriptTag = document.currentScript as HTMLScriptElement;

  const apiBaseUrl =
    scriptTag?.dataset.dadachatApiBase || "http://localhost:4000";

  return {
    siteKey:
      scriptTag?.dataset.dadachatSiteKey ||
      "67cf9dd7-564a-4f89-a038-95c89230a66f",
    apiBaseUrl,
    socketUrl: apiBaseUrl,
  };
};
