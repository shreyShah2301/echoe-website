import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import './styles/tokens.css';
import App from './App.jsx';

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);
