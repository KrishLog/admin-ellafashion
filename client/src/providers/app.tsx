import Button from '@mui/material/Button/Button';
import { QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { queryClient } from '../common/queryClient';
const ErrorFallback = () => {
  return (
    <div className="text-red-500 w-screen h-screen flex flex-col justify-center items-center" role="alert">
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <React.Suspense fallback={<div className="flex items-center justify-center w-screen h-screen">Loading</div>}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router>{children}</Router>
        </ErrorBoundary>
      </React.Suspense>
    </QueryClientProvider>
  );
};
