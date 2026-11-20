import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

// Página que se muestra cuando la dirección no existe. El servidor (Apache) la entrega con código 404
// (ver ErrorDocument en public/.htaccess) para que Google no la tome como una página válida.
function NotFound() {
  return (
    <section className="page-section not-found">
      <div className="contenedor">
        <div className="section-badge">Error 404</div>
        <h1>No encontramos esta página</h1>
        <p>
          Puede que la dirección esté mal escrita o que la página ya no exista.
          Puedes volver al inicio o ver nuestro catálogo de productos.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            Ir al inicio <ArrowRight size={20} weight="bold" />
          </Link>
          <Link to="/productos" className="btn-secondary">
            Ver productos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
