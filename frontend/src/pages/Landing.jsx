import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Atom, CheckCircle, Gift, ArrowRight, CaretRight } from '@phosphor-icons/react';
import ProductCardV2 from '../components/ProductCardV2.jsx';
import SamplesCta from '../components/SamplesCta.jsx';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';
import allProducts, { sortForApplication } from '../data/products.js';
import LANDINGS from '../data/landings.js';

const SITE = 'https://www.metexsab.com';

// Texto corto para los enlaces a otras páginas ("Saborizantes para quesos")
const linkLabel = (l) => l.h1.join(' ').replace(/^./, (c) => c.toUpperCase());

function pickProducts(landing) {
  if (landing.ids) return landing.ids.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean);
  if (landing.app) return sortForApplication(allProducts.filter((p) => p.applications?.includes(landing.app)), landing.app);
  if (landing.category) return allProducts.filter((p) => p.category === landing.category);
  return [];
}

// Página por tema: una URL propia para cada búsqueda importante (ver data/landings.js)
function Landing({ landing }) {
  const productsRef = useRef(null);
  const products = useMemo(() => pickProducts(landing), [landing]);

  const flavors = useMemo(() => {
    const set = new Set();
    (landing.flavorFrom || []).forEach((id) => {
      allProducts.find((p) => p.id === id)?.flavors?.forEach((f) => set.add(f));
    });
    return [...set];
  }, [landing]);

  const related = (landing.related || [])
    .map((slug) => LANDINGS.find((l) => l.slug === slug))
    .filter(Boolean);

  // Datos estructurados: ruta de navegación (Inicio > Productos > esta página)
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.landing = 'breadcrumb';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Productos', item: `${SITE}/productos` },
        { '@type': 'ListItem', position: 3, name: linkLabel(landing), item: `${SITE}/${landing.slug}` },
      ],
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [landing]);

  const goToProducts = () =>
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="unified-hero">
        <div className="unified-mol-field" aria-hidden="true">
          <svg className="m-svg m-svg-1" viewBox="0 0 80 92" fill="none">
            <polygon points="40,3 77,23 77,69 40,89 3,69 3,23" stroke="rgba(119,208,105,0.18)" strokeWidth="1.5" />
            <circle cx="40" cy="46" r="5" fill="rgba(92,184,69,0.12)" />
          </svg>
          <div className="m-dot m-dot-1" /><div className="m-dot m-dot-2" /><div className="m-dot m-dot-3" />
          <div className="m-dot m-dot-4" /><div className="m-dot m-dot-5" />
        </div>

        <div className="hero-fw-inner">
          <div className="hero-fw-text">
            <nav className="landing-crumbs" aria-label="Ruta de navegación">
              <Link to="/">Inicio</Link>
              <CaretRight size={12} weight="bold" aria-hidden="true" />
              <Link to="/productos">Productos</Link>
              <CaretRight size={12} weight="bold" aria-hidden="true" />
              <span aria-current="page">{landing.eyebrow}</span>
            </nav>
            <span className="app-hero-eyebrow">
              <Atom size={22} weight="regular" />
              {landing.eyebrow}
            </span>
            <h1 className="unified-hero-h1">
              {landing.h1[0]}<br />
              <span>{landing.h1[1]}</span>
            </h1>
            <p className="unified-hero-p">{landing.lead}</p>
          </div>
          <div className="hero-sample-cta hero-fw-stats">
            <button type="button" className="btn-sample-free" onClick={goToProducts}>
              <Gift size={27} weight="regular" />
              Ver productos y pedir muestra
            </button>
            <p className="hero-sample-hint">
              <CheckCircle size={21} weight="fill" />
              Sin costo – Probado en tu planta
            </p>
          </div>
        </div>
      </section>

      {/* ── AYUDA PARA ELEGIR (misma banda que en Productos, justo bajo el hero) ── */}
      <div className="catalog-advisor-nudge">
        <div className="contenedor">
          <p>¿Necesitas ayuda para elegir? <strong>Escríbenos y te apoyaremos de forma gratuita</strong></p>
          <a
            href={`https://wa.me/524422180650/?text=${encodeURIComponent(`Hola, vi la página de ${landing.h1.join(' ')} y me gustaría recibir asesoría`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nudge-wa"
          >
            <WhatsAppIcon size={17} /> Pregúntanos gratis
          </a>
        </div>
      </div>

      {/* ── TEXTO + BENEFICIOS ───────────────────────────────── */}
      <section className="landing-intro">
        <div className="contenedor landing-intro-grid">
          <div className="landing-intro-copy">
            <h2>{landing.introTitle}</h2>
            {landing.intro.map((text) => <p key={text.slice(0, 40)}>{text}</p>)}
          </div>
          <ul className="landing-benefits" aria-label="Ventajas">
            {landing.benefits.map((b) => (
              <li key={b}>
                <CheckCircle size={22} weight="fill" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {flavors.length > 0 && (
          <div className="contenedor landing-flavors">
            <h3>{landing.flavorsTitle || 'Perfiles disponibles'}</h3>
            <ul>
              {flavors.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        )}
      </section>

      {/* ── PRODUCTOS ────────────────────────────────────────── */}
      <section className="catalog-grid-section landing-products" ref={productsRef}>
        <div className="contenedor">
          <h2 className="landing-products-title">{landing.productsTitle}</h2>
          <div className="solution-grid-v2">
            {products.map((p) => <ProductCardV2 key={p.id} product={p} />)}
          </div>
          <div className="landing-catalog-link">
            <Link to={landing.catalog}>
              Ver más en el catálogo completo <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OTRAS SOLUCIONES ─────────────────────────────────── */}
      {related.length > 0 && (
        <section className="landing-related">
          <div className="contenedor">
            <h2>También te puede interesar</h2>
            <ul>
              {related.map((l) => (
                <li key={l.slug}>
                  <Link to={`/${l.slug}`}>{linkLabel(l)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <SamplesCta />
    </>
  );
}

export default Landing;
