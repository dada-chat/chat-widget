import axios from "axios";
import { getRuntimeConfig } from "../config/runtimeConfig";

const config = getRuntimeConfig();

export const widgetApi = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "x-site-key": config.siteKey,
  },
});
