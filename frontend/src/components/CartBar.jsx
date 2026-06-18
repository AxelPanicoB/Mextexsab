import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Turnstile from './Turnstile';
import { Gift, X, CheckCircle, TestTube, Flask, Trash, User, WarningCircle, PaperPlane } from '@phosphor-icons/react';

function CartBar() {
  const { cart, remove, clear, panelOpen, openPanel, closePanel, hintDismissed } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', notes: '', website: '' });
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
          email: form.email,
          phone: form.phone,
          address: form.address,
          notes: form.notes,
          website: form.website,
          turnstileToken,
          products: cart,
        }),
      });
      if (!res.ok) throw new Error();
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
      setForm({ name: '', email: '', phone: '', address: '', notes: '', website: '' });
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
        className={`cart-fab${cart.length > 0 ? ' cart-fab--active' : ''}`}
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
                    Agrega productos desde el catálogo.
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

              <form className="cart-panel-form" onSubmit={handleSubmit}>
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
                <textarea
                  required
                  rows={2}
                  placeholder="Dirección de envío de las muestras *"
                  value={form.address}
                  onChange={set('address')}
                />
                <textarea
                  rows={3}
                  placeholder="Notas adicionales (opcional)"
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
                    <>Enviar solicitud <PaperPlane size={27} weight="fill" /></>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartBar;
