import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import { ToastProvider } from './components/Toast/ToastManager';
import { LoadingProvider } from './components/Loading/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </ToastProvider>
);
