import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const LEVEL_LABELS = ['', 'Baja', 'Media', 'Alta', 'Muy alta', 'Óptima'];

function MetricRow({ label, level }) {
  return (
    <div className="metric-row">
      <span className="metric-name">{label}</span>
      <div className="metric-dots" aria-label={`${label}: ${LEVEL_LABELS[level]}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`metric-dot${i <= level ? ' filled' : ''}`} />
        ))}
      </div>
      <span className="metric-level">{LEVEL_LABELS[level]}</span>
    </div>
  );
}

function FlavorsModal({ product, onClose }) {
  const { add, updateFlavors, inCart, getItem } = useCart();
  const alreadyInCart = inCart(product.id);
  const cartItem = getItem(product.id);
  const [selected, setSelected] = useState(
    () => (cartItem && cartItem.selectedFlavors) ? [...cartItem.selectedFlavors] : []
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const toggle = (f) =>
    setSelected((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const handleAdd = () => {
    if (alreadyInCart) {
      updateFlavors(product.id, selected);
    } else {
      add(product, selected);
    }
    onClose();
  };

  return createPortal(
    <div className="flavors-modal-overlay" onClick={onClose}>
      <div className="flavors-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flavors-modal-header">
          <div>
            <p className="flavors-modal-eyebrow">
              <i className="fa-solid fa-flask"></i>
              Perfiles disponibles
            </p>
            <h4>{product.name}</h4>
          </div>
          <button
            type="button"
            className="flavors-modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <p className="flavors-modal-select-hint">
          Selecciona los perfiles de tu interés:
        </p>
        <div className="flavors-modal-chips">
          {product.flavors.map((f) => (
            <span
              key={f}
              className={selected.includes(f) ? 'selected' : ''}
              onClick={() => toggle(f)}
              role="checkbox"
              aria-checked={selected.includes(f)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggle(f)}
            >
              {selected.includes(f) && <i className="fa-solid fa-check" style={{ marginRight: '5px', fontSize: '0.75em' }} />}
              {f}
            </span>
          ))}
        </div>
        <button type="button" className="flavors-modal-add-btn" onClick={handleAdd}>
          {alreadyInCart
            ? selected.length > 0
              ? `Actualizar ${selected.length} perfil${selected.length > 1 ? 'es' : ''} en consulta`
              : 'Guardar sin perfil específico'
            : selected.length > 0
              ? `Agregar ${selected.length} perfil${selected.length > 1 ? 'es' : ''} a la consulta`
              : 'Agregar sin perfil específico'
          }
        </button>
        <p className="flavors-modal-note">
          <i className="fa-solid fa-circle-info"></i>
          ¿No ves lo que buscas? Escríbenos y con gusto te ayudamos a encontrar el perfil ideal para tu proceso.
        </p>
      </div>
    </div>,
    document.body
  );
}

const BASE = import.meta.env.BASE_URL;

function ProductCard({ product }) {
  const { add, remove, inCart } = useCart();
  const selected = inCart(product.id);
  const [showFlavors, setShowFlavors] = useState(false);

  return (
    <>
      <article className={`solution-card${selected ? ' solution-card--selected' : ''}`}>
        <div className="solution-card-img">
          {product.image && (
            <img src={`${BASE}${product.image.replace(/^\//, '').split('/').map(encodeURIComponent).join('/')}`} alt={product.name} loading="lazy" />
          )}
          <span className="solution-badge">{product.functional || product.category}</span>
        </div>

        <div className="solution-card-body">
          {product.applications && product.applications.length > 0 && (
            <p className="solution-app">
              <i className="fa-solid fa-circle-dot"></i>
              {product.applications.join(' · ')}
            </p>
          )}

          <h3>{product.name}</h3>
          <p className="solution-summary">{product.summary}</p>

          {product.metrics && product.metrics.length > 0 && (
            <div className="solution-metrics">
              <p className="metrics-header">
                <i className="fa-solid fa-chart-simple"></i>
                Propiedades funcionales
              </p>
              {product.metrics.map((m) => (
                <MetricRow key={m.label} label={m.label} level={m.level} />
              ))}
            </div>
          )}

          {product.flavors && product.flavors.length > 0 && (
            <button
              type="button"
              className="btn-flavors-toggle"
              onClick={() => setShowFlavors(true)}
            >
              <span>
                <i className="fa-solid fa-flask"></i>
                {' '}Ver {product.flavors.length} perfiles disponibles
              </span>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}

          <div className="solution-actions">
            <button
              className={selected ? 'btn-solution-remove' : 'btn-solution-add'}
              onClick={() => (selected ? remove(product.id) : add(product))}
            >
              {selected ? (
                <><i className="fa-solid fa-check"></i> En consulta</>
              ) : (
                <><i className="fa-solid fa-vial"></i> Solicitar muestra</>
              )}
            </button>
            <Link className="btn-solution-contact" to="/contacto">
              Ficha técnica <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </Link>
          </div>
        </div>
      </article>

      {showFlavors && (
        <FlavorsModal product={product} onClose={() => setShowFlavors(false)} />
      )}
    </>
  );
}

export default ProductCard;
