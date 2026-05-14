import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import './styles/tokens.css';
import PrivacyPage from './components/Privacy.jsx';

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <PrivacyPage />
    <Analytics />
  </StrictMode>
);
