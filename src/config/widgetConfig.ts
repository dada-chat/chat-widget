export interface WidgetConfig {
  siteKey?: string;
  apiBaseUrl?: string;
}

export const getWidgetConfig = (): WidgetConfig => {
  const scriptTag = document.currentScript as HTMLScriptElement;

  return {
    siteKey:
      scriptTag?.dataset.dadachatSiteKey ||
      "67cf9dd7-564a-4f89-a038-95c89230a66f",
    apiBaseUrl:
      scriptTag?.dataset.dadachatApiBase || "http://localhost:4000/api",
  };
};
