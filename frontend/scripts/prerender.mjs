// Prerender: genera un HTML por página al compilar (npm run build).
//
// ¿Por qué? El sitio es una app de React: sin esto, cada dirección entrega el mismo HTML vacío y el
// contenido y las etiquetas aparecen cuando corre el JavaScript. Google lo ejecuta (con retraso), pero
// WhatsApp, Facebook, LinkedIn y X NO: todas las ligas compartidas mostraban la vista previa del inicio.
// Con este paso, cada página sale con su título, descripción, imagen y contenido ya escritos.
//
// Flujo (lo dispara "npm run build"):
//   1. vite build                              → dist/ (el sitio normal)
//   2. vite build --ssr src/entry-server.jsx   → dist-ssr/ (la app para renderizar en Node)
//   3. este script: renderiza cada ruta y escribe su HTML en dist/
//
// Archivos que genera (no hay que tocarlos a mano):
//   dist/index.html                  ← inicio
//   dist/productos.html, dist/nosotros.html, dist/saborizantes-para-quesos.html, ...
// GitHub Pages sirve /productos desde productos.html; en Apache lo hace la regla del .htaccess.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const distSsr = path.join(root, 'dist-ssr');

const { render, PAGES, ROUTES, SITE, landingLabel, breadcrumbFor, LANDINGS } = await import(
  pathToFileURL(path.join(distSsr, 'entry-server.js')).href
);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Cambia una etiqueta del <head>. Si no la encuentra, el build falla (así nunca se queda una
// página con la vista previa equivocada sin que nos demos cuenta).
function replaceOnce(html, regex, replacement, label) {
  if (!regex.test(html)) throw new Error(`prerender: no encontré ${label} en index.html`);
  return html.replace(regex, () => replacement);
}

function buildPage(route) {
  const page = PAGES[route];
  const url = `${SITE}${route === '/' ? '/' : route}`;
  let html = template;

  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`, '<title>');
  html = replaceOnce(html, /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(page.description)}" />`, 'meta description');
  html = replaceOnce(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`, 'canonical');
  html = replaceOnce(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`, 'og:url');
  html = replaceOnce(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(page.title)}" />`, 'og:title');
  html = replaceOnce(html, /<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${esc(page.description)}" />`, 'og:description');
  html = replaceOnce(html, /<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${page.image}" />`, 'og:image');

  // migas de pan (datos estructurados) en las páginas por tema
  const landing = LANDINGS.find((l) => `/${l.slug}` === route);
  if (landing) {
    const ld = `<script type="application/ld+json" data-landing="breadcrumb">${JSON.stringify(breadcrumbFor(landing))}</script>\n  </head>`;
    html = replaceOnce(html, /<\/head>/, ld, '</head>');
  }

  // contenido de la página dentro de #root
  const body = render(route);
  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${body}</div>`, '<div id="root">');
  return { html, bytes: body.length, label: landing ? landingLabel(landing) : route };
}

let count = 0;
for (const route of ROUTES) {
  const { html, bytes } = buildPage(route);
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, file), html);
  console.log(`  ✓ ${file.padEnd(40)} ${(bytes / 1024).toFixed(0).padStart(4)} KB de contenido`);
  count++;
}

// 404.html: la página de "no encontrado". Apache la entrega con código 404 (ErrorDocument del .htaccess)
// y GitHub Pages la usa para cualquier dirección que no existe. Va con noindex y sin canonical.
{
  const route = '/pagina-no-encontrada'; // no existe en el sitio: el enrutador cae en la ruta "*"
  let html = template;
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, '<title>Página no encontrada | Metexsab</title>', '<title>');
  html = replaceOnce(html, /<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow" />', 'meta robots');
  html = replaceOnce(html, /<link rel="canonical"[^>]*>\s*/, '', 'canonical');
  html = replaceOnce(html, /<meta property="og:url"[^>]*>\s*/, '', 'og:url');
  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${render(route)}</div>`, '<div id="root">');
  fs.writeFileSync(path.join(dist, '404.html'), html);
  console.log('  ✓ 404.html (página de error, noindex)');
}

fs.rmSync(distSsr, { recursive: true, force: true });
console.log(`prerender: ${count} páginas generadas.`);
