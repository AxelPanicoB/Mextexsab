import { Link } from 'react-router-dom';
import { Gift, ArrowRight } from '@phosphor-icons/react';

// Banda de llamado a la acción: lleva al visitante al catálogo a elegir muestras.
// El panel "Solicitud de muestras" exige al menos un producto, por eso no abre el panel vacío.
function SamplesCta() {
  return (
    <section className="samples-cta reveal-section">
      <div className="contenedor samples-cta-inner">
        <span className="samples-cta-icon" aria-hidden="true">
          <Gift size={44} weight="regular" />
        </span>
        <div className="samples-cta-copy">
          <h2>Prueba antes de comprar</h2>
          <p>
            Elige los productos que te interesan y te enviamos muestras
            gratuitas para que las pruebes en tu producción.
          </p>
        </div>
        <Link to="/productos" className="samples-cta-btn">
          Solicitar muestras gratuitas <ArrowRight size={22} weight="bold" />
        </Link>
      </div>
    </section>
  );
}

export default SamplesCta;
