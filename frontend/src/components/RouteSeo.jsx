import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Dominio de producción: se usa para el canonical y og:url de cada página.
const SITE = 'https://www.metexsab.com';

// Título y descripción propios de cada ruta (Google los lee por separado).
// "/" repite lo que ya trae index.html para volver a él al regresar al inicio.
const PAGES = {
  '/': {
    title: 'Metexsab | Aditivos Alimentarios para la Industria Láctea – Querétaro, México',
    description:
      'Proveedor especializado en aditivos alimentarios para la industria láctea en México. Saborizantes, estabilizantes, texturizantes y gomas para quesos, yogur, helados y bebidas.',
  },
  '/productos': {
    title: 'Productos | Saborizantes, Estabilizantes y Texturizantes para Lácteos – Metexsab',
    description:
      'Catálogo de saborizantes, estabilizantes, texturizantes, colorantes y auxiliares de proceso para quesos, cremas, yogurt, helados, bebidas y postres. Solicita muestras gratuitas.',
  },
  '/nosotros': {
    title: 'Nosotros | Metexsab – Mexicana de Textura y Sabor, Querétaro',
    description:
      'Mexicana de Textura y Sabor, empresa queretana fundada en 2007. Ingredientes de calidad, soluciones a la medida y servicio eficiente para la industria alimentaria mexicana.',
  },
};

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/';
    const page = PAGES[path] || PAGES['/'];
    const url = `${SITE}${path === '/' ? '/' : path}`;

    document.title = page.title;
    setMeta('meta[name="description"]', 'content', page.description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:title"]', 'content', page.title);
    setMeta('meta[property="og:description"]', 'content', page.description);
  }, [pathname]);

  return null;
}

export default RouteSeo;
