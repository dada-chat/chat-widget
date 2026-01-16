import { getWidgetConfig } from "./config/widgetConfig";

const config = getWidgetConfig();

if (!config) {
  console.error("[Dadachat] Widget initialization failed.");
} else {
  // 전역 고정
  (window as any).__DADACHAT_CONFIG__ = config;
}
