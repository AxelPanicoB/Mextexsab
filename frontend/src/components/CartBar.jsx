import { useState } from 'react';
import { useCart } from '../context/CartContext';

function CartBar() {
  const { cart, remove, clear, panelOpen, openPanel, closePanel } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [status, setStatus] = useState(null);

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
          notes: form.notes,
          products: cart,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('ok');
      clear();
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    closePanel();
    if (status === 'ok') {
      setStatus(null);
      setForm({ name: '', email: '', phone: '', notes: '' });
    }
  };

  return (
    <>
      <button
        className="cart-fab"
        onClick={() => panelOpen ? closePanel() : openPanel()}
        aria-label="Ver solicitud de muestras"
      >
        <i className="fa-solid fa-cart-shopping"></i>
        {cart.length > 0 && (
          <span className="cart-fab-badge">{cart.length}</span>
        )}
      </button>

      {panelOpen && <div className="cart-overlay" onClick={handleClose} />}

      <div className={`cart-panel${panelOpen ? ' cart-panel--open' : ''}`}>
        <div className="cart-panel-head">
          <div className="cart-panel-title">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Solicitud de muestras</span>
          </div>
          <button className="cart-panel-close" onClick={handleClose} aria-label="Cerrar">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cart-panel-body">
          {status === 'ok' ? (
            <div className="cart-panel-success">
              <i className="fa-solid fa-circle-check"></i>
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
                <p className="cart-panel-label">
                  <i className="fa-solid fa-vial"></i>
                  Productos seleccionados ({cart.length})
                </p>
                {cart.length === 0 ? (
                  <p className="cart-panel-empty">
                    Agrega productos desde el catálogo.
                  </p>
                ) : (
                  <ul className="cart-panel-list">
                    {cart.map((p) => (
                      <li key={p.id} className="cart-panel-item">
                        <div className="cart-panel-item-info">
                          <span className="cart-panel-item-name">{p.name}</span>
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
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <form className="cart-panel-form" onSubmit={handleSubmit}>
                <p className="cart-panel-label">
                  <i className="fa-regular fa-user"></i>
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
                  rows={3}
                  placeholder="Notas adicionales (opcional)"
                  value={form.notes}
                  onChange={set('notes')}
                />
                {status === 'error' && (
                  <p className="cart-panel-error">
                    <i className="fa-solid fa-circle-exclamation"></i>
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
                    <>Enviar solicitud <i className="fa-solid fa-paper-plane"></i></>
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
