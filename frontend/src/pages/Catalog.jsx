import { useMemo, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import allProducts from '../data/products.js';
import { useContactModal } from '../context/ContactModalContext';
import { useCart } from '../context/CartContext';
import {
  Cheese, IceCream, Drop, Palette, Gear, Coffee, Jar, Cake, Bread, Stack, TestTube,
  SquaresFour, CaretLeft, CaretRight, MagnifyingGlass, Atom, Gift,
  CheckCircle, RadioButton,
} from '@phosphor-icons/react';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';

const BASE = import.meta.env.BASE_URL;

/* ── Tarjetas de aplicación por industria ─────────────────────── */
const APP_CARDS = [
  {
    id: 'quesos',
    filter: 'Quesos',
    Icon: Cheese,
    label: 'Quesos',
    headline: 'Textura, rendimiento y estabilidad',
    description:
      'Sistemas funcionales que reducen el desuerado y mejoran el rendimiento en quesos frescos, análogos y pizzeros.',
    img: `${BASE}img/Productos/Saborizantes/quesos/Liquidos/quesos.png`,
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
    img: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/helados.png`,
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
    img: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/yogur.png`,
    benefits: ['Sin sinéresis', 'Cuerpo y viscosidad', 'Estabilidad térmica'],
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
    id: 'auxiliares',
    filter: 'Auxiliares de proceso',
    Icon: Gear,
    label: 'Auxiliares',
    headline: 'Optimización funcional del proceso productivo',
    description:
      'Aditivos funcionales para controlar la emulsificación, regular el pH y mejorar la conservación.',
    img: `${BASE}img/Productos/Auxiliares de proceso/Emulsificante destilado concentrado.jpg`,
    benefits: ['Mejor emulsificación', 'Control de pH', 'Mayor vida útil'],
  },
  {
    id: 'bebidas',
    filter: 'Bebidas',
    Icon: Coffee,
    label: 'Bebidas',
    headline: 'Estabilidad y cuerpo en bebidas lácteas',
    description:
      'Sistemas que mantienen la homogeneidad, aportan cuerpo y estabilizan emulsiones en bebidas lácteas y nutritivas.',
    img: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/yogur.png`,
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
    img: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/yogur.png`,
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
    img: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/yogur.png`,
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
    img: `${BASE}img/Productos/Auxiliares de proceso/Emulsificante destilado concentrado.jpg`,
    benefits: ['Mayor suavidad', 'Retarda envejecimiento', 'Menor rotura'],
  },
  {
    id: 'texturizantes',
    filter: 'Texturizantes y Estabilizantes',
    Icon: Stack,
    label: 'Texturizantes',
    headline: 'Control de textura y estabilidad en proceso',
    description:
      'Línea completa de texturizantes y estabilizantes para controlar reología, viscosidad y estabilidad en productos lácteos.',
    img: `${BASE}img/Productos/Colorantes/Rojo_Annatto_liposoluble.png`,
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
    img: `${BASE}img/Productos/Saborizantes/quesos/Liquidos/quesos.png`,
    benefits: ['Alta intensidad', 'Resistencia térmica', 'Origen natural'],
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

function Catalog() {
  const location = useLocation();
  const { openContactModal } = useContactModal();
  const { openPanel } = useCart();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [activeApp, setActiveApp]       = useState(null);
  const [search, setSearch]             = useState('');
  const chipsRef   = useRef(null);
  const catalogRef = useRef(null);

  const scrollChips   = (dir) => chipsRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  const scrollToCatalog = () => {
    setTimeout(() => {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  /* Sincronizar con ?tab= / ?app= de la URL */
  useEffect(() => {
    const params   = new URLSearchParams(location.search);
    const tabParam = params.get('tab') || params.get('app');
    if (!tabParam) return;
    const appMatch = APPLICATIONS.find((a) => a.toLowerCase() === tabParam.toLowerCase());
    if (appMatch) {
      setActiveFilter(appMatch);
      const card = APP_CARDS.find((c) => c.filter === appMatch);
      setActiveApp(card ? card.id : null);
    } else {
      const lineMatch = TECH_LINES.find((l) => l.toLowerCase().includes(tabParam.toLowerCase()));
      if (lineMatch) {
        setActiveFilter(lineMatch);
        const card = APP_CARDS.find((c) => c.filter === lineMatch);
        setActiveApp(card ? card.id : null);
      }
    }
    scrollToCatalog();
  }, [location.search]);

  /* Clic en chip de filtro */
  const handleChipFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === 'Todos') {
      setActiveApp(null);
    } else {
      const match = APP_CARDS.find((c) => c.filter === filter);
      setActiveApp(match ? match.id : null);
    }
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

  const activeAppData = APP_CARDS.find((c) => c.id === activeApp);

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────── */}
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
              Soluciones técnicas especializadas que mejoran la estabilidad,
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
              Sin costo · Probada en tu planta · Asesoría técnica incluida
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. FILTER BAR ────────────────────────────────────────── */}
      <div className="catalog-filter-bar" ref={catalogRef}>
        <div className="contenedor">
          <div className="filter-cat-section">
            <p className="filter-cat-heading">Explora nuestras categorías</p>
            <div className="filter-chips-row">
              <button
                type="button"
                className="cat-arrow"
                onClick={() => scrollChips(-1)}
                aria-label="Anterior"
              >
                <CaretLeft size={24} weight="bold" />
              </button>
              <div className="filter-chips" ref={chipsRef}>
                <button
                  type="button"
                  className={`filter-chip${activeFilter === 'Todos' ? ' active' : ''}`}
                  onClick={() => handleChipFilter('Todos')}
                >
                  <SquaresFour size={22} weight="regular" />
                  <span>Todos</span>
                </button>
                {APPLICATIONS.map((app) => {
                  const ChipIcon = FILTER_ICONS[app] || RadioButton;
                  return (
                    <button
                      key={app}
                      type="button"
                      className={`filter-chip${activeFilter === app ? ' active' : ''}`}
                      onClick={() => handleChipFilter(app)}
                    >
                      <ChipIcon size={22} weight="regular" />
                      <span>{app}</span>
                    </button>
                  );
                })}
                {TECH_LINES.map((line) => {
                  const ChipIcon = FILTER_ICONS[line] || RadioButton;
                  return (
                    <button
                      key={line}
                      type="button"
                      className={`filter-chip${activeFilter === line ? ' active' : ''}`}
                      onClick={() => handleChipFilter(line)}
                    >
                      <ChipIcon size={22} weight="regular" />
                      <span>{line}</span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                className="cat-arrow"
                onClick={() => scrollChips(1)}
                aria-label="Siguiente"
              >
                <CaretRight size={24} weight="bold" />
              </button>
            </div>
          </div>

          <div className="filter-search-wrap">
            <MagnifyingGlass size={24} weight="regular" />
            <input
              type="search"
              placeholder="Buscar soluciones, aplicaciones o ingredientes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar soluciones"
            />
          </div>
        </div>
      </div>

      {/* ── 5. CONTEXT STRIP (condicional) ───────────────────────── */}
      {activeAppData && (
        <div className="catalog-app-context" key={activeApp}>
          <div className="contenedor">
            <div className="catalog-app-context-inner">
              <div className="catalog-app-context-icon">
                <activeAppData.Icon size={33} weight="regular" />
              </div>
              <div className="catalog-app-context-content">
                <div className="catalog-app-context-text">
                  <p className="catalog-app-context-title">{activeAppData.headline}</p>
                  <p className="catalog-app-context-desc">{activeAppData.description}</p>
                </div>
                <div className="catalog-app-context-benefits">
                  {activeAppData.benefits.map((b) => (
                    <span key={b} className="catalog-app-context-benefit">
                      <CheckCircle size={18} weight="fill" /> {b}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="catalog-app-context-cta"
                onClick={() => openContactModal(activeAppData.label)}
              >
                Solicitar formulación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. GRID DE PRODUCTOS ─────────────────────────────────── */}
      <section className="catalog-grid-section">
        <div className="contenedor">
          {activeFilter !== 'Todos' && (
            <h2 className="active-cat-title">{activeFilter}</h2>
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
                onClick={() => { setActiveFilter('Todos'); setSearch(''); setActiveApp(null); }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="solution-grid">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── 6. CTA FINAL ─────────────────────────────────────────── */}
      <section className="catalog-bottom-cta reveal-section">
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
