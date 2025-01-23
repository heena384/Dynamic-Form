import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { ConfigProvider } from "antd";
import locale from "antd/es/locale/en_US";

import "./index.css";
import App from "./pages/App";

dayjs.locale("en");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
