import React from 'react';
import './App.css';
import { AppProvider } from './providers/app';
import { AppRoutes } from './router';
function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
