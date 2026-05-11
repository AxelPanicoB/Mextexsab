import { useState } from 'react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function Home() {
  const [ctaForm, setCtaForm] = useState({ name: '', email: '', phone: '' });
  const [ctaStatus, setCtaStatus] = useState(null);

  const handleCtaChange = (e) => {
    const { name, value } = e.target;
    setCtaForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCta = async (e) => {
    e.preventDefault();
    setCtaStatus({ type: 'loading', text: 'Enviando...' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ctaForm, interest: 'Consulta General' })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error al enviar.');
      setCtaStatus({ type: 'success', text: '¡Listo! Te contactamos pronto.' });
      setCtaForm({ name: '', email: '', phone: '' });
    } catch (err) {
      setCtaStatus({ type: 'error', text: err.message });
    }
  };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <i className="fa-solid fa-star"></i>
              Ingredientes Alimentarios Premium
            </div>
            <h1>
              Expertos en <span>Aditivos</span> para la Industria Láctea
            </h1>
            <p>
              Saborizantes, espesantes, estabilizantes y gomas especialmente
              formulados para quesos, yogures, helados y bebidas.
            </p>
            <div className="hero-actions">
              <Link to="/productos" className="btn-white">
                Ver Catálogo <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contacto" className="btn-outline-white">
                Solicitar Cotización
              </Link>
            </div>
          </div>
          <div className="hero-logo-group" aria-hidden="true">
            <img src={`${BASE}img/logo.png`} alt="" className="hero-logo-img" />
            <img src={`${BASE}img/MetexsabL.png`} alt="" className="hero-logo-static" />
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────── */}
      <div className="stats-bar reveal-section">
        <div className="stats-inner">
          <div className="stat-item">
            <span className="stat-number">200+</span>
            <span className="stat-label">Productos en catálogo</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">Años de experiencia</span>
          </div>
        </div>
      </div>

      {/* ── QUIÉNES SOMOS ─────────────────────────────── */}
      <section className="about-home-section reveal-section">
        <div className="contenedor">
          <div className="about-home-inner">

            <div className="about-home-left">
              <span className="about-home-eyebrow">— Quiénes somos</span>
              <h2>
                Especialistas en <span>ingredientes</span> para la industria
                alimentaria.
              </h2>
              <p>
                Fundados en 2007 en Querétaro, México. Más de 15 años
                desarrollando soluciones técnicas para quesos, yogures,
                helados y bebidas en la industria láctea nacional.
              </p>
              <Link to="/nosotros" className="about-home-link">
                Conoce más <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="about-home-right">
              <div className="about-home-point">
                <div className="about-home-point-icon">
                  <i className="fa-solid fa-medal"></i>
                </div>
                <p>Empresa 100% mexicana con más de 15 años de experiencia en ingredientes para la industria alimentaria.</p>
              </div>
              <div className="about-home-point">
                <div className="about-home-point-icon">
                  <i className="fa-solid fa-handshake"></i>
                </div>
                <p>Servicio eficiente, confiable y honesto.</p>
              </div>
              <div className="about-home-point">
                <div className="about-home-point-icon">
                  <i className="fa-solid fa-lightbulb"></i>
                </div>
                <p>Soluciones innovadoras que convierten a nuestros clientes en líderes de su segmento.</p>
              </div>
            </div>

          </div>


        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS ──────────────────────────── */}
      <section className="info-section reveal-section">
        <div className="contenedor">
          <div className="info-header">
            <span className="about-home-eyebrow">— ¿Por qué elegirnos?</span>
            <h2>Calidad y <span>experiencia</span> en cada ingrediente.</h2>
            <p>
              Somos especialistas en formulaciones para la industria láctea,
              con soluciones técnicas que optimizan procesos y mejoran
              resultados finales.
            </p>
          </div>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-card-img">
                <img src={`${BASE}img/quesos-cremas.png`} alt="Formulaciones Especializadas" />
              </div>
              <div className="info-card-body">
                <h3>Formulaciones Especializadas</h3>
                <p>Desarrollamos mezclas personalizadas según las necesidades específicas de cada cliente y aplicación.</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-img">
                <img src={`${BASE}img/yogurt-bebidas.png`} alt="Laboratorio de Control" />
              </div>
              <div className="info-card-body">
                <h3>Laboratorio de Control</h3>
                <p>Contamos con laboratorio propio para análisis y desarrollo de nuevas formulaciones a la medida.</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-img">
                <img src={`${BASE}img/helados-cremas.png`} alt="Asesoría Técnica" />
              </div>
              <div className="info-card-body">
                <h3>Asesoría Técnica</h3>
                <p>Nuestro equipo brinda soporte continuo para optimizar procesos y resolver desafíos de producción.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CÓMO TRABAJAMOS ───────────────────────────── */}
      <section className="process-section reveal-section">
        <div className="contenedor">
          <div className="section-header">
            <div className="section-badge">Nuestro proceso</div>
            <h2>¿Cómo trabajamos contigo?</h2>
            <p className="section-copy">
              Desde el primer contacto hasta el producto final, te
              acompañamos en cada etapa de tu formulación.
            </p>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Análisis de necesidad</h3>
              <p>Escuchamos tu producto, proceso de producción y objetivos para entender qué ingrediente se adapta mejor.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Propuesta de formulación</h3>
              <p>Seleccionamos y combinamos ingredientes de nuestro catálogo para darte la solución técnica más adecuada.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Muestras en tu planta</h3>
              <p>Te enviamos muestras para que las pruebes en condiciones reales de producción y valides los resultados.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Acompañamiento técnico</h3>
              <p>Te apoyamos con ajustes y asesoría continua hasta que tu producto quede exactamente como lo necesitas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LÍNEAS DE PRODUCTO ─────────────────────────── */}
      <section className="applications-section reveal-section">
        <div className="contenedor">
          <div className="section-header">
            <div className="section-badge">Nuestras Especialidades</div>
            <h2>Soluciones para cada línea de producción</h2>
            <p className="section-copy">
              Aditivos especialmente formulados para quesos, yogures, helados,
              bebidas y más.
            </p>
          </div>
          <div className="applications-content">
            <div className="aplicacion-card">
              <div className="card-icon">
                <img src={`${BASE}img/quesos-cremas.png`} alt="Quesos y Cremas" />
              </div>
              <h3>Gomas y Texturizantes para Quesos</h3>
              <p>Cuajos, texturizantes y estabilizantes para quesos frescos, análogos y cremas.</p>
              <Link to="/aplicaciones" className="btn-aplicacion">
                Ver línea <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="aplicacion-card">
              <div className="card-icon">
                <img src={`${BASE}img/yogurt-bebidas.png`} alt="Yogurt y Bebidas" />
              </div>
              <h3>Estabilizantes para Yogurt</h3>
              <p>Complejos estabilizantes para yogures naturales, con frutas, bebidas lácteas y postres.</p>
              <Link to="/aplicaciones" className="btn-aplicacion">
                Ver línea <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="aplicacion-card">
              <div className="card-icon">
                <img src={`${BASE}img/helados-cremas.png`} alt="Helados y Cremas" />
              </div>
              <h3>Estabilizantes para Helados</h3>
              <p>Formulaciones especializadas para helados, paletas, nieves y productos congelados.</p>
              <Link to="/aplicaciones" className="btn-aplicacion">
                Ver línea <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="aplicacion-card">
              <div className="card-icon">
                <img src={`${BASE}img/colorantes.png`} alt="Saborizantes y Colorantes" />
              </div>
              <h3>Saborizantes y Colorantes</h3>
              <p>Amplia gama de sabores naturales y artificiales, además de colorantes alimentarios estables.</p>
              <Link to="/aplicaciones" className="btn-aplicacion">
                Ver línea <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="aplicacion-card">
              <div className="card-icon">
                <img src={`${BASE}img/auxiliares-procesos.png`} alt="Auxiliares de Procesos" />
              </div>
              <h3>Auxiliares de Proceso</h3>
              <p>Aditivos funcionales para optimizar producción, conservación y shelf-life del producto.</p>
              <Link to="/aplicaciones" className="btn-aplicacion">
                Ver línea <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ──────────────────────── */}
      <section className="featured-section reveal-section">
        <div className="contenedor">
          <div className="section-header">
            <div className="section-badge">Más solicitados</div>
            <h2>Productos destacados</h2>
            <p className="section-copy">
              Algunos de los ingredientes con mayor demanda entre nuestros
              clientes de la industria láctea.
            </p>
          </div>
          <div className="featured-grid">
            <div className="featured-card">
              <span className="featured-code">QRH-40-004</span>
              <h3>Retenedor de humedad para quesos</h3>
              <p>Reduce el desuerado y mejora el rendimiento en quesos frescos y análogos. Textura uniforme y vida de anaquel extendida.</p>
              <Link to="/productos" className="btn-aplicacion">
                Ver ficha <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="featured-card">
              <span className="featured-code">CREB-0265</span>
              <h3>Estabilizante para helados y cremas</h3>
              <p>Agente aireante y estabilizante que mejora la retención de aire y da textura uniforme en helados y cremas montadas.</p>
              <Link to="/productos" className="btn-aplicacion">
                Ver ficha <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="featured-card">
              <span className="featured-code">Serie EYGR</span>
              <h3>Texturizante para yogur</h3>
              <p>Estabilidad y consistencia en almacenamiento para yogures con y sin homogeneizado. Evita la sinéresis y da cuerpo natural.</p>
              <Link to="/productos" className="btn-aplicacion">
                Ver ficha <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────── */}
      <section className="cta-section reveal-section">
        <div className="contenedor">
          <h2>¿Listo para mejorar tus formulaciones?</h2>
          <p>
            Déjanos tus datos y un asesor técnico se pondrá en contacto
            contigo a la brevedad.
          </p>
          <form className="cta-form" onSubmit={handleCta}>
            <input
              name="name"
              placeholder="Tu nombre"
              value={ctaForm.name}
              onChange={handleCtaChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={ctaForm.email}
              onChange={handleCtaChange}
              required
            />
            <input
              name="phone"
              placeholder="Teléfono"
              value={ctaForm.phone}
              onChange={handleCtaChange}
              required
            />
            <button type="submit" className="btn-primary">
              <i className="fa-solid fa-paper-plane"></i> Solicitar asesoría
            </button>
          </form>
          {ctaStatus && (
            <p className={`cta-status ${ctaStatus.type}`}>
              {ctaStatus.type === 'loading' && <i className="fa-solid fa-spinner fa-spin"></i>}
              {ctaStatus.type === 'success' && <i className="fa-solid fa-circle-check"></i>}
              {ctaStatus.type === 'error' && <i className="fa-solid fa-circle-exclamation"></i>}
              {' '}{ctaStatus.text}
            </p>
          )}
          <p className="cta-note">
            También puedes escribirnos directamente a{' '}
            <a href="mailto:ventas@metexsab.com" style={{ color: 'var(--green-dark)', textDecoration: 'underline' }}>
              ventas@metexsab.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
