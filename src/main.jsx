
// src/main.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App'; // ✅ This must be imported
import './index.css';

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </BrowserRouter>
);

