import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';
import { useContactModal } from '../context/ContactModalContext';
import {
  Flask, X, Check, CheckCircle, CircleNotch, CaretRight,
  TestTube, Info, Envelope, RadioButton,
} from '@phosphor-icons/react';
import WhatsAppIcon from './WhatsAppIcon.jsx';

const LEVEL_LABELS = ['', 'Baja', 'Media', 'Alta', 'Muy alta', 'Óptima'];
const LEVEL_PCT  = [0, 20, 40, 65, 85, 100];

function MetricRow({ label, level }) {
  return (
    <div className="metric-row">
      <span className="metric-name">{label}</span>
      <div className="metric-bar-track" aria-label={`${label}: ${LEVEL_LABELS[level]}`}>
        <span className="metric-bar-fill" style={{ width: `${LEVEL_PCT[level]}%` }} />
      </div>
      <span className="metric-level">{LEVEL_LABELS[level]}</span>
    </div>
  );
}

/* ── Toast global de confirmación ───────────────────────────────── */
let toastTimeout = null;
function showAddToast(name) {
  let el = document.getElementById('mtx-add-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'mtx-add-toast';
    document.body.appendChild(el);
  }
  el.innerHTML = `
    <span class="mtx-toast-icon">✓</span>
    <div class="mtx-toast-text">
      <strong>¡Agregado a tu carrito!</strong>
      <span>${name}</span>
      <span class="mtx-toast-hint">🎁 Revisa el botón de regalo para solicitar</span>
    </div>
  `;
  el.className = 'mtx-add-toast mtx-add-toast--in';
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    el.className = 'mtx-add-toast mtx-add-toast--out';
    setTimeout(() => { el.className = 'mtx-add-toast'; }, 400);
  }, 2200);
}

function FlavorsModal({ product, onClose, onContact }) {
  const { add, updateFlavors, inCart, getItem } = useCart();
  const alreadyInCart = inCart(product.id);
  const cartItem = getItem(product.id);
  const [selected, setSelected] = useState(
    () => (cartItem && cartItem.selectedFlavors) ? [...cartItem.selectedFlavors] : []
  );
  const [addState, setAddState] = useState(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const toggle = (f) =>
    setSelected((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const canSubmit = selected.length > 0;

  const handleAdd = () => {
    if (!canSubmit) return;
    setAddState('loading');
    setTimeout(() => {
      if (alreadyInCart) updateFlavors(product.id, selected);
      else add(product, selected);
      setAddState('success');
      showAddToast(product.name);
      setTimeout(() => onClose(), 700);
    }, 450);
  };

  return createPortal(
    <div className="flavors-modal-overlay" onClick={onClose}>
      <div className="flavors-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flavors-modal-header">
          <div>
            <p className="flavors-modal-eyebrow">
              <Flask size={21} weight="regular" />
              Sabores disponibles
            </p>
            <h4>{product.name}</h4>
          </div>
          <button type="button" className="flavors-modal-close" onClick={onClose} aria-label="Cerrar">
            <X size={30} weight="bold" />
          </button>
        </div>
        <p className="flavors-modal-select-hint">
          Elige el sabor que quieres probar:
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
              {selected.includes(f) && <Check size={16} weight="bold" style={{ marginRight: '5px' }} />}
              {f}
            </span>
          ))}
        </div>
        <button
          type="button"
          className={`flavors-modal-add-btn${addState ? ` btn-add-${addState}` : ''}`}
          onClick={handleAdd}
          disabled={!canSubmit || !!addState}
        >
          {addState === 'loading' ? (
            <><CircleNotch size={24} weight="regular" className="icon-spin" /> Agregando...</>
          ) : addState === 'success' ? (
            <><CheckCircle size={24} weight="fill" /> ¡Listo!</>
          ) : !canSubmit ? (
            'Elige al menos un sabor'
          ) : alreadyInCart ? (
            `Actualizar ${selected.length} sabor${selected.length > 1 ? 'es' : ''} en mi pedido`
          ) : (
            `Agregar ${selected.length} sabor${selected.length > 1 ? 'es' : ''} a mi pedido`
          )}
        </button>
        <div className="flavors-modal-note">
          <p><Info size={21} weight="fill" /> ¿No ves lo que buscas? Con gusto te ayudamos a encontrar el sabor ideal.</p>
          <div className="flavors-modal-note-actions">
            <a
              href={`https://wa.me/524422758979/?text=${encodeURIComponent(`Hola, estoy buscando un sabor para "${product.name}" y no encuentro lo que necesito, ¿me pueden ayudar?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flavors-note-btn flavors-note-btn--wa"
            >
              <WhatsAppIcon size={22} /> WhatsApp
            </a>
            <button
              type="button"
              className="flavors-note-btn flavors-note-btn--contact"
              onClick={() => { onClose(); onContact(product.name); }}
            >
              <Envelope size={21} weight="regular" /> Escríbenos
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

const BASE = import.meta.env.BASE_URL;

function ProductCard({ product }) {
  const { add, remove, inCart } = useCart();
  const { openContactModal } = useContactModal();
  const WA = `https://wa.me/524422758979/?text=${encodeURIComponent(`Hola, vi el producto "${product.name}" en su catálogo y me gustaría solicitar más información`)}`;

  const selected = inCart(product.id);
  const [showFlavors, setShowFlavors] = useState(false);
  const [addState, setAddState] = useState(null);
  const addBtnRef = useRef(null);

  const handleAdd = () => {
    if (selected) return remove(product.id);
    if (product.flavors?.length > 0) return setShowFlavors(true);
    setAddState('loading');
    setTimeout(() => {
      add(product);
      setAddState('success');
      showAddToast(product.name);
      setTimeout(() => setAddState(null), 900);
    }, 450);
  };

  return (
    <>
      <article className={`solution-card${selected ? ' solution-card--selected' : ''}`}>
        <div className="solution-card-img">
          {product.image && (
            <img src={`${BASE}${encodeURI(product.image).replace(/^\//, '')}`} alt={product.name} />
          )}
          <span className="solution-badge">{product.functional || product.category}</span>
        </div>

        <div className="solution-card-body">
          {product.applications && product.applications.length > 0 && (
            <p className="solution-app">
              <RadioButton size={18} weight="fill" />
              {product.applications.join(' · ')}
            </p>
          )}

          <h3>{product.name}</h3>
          <p className="solution-summary">{product.summary}</p>

          {product.metrics && product.metrics.length > 0 && (
            <div className="solution-metrics">
              <p className="metrics-header">
                <TestTube size={22} weight="regular" />
                Propiedades funcionales
              </p>
              <div className="metrics-list">
                {product.metrics.map((m) => (
                  <MetricRow key={m.label} label={m.label} level={m.level} />
                ))}
              </div>
            </div>
          )}

          {product.flavors && product.flavors.length > 0 && (
            <button
              type="button"
              className="btn-flavors-toggle"
              onClick={() => setShowFlavors(true)}
            >
              <span>
                <Flask size={21} weight="regular" />
                {' '}Ver {product.flavors.length} sabores disponibles
              </span>
              <CaretRight size={21} weight="regular" />
            </button>
          )}

          <div className="solution-actions">
            <button
              ref={addBtnRef}
              className={`${selected ? 'btn-solution-remove' : 'btn-solution-add'}${addState ? ` btn-add-${addState}` : ''}`}
              onClick={handleAdd}
              disabled={!!addState}
            >
              {addState === 'loading' ? (
                <><CircleNotch size={22} weight="regular" className="icon-spin" /> Agregando...</>
              ) : addState === 'success' ? (
                <><CheckCircle size={22} weight="fill" /> ¡Agregado!</>
              ) : selected ? (
                <><Check size={22} weight="bold" />En tu lista</>
              ) : (
                <><TestTube size={22} weight="regular" />Muestra gratis</>
              )}
            </button>
            <a
              className="btn-solution-contact"
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar información
            </a>
          </div>
        </div>
      </article>

      {showFlavors && (
        <FlavorsModal
          product={product}
          onClose={() => setShowFlavors(false)}
          onContact={(name) => openContactModal('', name)}
        />
      )}
    </>
  );
}

export default ProductCard;
