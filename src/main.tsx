import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainPage } from "./pages/main-page.tsx";
import { ErrorBoundaryProvider } from "./providers/error-boundary-provider.tsx";
import { QueryProvider } from "./providers/query-provider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./assets/fonts/peyda/woff2/PeydaWebFaNum-Black.woff2";
import "./assets/fonts/peyda/woff2/PeydaWebFaNum-Bold.woff2";
import "./assets/fonts/peyda/woff2/PeydaWebFaNum-ExtraBold.woff2";
import "./assets/fonts/peyda/woff2/PeydaWebFaNum-ExtraLight.woff2";
import "./assets/fonts/peyda/woff2/PeydaWebFaNum-Light.woff2";
import "./assets/fonts/peyda/woff2/PeydaWebFaNum-Medium.woff2";
import "./assets/fonts/peyda/woff2/PeydaWebFaNum-Regular.woff2";
import "./assets/fonts/peyda/woff2/PeydaWebFaNum-SemiBold.woff2";
import "./assets/fonts/peyda/woff2/PeydaWebFaNum-Thin.woff2";

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
