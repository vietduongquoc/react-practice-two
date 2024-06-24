import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import { ToastProvider } from './components/Toast/ToastManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider>
    <App />
  </ToastProvider>
);
