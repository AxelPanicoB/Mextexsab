import { useState } from 'react';
import { Link } from 'react-router-dom';
import spanishValidation from '../utils/spanishValidation.js';
import { useContactModal } from '../context/ContactModalContext';
import { track } from '../utils/analytics.js';
import Turnstile from '../components/Turnstile';
import MolField from '../components/MolField.jsx';
import {
  Star, ArrowRight, Cheese, Drop, Jar, Snowflake, Cake, Medal,
  PaperPlane, CircleNotch, CheckCircle, WarningCircle, EnvelopeOpen, Envelope, ShieldCheck,
} from '@phosphor-icons/react';

const BASE = import.meta.env.BASE_URL;

function Home() {
  const { openContactModal } = useContactModal();
  const [ctaForm, setCtaForm] = useState({ name: '', email: '', phone: '' });
  const [ctaStatus, setCtaStatus] = useState(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);

  const handleCtaChange = (e) => {
    const { name, value } = e.target;
    setCtaForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCta = async (e) => {
    e.preventDefault();
    // La verificación de Cloudflare es automática y tarda un instante; si aún no termina, se pide reintentar
    if (import.meta.env.VITE_TURNSTILE_SITE_KEY && !turnstileToken) {
      setCtaStatus({ type: 'error', text: 'Un momento, estamos verificando que eres una persona real. Intenta de nuevo.' });
      return;
    }
    setCtaStatus({ type: 'loading', text: 'Enviando...' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ctaForm, interest: 'Consulta General', turnstileToken })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error al enviar.');
      track('generate_lead', { form: 'inicio' });
      setCtaStatus({ type: 'success', text: 'Te contacteremos pronto' });
      setCtaForm({ name: '', email: '', phone: '' });
    } catch (err) {
      setCtaStatus({ type: 'error', text: err.message });
    } finally {
      // el token sirve una sola vez: se pide uno nuevo para el siguiente envío
      setTurnstileToken('');
      setTurnstileKey((k) => k + 1);
    }
  };

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="hero-section">
        <MolField />

        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Expertos en <span>Aditivos</span> para la Industria Láctea
            </h1>
            <p>
              Saborizantes, espesantes, estabilizantes y texturizantes especialmente
              formulados para quesos, yogures, helados y bebidas.
            </p>
            <div className="hero-actions">
              <Link to="/productos" className="btn-white">
                Ver Catálogo <ArrowRight size={22} weight="regular" />
              </Link>
              <button type="button" className="btn-outline-white" onClick={() => openContactModal()}>
                Solicitar Cotización
              </button>
            </div>
          </div>
          <div className="hero-logo-group" aria-hidden="true">
            <img src={`${BASE}img/logo2.webp`} alt="" className="hero-logo-img" />
            <img src={`${BASE}img/MetexsabLN.webp`} alt="" className="hero-logo-static" />
          </div>
        </div>
      </section>

      {/* ── 2. APLICACIONES ──────────────────────────────── */}
      <section className="aplicaciones-section reveal-section">
        <div className="contenedor">
          <div className="aplicaciones-header">
            <span className="aplicaciones-eyebrow">Aplicaciones</span>
            <h2 className="aplicaciones-title">
              Soluciones para cada <span>aplicación láctea</span>.
            </h2>
            <p className="aplicaciones-desc">
              Formulaciones especializadas que mejoran el sabor, color,
              textura y estabilidad en una amplia variedad de productos.
            </p>
          </div>
          <div className="aplicaciones-grid">
            <Link to="/productos?app=Quesos" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/impmenuproduct/quesos.webp`} alt="Quesos" loading="lazy" decoding="async" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><Cheese size={33} weight="regular" /></div>
                <h3 className="aplica-card-title">Quesos</h3>
                <p className="aplica-card-text">Saborizantes, colorantes y texturizantes para quesos frescos, fundidos, maduros y análogos.</p>
              </div>
            </Link>
            <Link to="/productos?app=Cremas" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/Productos/Saborizantes/cremas/crema.webp`} alt="Cremas" loading="lazy" decoding="async" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><Drop size={33} weight="fill" /></div>
                <h3 className="aplica-card-title">Cremas</h3>
                <p className="aplica-card-text">Saborizantes y estabilizantes para cremas ácidas, natillas y productos untables.</p>
              </div>
            </Link>
            <Link to="/productos?app=Yogurt" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/impmenuproduct/yogurt.webp`} alt="Yogurt" loading="lazy" decoding="async" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><Jar size={33} weight="regular" /></div>
                <h3 className="aplica-card-title">Yogurt</h3>
                <p className="aplica-card-text">Complejos estabilizantes para yogures naturales, con frutas y bebidas lácteas fermentadas.</p>
              </div>
            </Link>
            <Link to="/productos?app=Bebidas" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/impmenuproduct/bebidas.webp`} alt="Bebidas" loading="lazy" decoding="async" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><Drop size={33} weight="regular" /></div>
                <h3 className="aplica-card-title">Bebidas</h3>
                <p className="aplica-card-text">Saborizantes y sistemas funcionales para bebidas lácteas, leches saborizadas y sueros.</p>
              </div>
            </Link>
            <Link to="/productos?app=Helados" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/impmenuproduct/helados.webp`} alt="Helados" loading="lazy" decoding="async" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><Snowflake size={33} weight="regular" /></div>
                <h3 className="aplica-card-title">Helados</h3>
                <p className="aplica-card-text">Formulaciones para helados, paletas, nieves y productos congelados con textura uniforme.</p>
              </div>
            </Link>
            <Link to="/productos?app=Postres" className="aplica-card">
              <div className="aplica-card-img">
                <img src={`${BASE}img/impmenuproduct/postres.webp`} alt="Postres" loading="lazy" decoding="async" />
                <div className="aplica-card-overlay" />
              </div>
              <div className="aplica-card-body">
                <div className="aplica-card-icon"><Cake size={33} weight="regular" /></div>
                <h3 className="aplica-card-title">Postres</h3>
                <p className="aplica-card-text">Saborizantes y espesantes para flanes, natillas, cajetas y postres lácteos artesanales.</p>
              </div>
            </Link>
          </div>
          <div className="why-band-wrap">
            <Link to="/productos" className="why-band">
              <div className="why-band-icon">
                <Medal size={33} weight="fill" />
              </div>
              <p>
                Soluciones que realzan el sabor, color y calidad de tus productos lácteos
                <span className="why-band-sep"> | </span>
                Desarrolladas para la industria, hechas para tu proceso
              </p>
              <ArrowRight size={27} weight="regular" className="why-band-arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. NUESTRO PROCESO ───────────────────────────── */}
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
                <h3>Análisis Diagnóstico</h3>
                <p>Escuchamos tu proceso de producción, analizamos tu producto y objetivos para identificar áreas de oportunidad.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-node"><span>2</span></div>
              <div className="timeline-body">
                <h3>Propuesta Integral</h3>
                <p>Seleccionamos y combinamos ingredientes de nuestro catálogo para darte la solución técnica más adecuada.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-node"><span>3</span></div>
              <div className="timeline-body">
                <h3>Muestras Gratuitas</h3>
                <p>Te enviamos muestras sin costo alguno para que pruebes en condiciones reales de producción y valides los resultados.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-node"><span>4</span></div>
              <div className="timeline-body">
                <h3>Seguimiento Continuo</h3>
                <p>Damos seguimiento a tus resultados, ajustamos la formulación contigo y te apoyamos en pedidos y nuevos desarrollos.</p>
              </div>
            </div>
          </div>
          <div className="process-samples-action">
            <Link to="/productos" className="samples-cta-btn">
              Solicitar muestras gratuitas <ArrowRight size={22} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. CTA FINAL ─────────────────────────────────── */}
      <section className="cta-section reveal-section">
        <div className="contenedor">
          <h2>¿Listo para mejorar tus formulaciones?</h2>
          <p>
            Déjanos tus datos y un asesor técnico se pondrá en contacto
            contigo a la brevedad.
          </p>
          <form className="cta-form" onSubmit={handleCta} {...spanishValidation}>
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
            <button type="submit" className={`btn-primary${ctaStatus?.type === 'success' ? ' success' : ''}`} disabled={ctaStatus?.type === 'success'}>
              {ctaStatus?.type === 'success' ? (
                <>
                  <Envelope size={24} weight="fill" className="icon-envelope" />
                  ¡Enviado!
                </>
              ) : (
                <>
                  <EnvelopeOpen size={24} weight="fill" className="icon-envelope" />
                  Solicitar asesoría
                </>
              )}
            </button>
          </form>
          <Turnstile onVerify={setTurnstileToken} resetKey={turnstileKey} appearance="interaction-only" />
          <p className="cta-privacy">
            <ShieldCheck size={16} weight="regular" aria-hidden="true" />
            <span>
              Al enviar aceptas el{' '}
              <a href={`${BASE}Documentos/Aviso_Privacidad_Integral_Metexsab.pdf`} target="_blank" rel="noopener noreferrer">
                Aviso de Privacidad
              </a>.
            </span>
          </p>
          {ctaStatus && (
            <p className={`cta-status ${ctaStatus.type}`}>
              {ctaStatus.type === 'loading' && <CircleNotch size={24} weight="regular" className="icon-spin" />}
              {ctaStatus.type === 'success' && <CheckCircle size={24} weight="fill" />}
              {ctaStatus.type === 'error' && <WarningCircle size={24} weight="fill" />}
              {' '}{ctaStatus.text}
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
