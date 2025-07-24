import { ErrorBoundary } from "react-error-boundary";

export function ErrorBoundaryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        return (
          <div>
            <p>{error.message}</p>
            <button onClick={() => resetErrorBoundary()}>Retry</button>
          </div>
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
