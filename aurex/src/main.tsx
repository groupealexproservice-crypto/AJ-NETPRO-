import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { TRPCProvider } from "./providers/trpc";
import { LanguageProvider } from "./i18n";
import "./index.css";
import App from "./App";

// No service worker: pages are server-rendered per language and portals must never be served from a cache.
if ("serviceWorker" in navigator) {
  void navigator.serviceWorker.getRegistrations().then((registrations) => registrations.forEach((r) => void r.unregister()));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TRPCProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </TRPCProvider>
    </BrowserRouter>
  </StrictMode>,
);
