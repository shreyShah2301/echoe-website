import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import './styles/tokens.css';
import App from './App.jsx';

hydrateRoot(
  document.getElementById('app'),
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);
