import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppShell, ROUTER_BASENAME } from './App.jsx';

// Datos que necesita scripts/prerender.mjs (el build del servidor sale en un solo archivo)
export { PAGES, ROUTES, SITE, landingLabel, breadcrumbFor } from './data/seo.js';
export { default as LANDINGS } from './data/landings.js';

// Punto de entrada del prerender (se compila con `vite build --ssr`; lo usa scripts/prerender.mjs).
// Devuelve el HTML de la página que corresponde a una ruta, por ejemplo "/productos".
export function render(path) {
  return renderToString(
    <StaticRouter basename={ROUTER_BASENAME} location={`${ROUTER_BASENAME}${path}`}>
      <AppShell />
    </StaticRouter>
  );
}
