import { Link } from 'react-router-dom';
import { ArrowRight, Flask, CaretRight } from '@phosphor-icons/react';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';
import LANDINGS from '../data/landings.js';
import { landingLabel } from '../data/seo.js';

// Las páginas por tema que más buscan (se muestran para que quien llegó a un enlace roto siga explorando)
const POPULAR = ['saborizantes-para-quesos', 'texturizantes-para-quesos', 'aditivos-para-yogurt', 'aditivos-para-helados'];

const WA = `https://wa.me/524422794146/?text=${encodeURIComponent('Hola, no encontré una página en su sitio y me gustaría hablar de mi proyecto')}`;

// Página que se muestra cuando la dirección no existe. El servidor (Apache) la entrega con código 404
// (ver ErrorDocument en public/.htaccess) para que Google no la tome como una página válida.
function NotFound() {
  const links = POPULAR.map((slug) => LANDINGS.find((l) => l.slug === slug)).filter(Boolean);

  return (
    <section className="page-section not-found">
      <div className="contenedor">
        <div className="not-found-code" aria-hidden="true">
          <span>4</span>
          <Flask weight="fill" className="not-found-flask" />
          <span>4</span>
        </div>
        <div className="section-badge">Error 404</div>
        <h1>Esta fórmula no existe</h1>
        <p>
          No encontramos la página que buscas: puede que la dirección esté mal escrita o que ya no exista.
          Aquí tienes por dónde seguir.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            Ir al inicio <ArrowRight size={20} weight="bold" />
          </Link>
          <Link to="/productos" className="btn-secondary">
            Ver productos
          </Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-secondary not-found-wa">
            <WhatsAppIcon size={20} /> Hablemos de tu proyecto
          </a>
        </div>

        {links.length > 0 && (
          <div className="not-found-popular">
            <p className="not-found-popular-title">Lo que más buscan</p>
            <ul>
              {links.map((l) => (
                <li key={l.slug}>
                  <Link to={`/${l.slug}`}>
                    {landingLabel(l)} <CaretRight size={16} weight="bold" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default NotFound;
