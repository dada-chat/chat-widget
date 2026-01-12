export interface WidgetConfig {
  siteKey?: string;
  apiBaseUrl?: string;
}

export const getWidgetConfig = (): WidgetConfig => {
  const scriptTag = document.currentScript as HTMLScriptElement;

  return {
    siteKey:
      scriptTag?.dataset.dadachatSiteKey ||
      "e5a76b7c-58f4-4f82-af5a-4047e2fcca4e",
    apiBaseUrl:
      scriptTag?.dataset.dadachatApiBase || "http://localhost:4000/api",
  };
};
