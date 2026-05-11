import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Contact() {
  const { cart, remove, clear } = useCart();
  const location = useLocation();

  const [form, setForm] = useState(() => {
    const params = new URLSearchParams(location.search);
    const interest = params.get('interest') || '';
    return { name: '', company: '', email: '', phone: '', interest, message: '' };
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', text: 'Enviando consulta...' });

    const productsText =
      cart.length > 0
        ? `Productos de interés:\n${cart.map((p) =>
            p.selectedFlavors && p.selectedFlavors.length > 0
              ? `- ${p.name} (perfiles: ${p.selectedFlavors.join(', ')})`
              : `- ${p.name}`
          ).join('\n')}\n\n`
        : '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, message: productsText + form.message })
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Error al enviar la consulta.');

      setStatus({ type: 'success', text: result.message });
      setForm({ name: '', company: '', email: '', phone: '', interest: '', message: '' });
      clear();
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
  };

  return (
    <>
      {/* ── HEADER ──────────────────────────────────────── */}
      <section className="page-hero">
        <div className="contenedor">
          <span className="eyebrow">Contacto</span>
          <h2>Solicita tu asesoría técnica</h2>
          <p className="section-copy">
            Cuéntanos sobre tu proyecto y te proponemos los ingredientes
            ideales para tu producto.
          </p>
        </div>
      </section>

      {/* ── FORMULARIO + INFO ────────────────────────────── */}
      <section className="page-section reveal-section">
        <div className="contact-layout">

          {/* Información de contacto */}
          <div className="contact-info">
            <h3>¿Cómo podemos ayudarte?</h3>
            <p>
              Nuestro equipo técnico está listo para asesorarte en la elección
              de ingredientes, dosificaciones y aplicaciones para tu línea de
              producción.
            </p>
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <span className="label">Correo electrónico</span>
                  <a href="mailto:ventas@metexsab.com">ventas@metexsab.com</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="icon"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <span className="label">Teléfono</span>
                  <a href="tel:4422180650">442 218 0650</a>
                  <a href="tel:4422189635">442 218 9635</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="icon"><i className="fa-brands fa-whatsapp"></i></div>
                <div>
                  <span className="label">WhatsApp</span>
                  <a
                    href="https://wa.me/524422758979"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    442 275 8979
                  </a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="icon"><i className="fa-solid fa-clock"></i></div>
                <div>
                  <span className="label">Horario de atención</span>
                  <span>Lunes a Viernes, 9:00 – 18:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="contact-form-wrap">
            <h3>Envíanos un mensaje</h3>

            {/* Productos seleccionados desde el catálogo */}
            {cart.length > 0 && (
              <div className="contact-products">
                <p className="contact-products-label">
                  <i className="fa-solid fa-flask"></i>
                  Productos de interés ({cart.length})
                </p>
                <div className="contact-products-chips">
                  {cart.map((p) => (
                    <span key={p.id} className="cart-chip cart-chip--form">
                      <span className="cart-chip-content">
                        <span className="cart-chip-name">{p.name}</span>
                        {p.selectedFlavors && p.selectedFlavors.length > 0 && (
                          <span className="cart-chip-flavors cart-chip-flavors--form">
                            {p.selectedFlavors.join(' · ')}
                          </span>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        aria-label="Quitar"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
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
                  Empresa *
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa"
                    required
                  />
                </label>
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
                  Teléfono *
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Ej. 442 123 4567"
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
                <label className="full-width">
                  Mensaje (opcional)
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre tu producto, volumen de producción o necesidades específicas..."
                  />
                </label>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1.25rem' }}>
                <i className="fa-solid fa-paper-plane"></i> Enviar consulta
              </button>

              {status && (
                <p className={`form-status ${status.type}`}>
                  {status.type === 'loading' && <i className="fa-solid fa-spinner fa-spin"></i>}
                  {status.type === 'success' && <i className="fa-solid fa-circle-check"></i>}
                  {status.type === 'error' && <i className="fa-solid fa-circle-exclamation"></i>}
                  {' '}{status.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
