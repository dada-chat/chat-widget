import "./bootstrapWidget";

import React from "react";
import ReactDOM from "react-dom/client";
import { WidgetApp } from "./widgetApp";

const root = document.createElement("div");
root.id = "__dadachat_widget_root__";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <WidgetApp />
  </React.StrictMode>
);
