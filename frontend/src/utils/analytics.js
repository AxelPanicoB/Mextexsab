// Medición con Google Tag Manager (GTM): una sola etiqueta en el sitio, y desde el panel de GTM se
// conectan Google Analytics 4, el Pixel de Meta, Google Ads, etc. sin volver a publicar el sitio.
//
// Está APAGADO mientras no exista VITE_GTM_ID (por ejemplo, en frontend/.env.local: VITE_GTM_ID=GTM-XXXXXXX).
// Sin ese ID no se carga ningún script externo ni se guarda nada del visitante.
//
// Solo mide el sitio real (metexsab.com). El contenedor es el de producción, así que en nuevo.metexsab.com,
// localhost y GitHub Pages NO se carga: las visitas y los envíos de prueba no ensucian los datos.
// Única excepción: la "Vista previa" de Tag Manager (agrega ?gtm_debug=... a la dirección), para poder
// probar las etiquetas en el sitio de pruebas.
//
// Eventos que el sitio envía a GTM (dataLayer):
//   generate_lead   → un formulario se envió bien (form: 'contacto' | 'inicio' | 'muestras')
//   whatsapp_click  → clic a un enlace de WhatsApp

const GTM_ID = import.meta.env.VITE_GTM_ID;
const PRODUCTION_HOSTS = ['www.metexsab.com', 'metexsab.com'];

function enabled() {
  if (!GTM_ID || typeof window === 'undefined') return false;
  return PRODUCTION_HOSTS.includes(window.location.hostname) || /[?&]gtm_debug=/.test(window.location.search);
}

export function track(event, params = {}) {
  if (!enabled()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function initAnalytics() {
  if (!enabled() || window.__gtmLoaded) return;
  window.__gtmLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);

  // Un solo escuchador para todos los enlaces de WhatsApp del sitio
  document.addEventListener('click', (e) => {
    const link = e.target instanceof Element ? e.target.closest('a[href*="wa.me"]') : null;
    if (link) track('whatsapp_click');
  });
}
