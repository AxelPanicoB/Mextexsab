import { useState } from 'react';
import { Link } from 'react-router-dom';
import spanishValidation from '../utils/spanishValidation.js';
import { useCart } from '../context/CartContext';
import Turnstile from './Turnstile';
import { track } from '../utils/analytics.js';
import { Gift, X, CheckCircle, TestTube, Flask, Trash, User, WarningCircle, PaperPlaneRight, ShieldCheck, MapPin } from '@phosphor-icons/react';

// Los 32 estados, con el nombre con el que se escriben en una guía de paquetería.
const ESTADOS = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
  'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero',
  'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
  'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
  'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas',
];

const EMPTY_FORM = {
  name: '', company: '', email: '', phone: '',
  street: '', zip: '', colony: '', city: '', state: '',
  notes: '', website: '',
};

// El servidor recibe la dirección en un solo texto (máx. 300 caracteres); los campos tienen topes
// que suman menos que eso.
const buildAddress = (f) =>
  `${f.street.trim()}, Col. ${f.colony.trim()}, ${f.city.trim()}, ${f.state}, C.P. ${f.zip.trim()}`;

function CartBar() {
  const { cart, remove, clear, panelOpen, openPanel, closePanel, hintDismissed } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [status, setStatus] = useState(null);
  const [giftAnim, setGiftAnim] = useState(false);

  const handleFabClick = () => {
    if (!panelOpen) {
      setGiftAnim(true);
      setTimeout(() => setGiftAnim(false), 600);
    }
    panelOpen ? closePanel() : openPanel();
  };

  if (cart.length === 0 && !panelOpen) return null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/samples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          address: buildAddress(form),
          notes: form.notes,
          website: form.website,
          turnstileToken,
          products: cart,
        }),
      });
      if (!res.ok) throw new Error();
      track('generate_lead', { form: 'muestras' });
      setStatus('ok');
      clear();
    } catch {
      setStatus('error');
      setTurnstileKey(k => k + 1);
    }
  };

  const handleClose = () => {
    closePanel();
    if (status === 'ok') {
      setStatus(null);
      setForm(EMPTY_FORM);
      setTurnstileToken('');
      setTurnstileKey(k => k + 1);
    }
  };

  return (
    <>
      {cart.length > 0 && !panelOpen && !hintDismissed && (
        <div className="cart-fab-hint" aria-hidden="true">
          ¡Aquí están tus muestras! 🎁
        </div>
      )}
      <button
        className={`cart-fab${cart.length > 0 ? ' cart-fab--active' : ''}${panelOpen ? ' cart-fab--hidden' : ''}`}
        onClick={handleFabClick}
        aria-label="Ver solicitud de muestras"
      >
        <Gift size={42} weight="bold" className={giftAnim ? 'gift-opening' : ''} />
        {cart.length > 0 && (
          <span className="cart-fab-badge">{cart.length}</span>
        )}
      </button>

      {panelOpen && <div className="cart-overlay" onClick={handleClose} />}

      <div className={`cart-panel${panelOpen ? ' cart-panel--open' : ''}`}>
        <div className="cart-panel-head">
          <div className="cart-panel-title">
            <Gift size={30} weight="bold" />
            <span>Solicitud de muestras</span>
          </div>
          <button className="cart-panel-close" onClick={handleClose} aria-label="Cerrar">
            <X size={33} weight="bold" />
          </button>
        </div>

        <div className="cart-panel-body">
          {status === 'ok' ? (
            <div className="cart-panel-success">
              <CheckCircle size={72} weight="fill" />
              <p>¡Solicitud enviada!</p>
              <small>
                Recibimos tu solicitud de muestras. Nos pondremos en contacto
                contigo a la brevedad.
              </small>
              <button onClick={handleClose}>Cerrar</button>
            </div>
          ) : (
            <>
              <div>
                <div className="cart-panel-list-header">
                  <p className="cart-panel-label">
                    <TestTube size={24} weight="bold" />
                    Productos seleccionados ({cart.length})
                  </p>
                  {cart.length > 0 && (
                    <button type="button" className="cart-panel-clear" onClick={clear}>
                      Vaciar <Trash size={22} weight="regular" />
                    </button>
                  )}
                </div>
                {cart.length === 0 ? (
                  <p className="cart-panel-empty">
                    Agrega productos desde el{' '}
                    <Link to="/productos" onClick={closePanel}>catálogo</Link>.
                  </p>
                ) : (
                  <ul className="cart-panel-list">
                    {cart.map((p) => (
                      <li key={p.id} className="cart-panel-item">
                        <div className="cart-panel-item-icon">
                          <Flask size={27} weight="regular" />
                        </div>
                        <div className="cart-panel-item-info">
                          <span className="cart-panel-item-name">{p.name}</span>
                          {p.sku && (
                            <span className="cart-panel-item-sku">{p.sku}</span>
                          )}
                          {p.selectedFlavors?.length > 0 && (
                            <small className="cart-panel-item-flavors">
                              {p.selectedFlavors.join(' · ')}
                            </small>
                          )}
                        </div>
                        <button
                          type="button"
                          className="cart-panel-item-remove"
                          onClick={() => remove(p.id)}
                          aria-label="Quitar producto"
                        >
                          <X size={27} weight="bold" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <form className="cart-panel-form" onSubmit={handleSubmit} {...spanishValidation}>
                {/* Honeypot — invisible para humanos, bots lo llenan */}
                <input
                  name="website"
                  value={form.website}
                  onChange={set('website')}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }}
                />

                <p className="cart-panel-label">
                  <User size={24} weight="bold" />
                  Tus datos de contacto
                </p>
                <input
                  required
                  type="text"
                  placeholder="Nombre completo *"
                  value={form.name}
                  onChange={set('name')}
                />
                <input
                  required
                  type="text"
                  name="organization"
                  autoComplete="organization"
                  maxLength={150}
                  placeholder="Nombre de la empresa *"
                  value={form.company}
                  onChange={set('company')}
                />
                <input
                  required
                  type="email"
                  placeholder="Correo electrónico *"
                  value={form.email}
                  onChange={set('email')}
                />
                <input
                  required
                  type="tel"
                  placeholder="Teléfono *"
                  value={form.phone}
                  onChange={set('phone')}
                />

                <p className="cart-panel-label">
                  <MapPin size={24} weight="bold" />
                  Dirección de envío de las muestras
                </p>
                <input
                  required
                  type="text"
                  name="street"
                  autoComplete="address-line1"
                  maxLength={100}
                  placeholder="Calle y número *"
                  value={form.street}
                  onChange={set('street')}
                />
                <div className="cart-panel-row">
                  <input
                    required
                    type="text"
                    name="zip"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={5}
                    pattern="[0-9]{5}"
                    title="El código postal tiene 5 números, por ejemplo 76000."
                    placeholder="C.P. *"
                    value={form.zip}
                    onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value.replace(/\D/g, '') }))}
                  />
                  <input
                    required
                    type="text"
                    name="colony"
                    maxLength={60}
                    placeholder="Colonia *"
                    value={form.colony}
                    onChange={set('colony')}
                  />
                </div>
                <input
                  required
                  type="text"
                  name="city"
                  autoComplete="address-level2"
                  maxLength={60}
                  placeholder="Municipio o ciudad *"
                  value={form.city}
                  onChange={set('city')}
                />
                <select
                  required
                  name="state"
                  autoComplete="address-level1"
                  aria-label="Estado"
                  value={form.state}
                  onChange={set('state')}
                >
                  <option value="" disabled>Estado *</option>
                  {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <textarea
                  rows={3}
                  placeholder="Notas o referencias para la entrega (opcional)"
                  value={form.notes}
                  onChange={set('notes')}
                />

                <Turnstile onVerify={setTurnstileToken} resetKey={turnstileKey} />

                {status === 'error' && (
                  <p className="cart-panel-error">
                    <WarningCircle size={27} weight="fill" />
                    Error al enviar. Por favor intenta de nuevo.
                  </p>
                )}
                <button
                  type="submit"
                  className="cart-panel-submit"
                  disabled={status === 'sending' || cart.length === 0}
                >
                  {status === 'sending' ? (
                    'Enviando...'
                  ) : (
                    <>Enviar solicitud <PaperPlaneRight size={27} weight="fill" /></>
                  )}
                </button>
                <p className="cart-panel-privacy">
                  <ShieldCheck size={16} weight="regular" aria-hidden="true" />
                  <span>
                    Al enviar aceptas el{' '}
                    <a href={`${import.meta.env.BASE_URL}Documentos/Aviso_Privacidad_Integral_Metexsab.pdf`} target="_blank" rel="noopener noreferrer">
                      Aviso de Privacidad
                    </a>.
                  </span>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartBar;
