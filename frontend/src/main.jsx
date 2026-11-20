import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import { initAnalytics } from './utils/analytics.js';

initAnalytics();

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si la página llegó prerenderizada (HTML ya armado al compilar), React "se engancha" a ese
// contenido en lugar de dibujarlo de nuevo. En desarrollo (npm run dev) el #root llega vacío.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
