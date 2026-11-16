import LANDINGS from './landings.js';

// Datos de SEO de cada página. Los usan dos lugares:
//  · RouteSeo.jsx → cambia el título y las etiquetas al navegar dentro del sitio
//  · scripts/prerender.mjs → las escribe en el HTML de cada página al compilar, para que
//    Google, WhatsApp, Facebook y LinkedIn (que no ejecutan JavaScript) las lean directo.

// Dominio de producción: canonical, og:url y la imagen de la vista previa son siempre de aquí.
export const SITE = 'https://www.metexsab.com';

// Imagen de la vista previa por defecto (1200×630)
const DEFAULT_IMAGE = `${SITE}/img/og-image.png`;

export const PAGES = {
  '/': {
    title: 'Metexsab | Aditivos Alimentarios para la Industria Láctea – Querétaro, México',
    description:
      'Proveedor especializado en aditivos alimentarios para la industria láctea en México. Saborizantes, estabilizantes, texturizantes y gomas para quesos, yogur, helados y bebidas.',
    image: DEFAULT_IMAGE,
  },
  '/productos': {
    title: 'Productos | Saborizantes, Estabilizantes y Texturizantes para Lácteos – Metexsab',
    description:
      'Catálogo de saborizantes, estabilizantes, texturizantes, colorantes y auxiliares de proceso para quesos, cremas, yogurt, helados, bebidas y postres. Solicita muestras gratuitas.',
    image: DEFAULT_IMAGE,
  },
  '/nosotros': {
    title: 'Nosotros | Metexsab – Mexicana de Textura y Sabor, Querétaro',
    description:
      'Mexicana de Textura y Sabor, empresa queretana fundada en 2007. Ingredientes de calidad, soluciones a la medida y servicio eficiente para la industria alimentaria mexicana.',
    image: DEFAULT_IMAGE,
  },
};

// Las páginas por tema (data/landings.js) traen su propio título, descripción e imagen
// (public/img/og/{slug}.jpg, se genera una por página).
LANDINGS.forEach((l) => {
  PAGES[`/${l.slug}`] = {
    title: l.title,
    description: l.description,
    image: `${SITE}/img/og/${l.slug}.jpg`,
  };
});

// "/productos/" y "/productos" son la misma página
export const normalizePath = (pathname) => pathname.replace(/\/+$/, '') || '/';

export const pageFor = (pathname) => PAGES[normalizePath(pathname)] || PAGES['/'];
export const urlFor = (pathname) => {
  const path = normalizePath(pathname);
  return `${SITE}${path === '/' ? '/' : path}`;
};

// Texto corto de una página por tema ("Saborizantes para quesos"), para enlaces y migas de pan
export const landingLabel = (l) => l.h1.join(' ').replace(/^./, (c) => c.toUpperCase());

// Datos estructurados: ruta de navegación Inicio > Productos > esta página
export const breadcrumbFor = (l) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Productos', item: `${SITE}/productos` },
    { '@type': 'ListItem', position: 3, name: landingLabel(l), item: `${SITE}/${l.slug}` },
  ],
});

// Rutas que se prerenderizan: inicio, productos, nosotros y las páginas por tema
export const ROUTES = Object.keys(PAGES);
