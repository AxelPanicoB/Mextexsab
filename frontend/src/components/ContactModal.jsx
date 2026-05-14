import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useContactModal } from '../context/ContactModalContext';

function ContactModal() {
  const { open, closeContactModal, prefill } = useContactModal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (open) {
      setForm(f => ({ ...f, interest: prefill || '' }));
      setStatus(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, prefill]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error al enviar.');
      setStatus({ type: 'success', text: '¡Listo! Te contactamos pronto.' });
      setForm({ name: '', email: '', phone: '', interest: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
  };

  return createPortal(
    <div className="cmodal-overlay" onClick={closeContactModal}>
      <div
        className="cmodal"
        role="dialog"
        aria-modal="true"
        aria-label="Contacto rápido"
        onClick={e => e.stopPropagation()}
      >
        <div className="cmodal-header">
          <div className="cmodal-header-icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="cmodal-header-copy">
            <p className="cmodal-eyebrow">Contacto rápido</p>
            <h4>Cuéntanos de tu proyecto</h4>
          </div>
          <button
            type="button"
            className="cmodal-close"
            onClick={closeContactModal}
            aria-label="Cerrar"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cmodal-body">
          {status?.type === 'success' ? (
            <div className="cmodal-success">
              <div className="cmodal-success-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h4>¡Mensaje enviado!</h4>
              <p>Un asesor técnico se pondrá en contacto contigo pronto.</p>
              <button type="button" className="cmodal-close-btn" onClick={closeContactModal}>
                Cerrar
              </button>
            </div>
          ) : (
            <form className="cmodal-form" onSubmit={handleSubmit}>
              <div className="cmodal-row">
                <label>
                  Nombre *
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </label>
                <label>
                  Teléfono
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Teléfono"
                  />
                </label>
              </div>
              <label>
                Correo electrónico *
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="correo@empresa.com"
                  required
                />
              </label>
              <label>
                Área de interés *
                <select name="interest" value={form.interest} onChange={handleChange} required>
                  <option value="">Selecciona una opción</option>
                  <option value="Quesos y Cremas">Quesos y Cremas</option>
                  <option value="Yogurt">Yogurt</option>
                  <option value="Helados">Helados</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Colorantes">Colorantes</option>
                  <option value="Auxiliares de Proceso">Auxiliares de Proceso</option>
                  <option value="Otros">Otros</option>
                </select>
              </label>
              <label>
                Mensaje
                <textarea
                  name="message"
                  rows="3"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu producto o necesidad específica..."
                />
              </label>

              <button
                type="submit"
                className="cmodal-submit"
                disabled={status?.type === 'loading'}
              >
                {status?.type === 'loading' ? (
                  <><i className="fa-solid fa-spinner fa-spin"></i> Enviando...</>
                ) : (
                  <><i className="fa-solid fa-paper-plane"></i> Enviar mensaje</>
                )}
              </button>

              {status?.type === 'error' && (
                <p className="cmodal-status error">
                  <i className="fa-solid fa-circle-exclamation"></i> {status.text}
                </p>
              )}
            </form>
          )}
        </div>

        <div className="cmodal-footer">
          <span className="cmodal-footer-row">
            <i className="fa-brands fa-whatsapp"></i>
            ¿Prefieres WhatsApp?{' '}
            <a href="https://wa.me/524422758979" target="_blank" rel="noopener noreferrer">
              442 275 8979
            </a>
          </span>
          <span className="cmodal-footer-row cmodal-footer-hours">
            <i className="fa-solid fa-clock"></i>
            Lun–Vie, 9:00–18:00
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ContactModal;
