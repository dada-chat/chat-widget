import axios from "axios";
import { getWidgetConfig } from "../config/widgetConfig";

const config = getWidgetConfig();

export const widgetApi = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "x-site-key": config.siteKey,
  },
});
