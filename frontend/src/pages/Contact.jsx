import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const INTERESTS = [
  'Quesos y Cremas', 'Yogurt', 'Helados', 'Bebidas',
  'Colorantes', 'Auxiliares de Proceso', 'Otros',
];

const CONTACT_ITEMS = [
  {
    icon: 'fa-solid fa-envelope',
    label: 'Correo electrónico',
    lines: [{ href: 'mailto:ventas@metexsab.com', text: 'ventas@metexsab.com' }],
  },
  {
    icon: 'fa-solid fa-phone',
    label: 'Teléfono',
    lines: [
      { href: 'tel:4422180650', text: '442 218 0650' },
      { href: 'tel:4422189635', text: '442 218 9635' },
    ],
  },
  {
    icon: 'fa-brands fa-whatsapp',
    label: 'WhatsApp',
    lines: [{ href: 'https://wa.me/524422758979', text: '442 275 8979', external: true }],
  },
  {
    icon: 'fa-solid fa-clock',
    label: 'Horario de atención',
    lines: [{ text: 'Lunes a Viernes, 9:00 – 18:00' }],
  },
  {
    icon: 'fa-solid fa-location-dot',
    label: 'Ubicación',
    lines: [{ text: 'Querétaro, México' }],
  },
];

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
        body: JSON.stringify({ ...form, message: productsText + form.message }),
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
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="unified-hero">
        <div className="unified-mol-field" aria-hidden="true">
          <svg className="m-svg m-svg-1" viewBox="0 0 80 92" fill="none">
            <polygon points="40,3 77,23 77,69 40,89 3,69 3,23" stroke="rgba(119,208,105,0.18)" strokeWidth="1.5"/>
            <circle cx="40" cy="46" r="5" fill="rgba(92,184,69,0.12)"/>
            <circle cx="40" cy="3"  r="3" fill="rgba(119,208,105,0.2)"/>
            <circle cx="77" cy="23" r="3" fill="rgba(119,208,105,0.15)"/>
            <circle cx="77" cy="69" r="3" fill="rgba(119,208,105,0.15)"/>
            <circle cx="40" cy="89" r="3" fill="rgba(119,208,105,0.2)"/>
            <circle cx="3"  cy="69" r="3" fill="rgba(119,208,105,0.12)"/>
            <circle cx="3"  cy="23" r="3" fill="rgba(119,208,105,0.12)"/>
          </svg>
          <svg className="m-svg m-svg-2" viewBox="0 0 130 50" fill="none">
            <circle cx="12" cy="25" r="9"  stroke="rgba(119,208,105,0.15)" strokeWidth="1.3"/>
            <line x1="21" y1="22" x2="37" y2="14" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/>
            <line x1="21" y1="28" x2="37" y2="36" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/>
            <circle cx="44" cy="11" r="7"  stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
            <circle cx="44" cy="39" r="7"  stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
            <line x1="51" y1="11" x2="73" y2="25" stroke="rgba(119,208,105,0.1)"  strokeWidth="1"/>
            <line x1="51" y1="39" x2="73" y2="25" stroke="rgba(119,208,105,0.1)"  strokeWidth="1"/>
            <circle cx="79" cy="25" r="9"  stroke="rgba(119,208,105,0.15)" strokeWidth="1.3"/>
            <line x1="88" y1="25" x2="108" y2="25" stroke="rgba(119,208,105,0.12)" strokeWidth="1.5"/>
            <circle cx="115" cy="25" r="7"  stroke="rgba(119,208,105,0.1)"  strokeWidth="1"/>
          </svg>
          <svg className="m-svg m-svg-3" viewBox="0 0 56 64" fill="none">
            <polygon points="28,2 54,16 54,48 28,62 2,48 2,16" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
            <circle cx="28" cy="32" r="2" fill="rgba(92,184,69,0.2)"/>
          </svg>
          <svg className="m-svg m-svg-5" viewBox="0 0 50 58" fill="none">
            <polygon points="25,2 48,14 48,44 25,56 2,44 2,14" stroke="rgba(119,208,105,0.18)" strokeWidth="1.5"/>
            <circle cx="25" cy="29" r="2.5" fill="rgba(92,184,69,0.25)"/>
          </svg>
          <svg className="m-svg m-svg-7" viewBox="0 0 70 80" fill="none">
            <polygon points="35,3 67,20 67,60 35,77 3,60 3,20" stroke="rgba(119,208,105,0.16)" strokeWidth="1.4"/>
            <circle cx="35" cy="40" r="14" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
          </svg>
          <svg className="m-svg m-svg-9" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="5" fill="rgba(92,184,69,0.20)"/>
            <ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
            <ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.10)" strokeWidth="1" transform="rotate(60 30 30)"/>
          </svg>
          <svg className="m-svg m-svg-13" viewBox="0 0 40 46" fill="none">
            <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" stroke="rgba(119,208,105,0.20)" strokeWidth="1.8"/>
          </svg>
          <svg className="m-svg m-svg-16" viewBox="0 0 70 45" fill="none">
            <circle cx="22" cy="22" r="18" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/>
            <circle cx="22" cy="22" r="5"  fill="rgba(92,184,69,0.12)"/>
            <line x1="40" y1="22" x2="65" y2="22" stroke="rgba(119,208,105,0.10)" strokeWidth="1.5"/>
            <circle cx="65" cy="22" r="4" fill="rgba(92,184,69,0.14)"/>
          </svg>
          <div className="m-dot m-dot-1"/><div className="m-dot m-dot-2"/><div className="m-dot m-dot-3"/>
          <div className="m-dot m-dot-5"/><div className="m-dot m-dot-7"/>
        </div>

        <div className="hero-fw-inner">
          <div className="hero-fw-text">
            <span className="app-hero-eyebrow">
              <i className="fa-solid fa-envelope"></i>
              Contacto
            </span>
            <h1 className="unified-hero-h1">
              Hablemos de<br/>
              <span>tu proyecto</span>
            </h1>
            <p className="unified-hero-p">
              Nuestro equipo técnico está listo para asesorarte en la elección
              de ingredientes, dosificaciones y formulaciones para tu línea de producción.
            </p>
          </div>
          <div className="unified-hero-stats hero-fw-stats">
            <div className="unified-stat">
              <strong>15+</strong>
              <span>Años de experiencia</span>
            </div>
            <div className="unified-stat-sep"></div>
            <div className="unified-stat">
              <strong>200+</strong>
              <span>Clientes en México</span>
            </div>
            <div className="unified-stat-sep"></div>
            <div className="unified-stat">
              <strong>48h</strong>
              <span>Tiempo de respuesta</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <section className="contact-page reveal-section">
        <div className="contenedor">
          <div className="contact-page-grid">

            {/* ── LEFT: info ── */}
            <div className="contact-page-info">
              <p className="contact-page-tagline">
                Especialistas en ingredientes para la industria láctea.
                Escríbenos y te proponemos la solución técnica ideal.
              </p>

              <div className="contact-info-cards">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} className="contact-info-card">
                    <div className="contact-info-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div>
                      <span className="contact-info-label">{item.label}</span>
                      <div className="contact-info-lines">
                        {item.lines.map((line) =>
                          line.href ? (
                            <a
                              key={line.text}
                              href={line.href}
                              {...(line.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                              {line.text}
                            </a>
                          ) : (
                            <span key={line.text}>{line.text}</span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                className="contact-wa-btn"
                href="https://wa.me/524422758979/?text=Hola,%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp"></i>
                Escríbenos por WhatsApp
              </a>
            </div>

            {/* ── RIGHT: form ── */}
            <div className="contact-page-form-wrap">
              <div className="contact-page-form-card">
                <p className="contact-form-eyebrow">
                  <i className="fa-solid fa-flask"></i>
                  Solicitud de asesoría técnica
                </p>
                <h2>Envíanos un mensaje</h2>

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
                          <button type="button" onClick={() => remove(p.id)} aria-label="Quitar">
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {status?.type === 'success' ? (
                  <div className="contact-success">
                    <div className="contact-success-icon">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <h3>¡Consulta enviada!</h3>
                    <p>Un asesor técnico se pondrá en contacto contigo en las próximas 48 horas.</p>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => setStatus(null)}
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-page-form">
                    <div className="form-grid">
                      <label>
                        Nombre *
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" required />
                      </label>
                      <label>
                        Empresa *
                        <input name="company" value={form.company} onChange={handleChange} placeholder="Nombre de tu empresa" required />
                      </label>
                      <label>
                        Correo electrónico *
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="correo@empresa.com" required />
                      </label>
                      <label>
                        Teléfono *
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" required />
                      </label>
                      <label>
                        Área de interés *
                        <select name="interest" value={form.interest} onChange={handleChange} required>
                          <option value="">Selecciona una opción</option>
                          {INTERESTS.map((v) => <option key={v} value={v}>{v}</option>)}
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

                    <button type="submit" className="btn-primary contact-submit" disabled={status?.type === 'loading'}>
                      {status?.type === 'loading' ? (
                        <><i className="fa-solid fa-spinner fa-spin"></i> Enviando...</>
                      ) : (
                        <><i className="fa-solid fa-paper-plane"></i> Enviar consulta</>
                      )}
                    </button>

                    {status?.type === 'error' && (
                      <p className="form-status error">
                        <i className="fa-solid fa-circle-exclamation"></i> {status.text}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
