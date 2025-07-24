import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainPage } from "./pages/main-page.tsx";
import { ErrorBoundaryProvider } from "./providers/error-boundary-provider.tsx";
import { QueryProvider } from "./providers/query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundaryProvider>
      <QueryProvider>
        <MainPage />
      </QueryProvider>
    </ErrorBoundaryProvider>
  </StrictMode>
);
