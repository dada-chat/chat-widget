import type { WidgetConfig } from "./widgetConfig";

export const getRuntimeConfig = (): WidgetConfig => {
  const config = (window as any).__DADACHAT_CONFIG__;

  if (!config) {
    console.error("[Dadachat] Runtime config not initialized.");
  }

  return config;
};
