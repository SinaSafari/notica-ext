import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainPage } from "./pages/main-page.tsx";
import { ErrorBoundaryProvider } from "./providers/error-boundary-provider.tsx";
import { QueryProvider } from "./providers/query-provider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundaryProvider>
      <GoogleOAuthProvider clientId="802502124913-lmcbd36kefahsfmqjhk64e29b4mn0bfc.apps.googleusercontent.com">
        <QueryProvider>
          <MainPage />
        </QueryProvider>
      </GoogleOAuthProvider>
    </ErrorBoundaryProvider>
  </StrictMode>
);
