import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../context/ContactModalContext';

const BASE = import.meta.env.BASE_URL;

function Home() {
  const { openContactModal } = useContactModal();
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
      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="hero-section">
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
            <line x1="88" y1="21" x2="108" y2="21" stroke="rgba(119,208,105,0.08)" strokeWidth="1"/>
            <circle cx="115" cy="25" r="7"  stroke="rgba(119,208,105,0.1)"  strokeWidth="1"/>
          </svg>
          <svg className="m-svg m-svg-3" viewBox="0 0 56 64" fill="none">
            <polygon points="28,2 54,16 54,48 28,62 2,48 2,16" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
            <circle cx="28" cy="32" r="5" fill="none" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
            <circle cx="28" cy="32" r="2" fill="rgba(92,184,69,0.2)"/>
          </svg>
          <svg className="m-svg m-svg-4" viewBox="0 0 70 70" fill="none">
            <circle cx="35" cy="35" r="31" stroke="rgba(119,208,105,0.06)" strokeWidth="1" strokeDasharray="5 5"/>
            <circle cx="35" cy="35" r="10" stroke="rgba(119,208,105,0.16)" strokeWidth="1.5"/>
            <circle cx="35" cy="4"  r="3.5" fill="rgba(92,184,69,0.15)"/>
            <circle cx="66" cy="35" r="3.5" fill="rgba(92,184,69,0.10)"/>
            <circle cx="35" cy="66" r="3.5" fill="rgba(92,184,69,0.12)"/>
            <circle cx="4"  cy="35" r="3.5" fill="rgba(92,184,69,0.08)"/>
            <line x1="35" y1="7"  x2="35" y2="25" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/>
            <line x1="63" y1="35" x2="45" y2="35" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/>
            <line x1="35" y1="63" x2="35" y2="45" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/>
            <line x1="7"  y1="35" x2="25" y2="35" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/>
          </svg>
          <svg className="m-svg m-svg-5" viewBox="0 0 50 58" fill="none">
            <polygon points="25,2 48,14 48,44 25,56 2,44 2,14" stroke="rgba(119,208,105,0.18)" strokeWidth="1.5"/>
            <circle cx="25" cy="29" r="2.5" fill="rgba(92,184,69,0.25)"/>
          </svg>
          <svg className="m-svg m-svg-6" viewBox="0 0 60 52" fill="none">
            <polygon points="30,2 58,50 2,50" stroke="rgba(119,208,105,0.13)" strokeWidth="1.2"/>
            <circle cx="30" cy="2"  r="3" fill="rgba(92,184,69,0.18)"/>
            <circle cx="58" cy="50" r="3" fill="rgba(92,184,69,0.12)"/>
            <circle cx="2"  cy="50" r="3" fill="rgba(92,184,69,0.12)"/>
          </svg>
          <svg className="m-svg m-svg-7" viewBox="0 0 70 80" fill="none">
            <polygon points="35,3 67,20 67,60 35,77 3,60 3,20" stroke="rgba(119,208,105,0.16)" strokeWidth="1.4"/>
            <circle cx="35" cy="40" r="14" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
          </svg>
          <svg className="m-svg m-svg-8" viewBox="0 0 100 30" fill="none">
            <circle cx="15" cy="15" r="10" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
            <line x1="25" y1="11" x2="75" y2="11" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
            <line x1="25" y1="19" x2="75" y2="19" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
            <circle cx="85" cy="15" r="10" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
          </svg>
          <svg className="m-svg m-svg-9" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="5" fill="rgba(92,184,69,0.20)"/>
            <ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
            <ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.10)" strokeWidth="1" transform="rotate(60 30 30)"/>
            <ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.08)" strokeWidth="1" transform="rotate(120 30 30)"/>
          </svg>
          <svg className="m-svg m-svg-10" viewBox="0 0 40 80" fill="none">
            <path d="M20,5 C35,22 5,42 20,57 C35,72 5,80 20,80" stroke="rgba(119,208,105,0.13)" strokeWidth="1.2" fill="none"/>
            <circle cx="20" cy="5"  r="3" fill="rgba(92,184,69,0.15)"/>
            <circle cx="20" cy="57" r="3" fill="rgba(92,184,69,0.12)"/>
          </svg>
          <svg className="m-svg m-svg-11" viewBox="0 0 60 60" fill="none">
            <line x1="30" y1="5"  x2="30" y2="55" stroke="rgba(119,208,105,0.13)" strokeWidth="1.5"/>
            <line x1="5"  y1="30" x2="55" y2="30" stroke="rgba(119,208,105,0.13)" strokeWidth="1.5"/>
            <circle cx="30" cy="30" r="6" fill="rgba(92,184,69,0.15)"/>
            <circle cx="30" cy="5"  r="3" fill="rgba(92,184,69,0.10)"/>
            <circle cx="30" cy="55" r="3" fill="rgba(92,184,69,0.10)"/>
            <circle cx="5"  cy="30" r="3" fill="rgba(92,184,69,0.10)"/>
            <circle cx="55" cy="30" r="3" fill="rgba(92,184,69,0.10)"/>
          </svg>
          <svg className="m-svg m-svg-12" viewBox="0 0 60 58" fill="none">
            <polygon points="30,2 58,22 48,54 12,54 2,22" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
            <circle cx="30" cy="28" r="4" fill="rgba(92,184,69,0.14)"/>
          </svg>
          <svg className="m-svg m-svg-13" viewBox="0 0 40 46" fill="none">
            <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" stroke="rgba(119,208,105,0.20)" strokeWidth="1.8"/>
          </svg>
          <svg className="m-svg m-svg-14" viewBox="0 0 80 40" fill="none">
            <circle cx="10" cy="20" r="7" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
            <line x1="17" y1="14" x2="33" y2="8"  stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
            <circle cx="40" cy="6"  r="6" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
            <line x1="46" y1="10" x2="62" y2="20" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
            <circle cx="70" cy="22" r="7" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
          </svg>
          <svg className="m-svg m-svg-15" viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="25" r="7" stroke="rgba(119,208,105,0.16)" strokeWidth="1.3"/>
            <line x1="25" y1="4"  x2="25" y2="18" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
            <line x1="46" y1="25" x2="32" y2="25" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
            <line x1="25" y1="46" x2="25" y2="32" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
            <line x1="4"  y1="25" x2="18" y2="25" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
            <circle cx="25" cy="4"  r="2.5" fill="rgba(92,184,69,0.15)"/>
            <circle cx="46" cy="25" r="2.5" fill="rgba(92,184,69,0.12)"/>
            <circle cx="25" cy="46" r="2.5" fill="rgba(92,184,69,0.12)"/>
            <circle cx="4"  cy="25" r="2.5" fill="rgba(92,184,69,0.10)"/>
          </svg>
          <svg className="m-svg m-svg-16" viewBox="0 0 70 45" fill="none">
            <circle cx="22" cy="22" r="18" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/>
            <circle cx="22" cy="22" r="5"  fill="rgba(92,184,69,0.12)"/>
            <line x1="40" y1="22" x2="65" y2="22" stroke="rgba(119,208,105,0.10)" strokeWidth="1.5"/>
            <circle cx="65" cy="22" r="4" fill="rgba(92,184,69,0.14)"/>
          </svg>
          <svg className="m-svg m-svg-17" viewBox="0 0 110 64" fill="none">
            <polygon points="28,2 54,16 54,48 28,62 2,48 2,16"    stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/>
            <polygon points="82,2 108,16 108,48 82,62 56,48 56,16" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/>
          </svg>
          <svg className="m-svg m-svg-18" viewBox="0 0 50 44" fill="none">
            <polygon points="25,2 48,42 2,42" stroke="rgba(119,208,105,0.16)" strokeWidth="1.4"/>
            <circle cx="25" cy="22" r="3" fill="rgba(92,184,69,0.18)"/>
          </svg>
          <svg className="m-svg m-svg-19" viewBox="0 0 55 55" fill="none">
            <circle cx="27" cy="10" r="8" stroke="rgba(119,208,105,0.13)" strokeWidth="1.2"/>
            <circle cx="10" cy="42" r="8" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/>
            <circle cx="45" cy="42" r="8" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/>
            <line x1="22" y1="17" x2="15" y2="35" stroke="rgba(119,208,105,0.09)" strokeWidth="1"/>
            <line x1="32" y1="17" x2="40" y2="35" stroke="rgba(119,208,105,0.09)" strokeWidth="1"/>
            <line x1="18" y1="42" x2="37" y2="42" stroke="rgba(119,208,105,0.08)" strokeWidth="1"/>
          </svg>
          <svg className="m-svg m-svg-20" viewBox="0 0 120 28" fill="none">
            <circle cx="10"  cy="14" r="8" stroke="rgba(119,208,105,0.13)" strokeWidth="1.2"/>
            <line x1="18"  y1="14" x2="38"  y2="14" stroke="rgba(119,208,105,0.10)" strokeWidth="1.2"/>
            <circle cx="46"  cy="14" r="7" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/>
            <line x1="53"  y1="14" x2="73"  y2="14" stroke="rgba(119,208,105,0.10)" strokeWidth="1.2"/>
            <circle cx="81"  cy="14" r="7" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/>
            <line x1="88"  y1="14" x2="108" y2="14" stroke="rgba(119,208,105,0.09)" strokeWidth="1.2"/>
            <circle cx="113" cy="14" r="6" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/>
          </svg>
          <div className="m-dot m-dot-1"/><div className="m-dot m-dot-2"/><div className="m-dot m-dot-3"/>
          <div className="m-dot m-dot-4"/><div className="m-dot m-dot-5"/><div className="m-dot m-dot-6"/>
          <div className="m-dot m-dot-7"/><div className="m-dot m-dot-8"/>
        </div>

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
              <button type="button" className="btn-outline-white" onClick={openContactModal}>
                Solicitar Cotización
              </button>
            </div>
          </div>
          <div className="hero-logo-group" aria-hidden="true">
            <img src={`${BASE}img/logo.png`} alt="" className="hero-logo-img" />
            <img src={`${BASE}img/MetexsabL.png`} alt="" className="hero-logo-static" />
          </div>
        </div>
      </section>

      {/* ── 2. STATS ─────────────────────────────────────── */}
      <div className="stats-bar reveal-section">
        <div className="stats-inner">
          <div className="stat-item">
            <span className="stat-number">25+</span>
            <span className="stat-label">Productos en catálogo</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">Años de experiencia</span>
          </div>
        </div>
      </div>

      {/* ── 3. APLICACIONES ──────────────────────────────── */}
      <section className="aplicaciones-section reveal-section">
        <div className="contenedor">
          <div className="aplicaciones-header">
            <span className="aplicaciones-eyebrow">Aplicaciones</span>
            <h2 className="aplicaciones-title">
              Soluciones para cada <span>aplicación láctea</span>.
            </h2>
            <p className="aplicaciones-desc">
              Desarrollamos formulaciones especializadas que mejoran el sabor, el color,
              la textura y la estabilidad en una amplia variedad de productos.
            </p>
          </div>
          <div className="aplicaciones-grid">
            <Link to="/productos" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/Productos/Saborizantes/quesos/Liquidos/quesos.png`} alt="Quesos" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><i className="fa-solid fa-cheese"></i></div>
                <h3 className="aplica-card-title">Quesos</h3>
                <p className="aplica-card-text">Saborizantes, colorantes y texturizantes para quesos frescos, fundidos, maduros y análogos.</p>
              </div>
            </Link>
            <Link to="/productos" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/Productos/Saborizantes/cremas/crema.jpeg`} alt="Cremas" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><i className="fa-solid fa-droplet"></i></div>
                <h3 className="aplica-card-title">Cremas</h3>
                <p className="aplica-card-text">Saborizantes y estabilizantes para cremas ácidas, natillas y productos untables.</p>
              </div>
            </Link>
            <Link to="/productos" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/yogur.png`} alt="Yogurt" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><i className="fa-solid fa-jar"></i></div>
                <h3 className="aplica-card-title">Yogurt</h3>
                <p className="aplica-card-text">Complejos estabilizantes para yogures naturales, con frutas y bebidas lácteas fermentadas.</p>
              </div>
            </Link>
            <Link to="/productos" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/Productos/Saborizantes/leches/leche.png`} alt="Bebidas" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><i className="fa-solid fa-glass-water"></i></div>
                <h3 className="aplica-card-title">Bebidas</h3>
                <p className="aplica-card-text">Saborizantes y sistemas funcionales para bebidas lácteas, leches saborizadas y sueros.</p>
              </div>
            </Link>
            <Link to="/productos" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/helados.png`} alt="Helados" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><i className="fa-solid fa-snowflake"></i></div>
                <h3 className="aplica-card-title">Helados</h3>
                <p className="aplica-card-text">Formulaciones para helados, paletas, nieves y productos congelados con textura uniforme.</p>
              </div>
            </Link>
            <Link to="/productos" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/natilla.jpg`} alt="Postres" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><i className="fa-solid fa-cake-candles"></i></div>
                <h3 className="aplica-card-title">Postres</h3>
                <p className="aplica-card-text">Saborizantes y espesantes para flanes, natillas, cajetas y postres lácteos artesanales.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. QUIÉNES SOMOS ─────────────────────────────── */}
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

      {/* ── 5. POR QUÉ ELEGIRNOS ──────────────────────────── */}
      <section className="info-section reveal-section">
        <div className="contenedor">
          <div className="info-header">
            <span className="about-home-eyebrow">— ¿Por qué elegirnos?</span>
            <h2>Fórmulas propias para <span>cada proceso</span>.</h2>
            <p>
              No distribuimos ingredientes genéricos. Desarrollamos y vendemos
              nuestras propias formulaciones: productos diseñados específicamente
              para la industria láctea, listos para integrarse a tu proceso de
              producción.
            </p>
          </div>
          <div className="why-layout">
            <div className="why-image-col">
              <img
                src={`${BASE}img/propiospd.png`}
                alt="Formulaciones propias Metexsab — quesos, saborizantes y colorantes"
                className="why-editorial-img"
              />
            </div>
            <div className="why-blocks-col">
              <div className="why-block">
                <div className="why-block-icon">
                  <img src={`${BASE}img/frasco.png`} alt="Frasco de formulación" />
                </div>
                <div className="why-block-text">
                  <h3>Productos propios</h3>
                  <p>Contamos con 25 formulaciones desarrolladas en nuestro laboratorio, disponibles en catálogo para entrega directa a tu planta.</p>
                </div>
              </div>
              <div className="why-block">
                <div className="why-block-icon">
                  <img src={`${BASE}img/gota.png`} alt="Saborizante" />
                </div>
                <div className="why-block-text">
                  <h3>Perfiles de sabor auténticos</h3>
                  <p>Desarrollamos saborizantes para quesos, cremas, bebidas y postres con perfiles intensos, estables y consistentes en producción.</p>
                </div>
              </div>
              <div className="why-block">
                <div className="why-block-icon">
                  <img src={`${BASE}img/queso.png`} alt="Queso" />
                </div>
                <div className="why-block-text">
                  <h3>Color y funcionalidad</h3>
                  <p>Formulaciones que mejoran apariencia, textura y estabilidad en aplicaciones lácteas y alimentarias.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="why-band">
            <div className="why-band-icon">
              <i className="fa-solid fa-medal"></i>
            </div>
            <p>
              Soluciones que realzan el sabor, color y calidad de tus productos lácteos
              <span className="why-band-sep"> | </span>
              Desarrolladas para la industria, hechas para tu proceso
            </p>
            <i className="fa-solid fa-arrow-right why-band-arrow"></i>
          </div>
        </div>
      </section>

      {/* ── 6. FORMULACIONES DESTACADAS ──────────────────── */}
      <section className="formulaciones-section reveal-section">
        <div className="contenedor">
          <div className="section-header">
            <div className="section-badge">Formulaciones</div>
            <h2>Formulaciones destacadas</h2>
            <p className="section-copy">
              Soluciones reales desarrolladas para procesos específicos de la industria láctea.
            </p>
          </div>
          <div className="formulacion-list">
            <div className="formulacion-item">
              <span className="formulacion-cat">Quesos</span>
              <div className="formulacion-info">
                <h3>Retención de humedad para quesos frescos</h3>
                <p>Reduce el desuerado y mejora el rendimiento en quesos frescos y análogos. Textura uniforme y vida de anaquel extendida.</p>
              </div>
              <Link to="/productos" className="formulacion-link" aria-label="Ver producto">
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="formulacion-item">
              <span className="formulacion-cat">Saborizantes</span>
              <div className="formulacion-info">
                <h3>Perfil sabor cheddar</h3>
                <p>Saborizante líquido y en polvo para quesos análogos, fundidos y snacks con perfil auténtico e intenso.</p>
              </div>
              <Link to="/productos" className="formulacion-link" aria-label="Ver producto">
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="formulacion-item">
              <span className="formulacion-cat">Colorantes</span>
              <div className="formulacion-info">
                <h3>Colorante annatto liposoluble</h3>
                <p>Colorante natural de alta concentración para quesos, mantequillas y productos grasos. Estable a temperatura de proceso.</p>
              </div>
              <Link to="/productos" className="formulacion-link" aria-label="Ver producto">
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="formulacion-item">
              <span className="formulacion-cat">Yogurt</span>
              <div className="formulacion-info">
                <h3>Estabilizante para yogurt</h3>
                <p>Complejo estabilizante que evita la sinéresis y da cuerpo natural en yogures con y sin homogeneizado.</p>
              </div>
              <Link to="/productos" className="formulacion-link" aria-label="Ver producto">
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="formulacion-item">
              <span className="formulacion-cat">Bebidas</span>
              <div className="formulacion-info">
                <h3>Sistema para bebidas lácteas</h3>
                <p>Formulación funcional para bebidas saborizadas, leches UHT y sueros con estabilidad en anaquel y buena dispersión.</p>
              </div>
              <Link to="/productos" className="formulacion-link" aria-label="Ver producto">
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="formulacion-cta">
            <Link to="/productos" className="btn-primary">
              Ver catálogo completo <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. NUESTRO PROCESO ───────────────────────────── */}
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
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-node"><span>1</span></div>
              <div className="timeline-body">
                <h3>Análisis de necesidad</h3>
                <p>Escuchamos tu producto, proceso de producción y objetivos para entender qué ingrediente se adapta mejor.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-node"><span>2</span></div>
              <div className="timeline-body">
                <h3>Propuesta de formulación</h3>
                <p>Seleccionamos y combinamos ingredientes de nuestro catálogo para darte la solución técnica más adecuada.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-node"><span>3</span></div>
              <div className="timeline-body">
                <h3>Muestras en tu planta</h3>
                <p>Te enviamos muestras para que las pruebes en condiciones reales de producción y valides los resultados.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-node"><span>4</span></div>
              <div className="timeline-body">
                <h3>Acompañamiento técnico</h3>
                <p>Te apoyamos con ajustes y asesoría continua hasta que tu producto quede exactamente como lo necesitas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. BLOQUE EDITORIAL ──────────────────────────── */}
      <section className="editorial-section reveal-section">
        <div className="editorial-inner">
          <div className="editorial-img-wrap">
            <img
              src={`${BASE}img/propiospd.png`}
              alt="Soluciones Metexsab para producción real"
            />
          </div>
          <div className="editorial-content">
            <span className="editorial-eyebrow">Metexsab</span>
            <p className="editorial-phrase">
              "Desarrollamos soluciones pensadas para producción real."
            </p>
            <Link to="/nosotros" className="editorial-link">
              Conoce nuestra historia <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. CTA FINAL ─────────────────────────────────── */}
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
