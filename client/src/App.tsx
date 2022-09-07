import React from 'react';
import { AppRoutes } from './router';
import { AppProvider } from './providers/app';
import './App.css';
function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
