import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageFor, urlFor, isKnownPath } from '../data/seo.js';

// Al navegar dentro del sitio, actualiza el título y las etiquetas de la página.
// (La primera carga ya trae las etiquetas correctas porque se prerenderizan al compilar;
// esto cubre los cambios de página sin recargar.)

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Dirección que no existe: título propio y fuera de los buscadores (el HTML ya llega con noindex)
    if (!isKnownPath(pathname)) {
      document.title = 'Página no encontrada | Metexsab';
      return;
    }

    const page = pageFor(pathname);
    const url = urlFor(pathname);

    document.title = page.title;
    setMeta('meta[name="description"]', 'content', page.description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:title"]', 'content', page.title);
    setMeta('meta[property="og:description"]', 'content', page.description);
    setMeta('meta[property="og:image"]', 'content', page.image);
  }, [pathname]);

  return null;
}

export default RouteSeo;
