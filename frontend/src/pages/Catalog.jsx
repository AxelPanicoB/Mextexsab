import { useMemo, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCardV2 from '../components/ProductCardV2.jsx';
import allProducts from '../data/products.js';
import { useContactModal } from '../context/ContactModalContext';
import { useCart } from '../context/CartContext';
import {
  Cheese, IceCream, Drop, Palette, Gear, Coffee, Jar, Cake, Bread, Stack, TestTube,
  SquaresFour, MagnifyingGlass, Atom, Gift,
  CheckCircle, RadioButton,
} from '@phosphor-icons/react';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';

const BASE = import.meta.env.BASE_URL;

const APP_CARDS = [
  {
    id: 'quesos',
    filter: 'Quesos',
    Icon: Cheese,
    label: 'Quesos',
    headline: 'Textura, rendimiento y estabilidad',
    description:
      'Sistemas funcionales que reducen el desuerado y mejoran el rendimiento en quesos frescos, análogos y pizzeros.',
    img: `${BASE}img/impmenuproduct/quesos.png`,
    benefits: ['Menor desuerado', 'Mejor textura', 'Mayor vida útil'],
  },
  {
    id: 'helados',
    filter: 'Helados',
    Icon: IceCream,
    label: 'Helados',
    headline: 'Textura perfecta y resistencia al derretimiento',
    description:
      'Formulaciones que optimizan la textura, retención de aire y resistencia a cambios de temperatura en helados.',
    img: `${BASE}img/impmenuproduct/helados.png`,
    benefits: ['Control de cristales', 'Mayor overrun', 'Estabilidad en frío'],
  },
  {
    id: 'yogurt',
    filter: 'Yogurt',
    Icon: Drop,
    label: 'Yogurt',
    headline: 'Consistencia y estabilidad en yogures y bebidas',
    description:
      'Sistemas que previenen la sinéresis, aportan viscosidad y estabilizan sólidos en yogures y bebidas lácteas.',
    img: `${BASE}img/impmenuproduct/yogurt.png`,
    benefits: ['Sin sinéresis', 'Cuerpo y viscosidad', 'Estabilidad térmica'],
  },
  {
    id: 'bebidas',
    filter: 'Bebidas',
    Icon: Coffee,
    label: 'Bebidas',
    headline: 'Estabilidad y cuerpo en bebidas lácteas',
    description:
      'Sistemas que mantienen la homogeneidad, aportan cuerpo y estabilizan emulsiones en bebidas lácteas y nutritivas.',
    img: `${BASE}img/impmenuproduct/bebidas.png`,
    benefits: ['Suspensión uniforme', 'Cuerpo y viscosidad', 'Sin sedimentación'],
  },
  {
    id: 'cremas',
    filter: 'Cremas',
    Icon: Jar,
    label: 'Cremas',
    headline: 'Consistencia y cremosidad en cremas lácteas',
    description:
      'Formulaciones que controlan la viscosidad, aportan cremosidad y prolongan la vida útil en cremas y aderezos.',
    img: `${BASE}img/Productos/Saborizantes/cremas/crema.jpeg`,
    benefits: ['Textura suave', 'Sin sinéresis', 'Mayor vida útil'],
  },
  {
    id: 'postres',
    filter: 'Postres',
    Icon: Cake,
    label: 'Postres',
    headline: 'Gelificación y textura en postres lácteos',
    description:
      'Sistemas de gelificación y estabilización para flanes, natillas, gelatinas y postres con textura firme y suave.',
    img: `${BASE}img/impmenuproduct/postres.png`,
    benefits: ['Gelificación perfecta', 'Desmoldado fácil', 'Textura uniforme'],
  },
  {
    id: 'tortillas',
    filter: 'Tortillas',
    Icon: Bread,
    label: 'Tortillas',
    headline: 'Suavidad y vida útil en tortilla de maíz y trigo',
    description:
      'Aditivos funcionales que mejoran la extensibilidad, retardan el envejecimiento y controlan la humedad en tortillas.',
    img: `${BASE}img/impmenuproduct/tortillas.png`,
    benefits: ['Mayor suavidad', 'Retarda envejecimiento', 'Menor rotura'],
  },
  {
    id: 'colorantes',
    filter: 'Colorantes',
    Icon: Palette,
    label: 'Colorantes',
    headline: 'Color natural, uniforme y estable en proceso',
    description:
      'Colorantes naturales de alta resistencia a pasteurización, tratamiento térmico y variaciones de pH.',
    img: `${BASE}img/Productos/Colorantes/Rojo_Annatto_liposoluble.png`,
    benefits: ['Tono uniforme', 'Resistencia térmica', 'Origen natural'],
  },
  {
    id: 'texturizantes',
    filter: 'Texturizantes y Estabilizantes',
    Icon: Stack,
    label: 'Texturizantes',
    headline: 'Control de textura y estabilidad en proceso',
    description:
      'Línea completa de texturizantes y estabilizantes para controlar reología, viscosidad y estabilidad en productos lácteos.',
    img: `${BASE}img/impmenuproduct/texturizante.png`,
    benefits: ['Control de viscosidad', 'Estabilidad en proceso', 'Sistemas a medida'],
  },
  {
    id: 'saborizantes',
    filter: 'Saborizantes',
    Icon: Drop,
    label: 'Saborizantes',
    headline: 'Sabor auténtico e intenso en productos lácteos',
    description:
      'Saborizantes naturales y artificiales de alta intensidad y resistencia térmica para quesos, yogures, helados y bebidas.',
    img: `${BASE}img/impmenuproduct/saborizantes.png`,
    benefits: ['Alta intensidad', 'Resistencia térmica', 'Origen natural'],
  },
  {
    id: 'auxiliares',
    filter: 'Auxiliares de proceso',
    Icon: Gear,
    label: 'Auxiliares',
    headline: 'Optimización funcional del proceso productivo',
    description:
      'Aditivos funcionales para controlar la emulsificación, regular el pH y mejorar la conservación.',
    img: `${BASE}img/Productos/Auxiliares de proceso/conservador natural láctico.png`,
    benefits: ['Mejor emulsificación', 'Control de pH', 'Mayor vida útil'],
  },
];

const TECH_LINES = [
  'Texturizantes y Estabilizantes',
  'Saborizantes',
  'Colorantes',
  'Auxiliares de proceso',
];

const APPLICATIONS = [
  'Quesos',
  'Yogurt',
  'Helados',
  'Bebidas',
  'Cremas',
  'Postres',
  'Tortillas',
];

const FILTER_ICONS = {
  'Todos':                          SquaresFour,
  'Quesos':                         Cheese,
  'Yogurt':                         Drop,
  'Helados':                        IceCream,
  'Bebidas':                        Coffee,
  'Cremas':                         Jar,
  'Postres':                        Cake,
  'Tortillas':                      Bread,
  'Texturizantes y Estabilizantes': Stack,
  'Saborizantes':                   Drop,
  'Colorantes':                     Palette,
  'Auxiliares de proceso':          Gear,
};

const DISPLAY_LABELS = {
  'Auxiliares de proceso':          'Conservadores',
  'Texturizantes y Estabilizantes': 'Textura y consistencia',
};

function Catalog() {
  const location = useLocation();
  const { openContactModal } = useContactModal();
  const { openPanel } = useCart();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [search, setSearch]             = useState('');
  const catalogRef = useRef(null);

  const scrollToCatalog = () => {
    setTimeout(() => {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  useEffect(() => {
    const params   = new URLSearchParams(location.search);
    const tabParam = params.get('tab') || params.get('app');
    if (!tabParam) return;
    const appMatch = APPLICATIONS.find((a) => a.toLowerCase() === tabParam.toLowerCase());
    if (appMatch) {
      setActiveFilter(appMatch);
    } else {
      const lineMatch = TECH_LINES.find((l) => l.toLowerCase().includes(tabParam.toLowerCase()));
      if (lineMatch) {
        setActiveFilter(lineMatch);
      }
    }
    scrollToCatalog();
  }, [location.search]);

  const handleChipFilter = (filter) => {
    setActiveFilter(filter);
  };

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchFilter =
        activeFilter === 'Todos' ||
        (APPLICATIONS.includes(activeFilter)
          ? p.applications?.includes(activeFilter)
          : p.category === activeFilter);
      const matchSearch = [p.name, p.summary, p.category, ...(p.tags || [])]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [activeFilter, search]);


  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
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
          <div className="m-dot m-dot-1"/><div className="m-dot m-dot-2"/><div className="m-dot m-dot-3"/>
          <div className="m-dot m-dot-4"/><div className="m-dot m-dot-5"/>
        </div>

        <div className="hero-fw-inner">
          <div className="hero-fw-text">
            <span className="app-hero-eyebrow">
              <Atom size={22} weight="regular" />
              Productos
            </span>
            <h1 className="unified-hero-h1">
              Ingredientes funcionales para<br/>
              <span>cada proceso alimentario</span>
            </h1>
            <p className="unified-hero-p">
              Soluciones especializadas que mejoran la estabilidad,
              textura, rendimiento y calidad en procesos industriales.
            </p>
          </div>
          <div className="hero-sample-cta hero-fw-stats">
            <button type="button" className="btn-sample-free" onClick={openPanel}>
              <Gift size={27} weight="regular" />
              Solicitar muestra gratuita
            </button>
            <p className="hero-sample-hint">
              <CheckCircle size={21} weight="fill" />
              Sin costo · Probada en tu planta
            </p>
          </div>
        </div>
      </section>

      {/* ── CATEGORY PICKER ───────────────────────────────────── */}
      <section className="cat-picker-section">
        <div className="contenedor">
          <p className="cat-picker-eyebrow">¿Qué produces?</p>
          <div className="cat-picker-grid">
            {APP_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                className={`cat-card${activeFilter === card.filter ? ' cat-card--active' : ''}`}
                onClick={() => { handleChipFilter(card.filter); scrollToCatalog(); }}
              >
                <img src={encodeURI(card.img)} alt={card.label} />
                <div className="cat-card-overlay" />
                {activeFilter === card.filter && (
                  <div className="cat-card-check"><CheckCircle size={20} weight="fill" /></div>
                )}
                <div className="cat-card-label">
                  <card.Icon size={16} weight="fill" />
                  <span>{card.label}</span>
                </div>
              </button>
            ))}
            <button
              type="button"
              className={`cat-card cat-card--all${activeFilter === 'Todos' ? ' cat-card--active' : ''}`}
              onClick={() => handleChipFilter('Todos')}
            >
              <div className="cat-card-all-bg" aria-hidden="true">
                <SquaresFour size={36} weight="regular" />
              </div>
              <div className="cat-card-label">
                <span>Ver todos</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ── BANNER ASESOR ────────────────────────────────────── */}
      <div className="catalog-advisor-nudge">
        <div className="contenedor">
          <p>¿No sabes cuál elegir? <strong>Te ayudamos a encontrar el indicado</strong></p>
          <a
            href={`https://wa.me/524422758979/?text=${encodeURIComponent('Hola, estoy en el catálogo y no sé qué producto me conviene, ¿me pueden ayudar?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nudge-wa"
          >
            <WhatsAppIcon size={17} /> Pregúntanos gratis
          </a>
        </div>
      </div>

      {/* ── GRID DE PRODUCTOS ─────────────────────────────────── */}
      <section className="catalog-grid-section" ref={catalogRef}>
        <div className="contenedor">
          <div className="catalog-search-simple">
            <MagnifyingGlass size={20} weight="regular" />
            <input
              type="search"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar productos"
            />
          </div>

          {activeFilter !== 'Todos' && (
            <h2 className="active-cat-title">{DISPLAY_LABELS[activeFilter] || activeFilter}</h2>
          )}

          {filtered.length > 0 && (
            <div className="catalog-results-header">
              <span className="filter-count">
                {filtered.length} {filtered.length === 1 ? 'solución' : 'soluciones'}
              </span>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="catalog-empty">
              <TestTube size={60} weight="regular" />
              <p>No se encontraron soluciones con esos filtros.</p>
              <button
                type="button"
                onClick={() => { setActiveFilter('Todos'); setSearch(''); }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="solution-grid-v2">
              {filtered.map((p) => <ProductCardV2 key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────── */}
      <section className="catalog-bottom-cta">
        <div className="catalog-cta-glow" aria-hidden="true" />
        <div className="contenedor">
          <div className="catalog-cta-inner">
            <div className="catalog-cta-wa-badge">
              <WhatsAppIcon size={44} />
            </div>
            <div className="catalog-cta-text">
              <h3>¿Buscas algo específico<br/>para tu proceso?</h3>
              <p>
                Cuéntanos tu aplicación y un asesor técnico te ayuda a encontrar
                la solución ideal para tu producto.
              </p>
            </div>
            <a
              className="btn-catalog-cta"
              href={`https://wa.me/524422758979/?text=${encodeURIComponent('Hola, vengo del catálogo de productos y me gustaría recibir asesoría técnica')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={22} />
              Escríbenos directamente
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Catalog;
