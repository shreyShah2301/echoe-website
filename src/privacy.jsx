import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import './styles/tokens.css';
import PrivacyPage from './components/Privacy.jsx';

hydrateRoot(
  document.getElementById('app'),
  <StrictMode>
    <PrivacyPage />
    <Analytics />
  </StrictMode>
);
