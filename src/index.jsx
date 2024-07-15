import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import { ToastProvider } from './components/Toast/ToastProvider';
import { LoadingProvider } from './components/Spinner/LoadingProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider>
    <LoadingProvider>
      <div className='container-layout'>
        <App />
      </div>
    </LoadingProvider>
  </ToastProvider>
);