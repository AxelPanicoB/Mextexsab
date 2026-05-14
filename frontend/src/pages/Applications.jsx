import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useContactModal } from '../context/ContactModalContext';

const BASE = import.meta.env.BASE_URL;

const CATEGORIES = [
  {
    id: 'quesos',
    icon: 'fa-cheese',
    label: 'Quesos',
    heroImg: `${BASE}img/Productos/Saborizantes/quesos/Liquidos/quesos.png`,
    headline: 'Textura, rendimiento y estabilidad',
    objective: 'Maximizar el rendimiento y garantizar la textura, estabilidad y vida de anaquel del producto final.',
    description:
      'Sistemas funcionales que reducen el desuerado, mejoran la estructura y aumentan el rendimiento en quesos frescos, análogos y pizzeros.',
    types: [
      {
        name: 'Quesos frescos',
        note: 'Panela · Ranchero · Morral',
        img: `${BASE}img/Productos/Saborizantes/quesos/Liquidos/quesos.png`,
        desc: 'Reduce el desuerado, mejora la textura y aumenta el rendimiento en quesos tipo panela, ranchero y morral.',
      },
      {
        name: 'Quesos análogos y pizzero',
        img: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para Queso Cheddar.png`,
        desc: 'Mejora elasticidad, fundido y estabilidad en quesos para pizza y análogos a altas temperaturas de proceso.',
      },
      {
        name: 'Cremas y aderezos',
        img: `${BASE}img/Productos/Saborizantes/cremas/crema.jpeg`,
        desc: 'Aporta cuerpo, cremosidad y brillo en cremas ácidas, aderezos y productos de alto contenido de agua.',
      },
    ],
    benefits: [
      { icon: 'fa-solid fa-droplet-slash', title: 'Menor desuerado', desc: 'Reduce la sinéresis y pérdida de suero durante el proceso y almacenamiento.' },
      { icon: 'fa-solid fa-star',           title: 'Mejor textura',   desc: 'Estructura firme y homogénea, mejor corte y presentación final del producto.' },
      { icon: 'fa-solid fa-calendar-check', title: 'Mayor vida útil', desc: 'Estabilidad microbiológica y fisicoquímica extendida en anaquel.' },
    ],
    solutions: [
      { code: 'QRH-40-004',  name: 'Retenedor de humedad y texturizante', desc: 'Aumenta rendimiento y reduce desuerado en quesos frescos y análogos.' },
      { code: 'FLA-20-005',  name: 'Carragenina refinada',                desc: 'Mejora textura, cuerpo y reduce pérdida de finos en corte.' },
      { code: 'CRE-40-023',  name: 'Estabilizante / emulsionante',        desc: 'Cuerpo, cremosidad y brillo en cremas ácidas.' },
      { code: 'CRE-40-020',  name: 'Espesante para cremas',               desc: 'Textura uniforme y estable en aderezos y cremas ácidas.' },
    ],
    solutionImg: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para Queso Cheddar.png`,
  },
  {
    id: 'helados',
    icon: 'fa-ice-cream',
    label: 'Helados',
    heroImg: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/helados.png`,
    headline: 'Textura perfecta y resistencia al derretimiento',
    objective: 'Controlar la cristalización, mejorar el overrun y garantizar estabilidad en toda la cadena de frío.',
    description:
      'Formulaciones que optimizan la textura, retención de aire y resistencia a cambios de temperatura en helados, cremas montadas y postres congelados.',
    types: [
      {
        name: 'Helados y cremas montadas',
        img: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/helados.png`,
        desc: 'Mejora el overrun, controla la cristalización y aporta suavidad al paladar sin alterar el perfil de sabor.',
      },
      {
        name: 'Postres y paletas congeladas',
        img: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/natilla.jpg`,
        desc: 'Controla el tamaño de cristales de hielo y mejora la resistencia al derretimiento en paletas y postres.',
      },
    ],
    benefits: [
      { icon: 'fa-solid fa-snowflake',      title: 'Control de cristales', desc: 'Cristales de hielo más pequeños para textura suave y homogénea.' },
      { icon: 'fa-solid fa-wind',            title: 'Mayor overrun',        desc: 'Incorporación óptima de aire para mejor rendimiento y textura cremosa.' },
      { icon: 'fa-solid fa-temperature-low', title: 'Estabilidad en frío',  desc: 'Resistencia al choque térmico y ciclos de congelación-descongelación.' },
    ],
    solutions: [
      { code: 'CREB-0265',    name: 'Agente aireante y estabilizante',        desc: 'Hidratación a temperatura ambiente, sin necesidad de pasteurización.' },
      { code: 'EBH-40-033',   name: 'Estabilizante / emulsificante vegetal',  desc: 'Controla cristalización en bases vegetales y de mantequilla.' },
      { code: 'NPB-10-023',   name: 'Mezcla de gomas naturales',              desc: 'Controla cristales de hielo y mejora resistencia al derretimiento.' },
    ],
    solutionImg: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizanteemulsificante.jpg`,
  },
  {
    id: 'yogurt',
    icon: 'fa-bottle-droplet',
    label: 'Yogurt',
    heroImg: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/yogur.png`,
    headline: 'Consistencia y estabilidad en yogures y bebidas',
    objective: 'Evitar la sinéresis, aportar cuerpo y garantizar estabilidad durante toda la vida de anaquel del producto.',
    description:
      'Sistemas funcionales que previenen la sinéresis, aportan viscosidad y estabilizan sólidos en yogures batidos, bebibles, concentrados y fórmulas UHT.',
    types: [
      {
        name: 'Yogurt batido y bebible',
        img: `${BASE}img/Productos/Saborizantes/Yogurt,helados,bebidas,cajeras,natillas/yogur.png`,
        desc: 'Proporciona consistencia, previene sinéresis y mantiene estabilidad durante el almacenamiento refrigerado.',
      },
      {
        name: 'Bebidas lácteas y concentrados',
        img: `${BASE}img/Productos/Saborizantes/leches/leche.png`,
        desc: 'Desarrolla viscosidad inmediata y estabiliza sólidos en suspensión sin afectar el perfil de sabor.',
      },
      {
        name: 'Fórmulas UHT / HTST',
        img: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizante  espesante para leches.png`,
        desc: 'Previene precipitación de proteínas bajo tratamiento térmico severo en productos de larga vida.',
      },
    ],
    benefits: [
      { icon: 'fa-solid fa-layer-group',      title: 'Sin sinéresis',     desc: 'Eliminación de la separación de suero durante el almacenamiento.' },
      { icon: 'fa-solid fa-glass-water',       title: 'Cuerpo y viscosidad', desc: 'Textura fluida y consistente, ideal para bebibles y batidos.' },
      { icon: 'fa-solid fa-fire-flame-curved', title: 'Estabilidad térmica', desc: 'Resistencia a tratamientos UHT y HTST sin precipitación de proteínas.' },
    ],
    solutions: [
      { code: 'Serie EYGR',  name: 'Sistema estabilizante para yogurt',       desc: 'Consistencia y prevención de sinéresis con y sin homogeneizado.' },
      { code: 'BCP-20-029',  name: 'Texturizante para bebidas instantáneas',  desc: 'Viscosidad inmediata y estabilización de sólidos en suspensión.' },
      { code: 'BCP-20-030',  name: 'Texturizante para concentrados con pulpa', desc: 'Cuerpo y viscosidad sin afectar el perfil de sabor.' },
      { code: 'LEF-40-022',  name: 'Estabilizante UHT / HTST',               desc: 'Previene precipitación de proteínas bajo tratamiento térmico severo.' },
    ],
    solutionImg: `${BASE}img/Productos/Texturizantes y Estabilizntes/Estabilizantesespesantes para Yogurt.jpg`,
  },
  {
    id: 'colorantes',
    icon: 'fa-palette',
    label: 'Colorantes',
    heroImg: `${BASE}img/Productos/Colorantes/Rojo_Annatto_liposoluble.png`,
    headline: 'Color natural, uniforme y estable en proceso',
    objective: 'Lograr tonalidades uniformes y estables que resistan el proceso térmico y mantengan su intensidad durante la vida de anaquel.',
    description:
      'Colorantes naturales y suspensiones estabilizadas de alta resistencia a pasteurización, tratamiento térmico y variaciones de pH.',
    types: [
      {
        name: 'Colorantes naturales de achiote',
        img: `${BASE}img/Productos/Colorantes/Rojo_Annatto_liposoluble.png`,
        desc: 'Tonos de amarillo a naranja intenso para quesos, mantequillas, productos grasos y confitería.',
      },
      {
        name: 'Colorantes inorgánicos',
        img: `${BASE}img/Productos/Colorantes/Dioxido-de-titanio.png`,
        desc: 'Blanqueamiento intenso y uniforme resistente a pasteurización y altas temperaturas de proceso.',
      },
    ],
    benefits: [
      { icon: 'fa-solid fa-circle-half-stroke', title: 'Tono uniforme',     desc: 'Distribución homogénea del color en toda la masa del producto.' },
      { icon: 'fa-solid fa-fire',               title: 'Resistencia térmica', desc: 'Color estable bajo pasteurización, HTST y otros tratamientos térmicos.' },
      { icon: 'fa-solid fa-leaf',               title: 'Origen natural',    desc: 'Basados en achiote (bixina / norbixina) para uso alimentario seguro.' },
    ],
    solutions: [
      { code: 'MTXX-8020', name: 'Achiote en suspensión oleosa',        desc: 'Tonos amarillo a naranja. Resistente a pasteurización para lácteos.' },
      { code: 'MTXX-8040', name: 'Achiote concentrado alta intensidad', desc: 'Mayor concentración para lácteos, confitería y productos grasos.' },
      { code: 'DTI-4022',  name: 'Dióxido de titanio en suspensión',    desc: 'Blanco intenso resistente a pasteurización y tratamiento térmico.' },
    ],
    solutionImg: `${BASE}img/Productos/Colorantes/Dioxido-de-titanio.png`,
  },
  {
    id: 'auxiliares',
    icon: 'fa-gear',
    label: 'Auxiliares',
    heroImg: `${BASE}img/Productos/Auxiliares de proceso/Emulsificante destilado concentrado.jpg`,
    headline: 'Optimización funcional del proceso productivo',
    objective: 'Mejorar la eficiencia del proceso, estabilizar el pH y extender la vida de anaquel del producto terminado.',
    description:
      'Aditivos funcionales para controlar la emulsificación, regular el pH y mejorar la conservación en todo tipo de productos lácteos.',
    types: [
      {
        name: 'Emulsionantes de proceso',
        img: `${BASE}img/Productos/Auxiliares de proceso/Emulsificante destilado concentrado.jpg`,
        desc: 'Mejora textura y estabilidad emulsificando grasas sin aportar sabor ni color al producto final.',
      },
      {
        name: 'Conservadores y reguladores de pH',
        img: `${BASE}img/Productos/Auxiliares de proceso/conservador natural láctico.png`,
        desc: 'Buffer natural de pH y conservador para lácteos, dulces y productos de alta humedad.',
      },
    ],
    benefits: [
      { icon: 'fa-solid fa-arrows-spin',    title: 'Mejor emulsificación', desc: 'Distribución uniforme de grasas y estabilidad de emulsión en el producto.' },
      { icon: 'fa-solid fa-flask',          title: 'Control de pH',       desc: 'Regulación del pH para mayor estabilidad y seguridad microbiológica.' },
      { icon: 'fa-solid fa-shield-halved',  title: 'Mayor vida útil',     desc: 'Conservación natural que extiende la vida de anaquel sin alterar el sabor.' },
    ],
    solutions: [
      { code: 'EML-30-010',        name: 'Emulsionante natural concentrado', desc: 'Mínimo 90% de concentración. Mejora textura sin sabor graso.' },
      { code: 'MTS-LACTO-70-003',  name: 'Lactato de sodio 60%',            desc: 'Buffer de pH y conservador natural para lácteos y dulces.' },
    ],
    solutionImg: `${BASE}img/Productos/Auxiliares de proceso/conservador natural láctico.png`,
  },
];

const FEATURES = [
  { icon: 'fa-solid fa-flask',           title: 'Desarrollo a la medida', desc: 'Formulaciones personalizadas para tu proceso y producto.' },
  { icon: 'fa-solid fa-clipboard-check', title: 'Respaldo técnico',       desc: 'Acompañamiento en pruebas, escalamiento e implementación.' },
  { icon: 'fa-solid fa-chart-line',      title: 'Resultados medibles',    desc: 'Mejora de rendimiento, calidad y vida de anaquel.' },
  { icon: 'fa-solid fa-shield-halved',   title: 'Calidad garantizada',    desc: 'Estándares de inocuidad y calidad alimentaria.' },
];

function Applications() {
  const { openContactModal } = useContactModal();
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(() => {
    const t = searchParams.get('tab');
    return CATEGORIES.some(a => a.id === t) ? t : 'quesos';
  });

  const cat = CATEGORIES.find(a => a.id === active);

  useEffect(() => {
    const t = searchParams.get('tab');
    if (t && CATEGORIES.some(a => a.id === t)) setActive(t);
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="app2-hero">
        <div className="app2-hero-text">
          <span className="app2-eyebrow">APLICACIONES</span>
          <h1 className="app2-hero-h1">
            Soluciones diseñadas<br />
            para cada{' '}
            <span className="app2-gradient">aplicación</span>
          </h1>
          <p className="app2-hero-p">
            Desarrollamos formulaciones especializadas que resuelven retos
            específicos en procesos lácteos y mejoran los resultados de tu
            producción.
          </p>
        </div>
        <div className="app2-hero-img">
          <img key={cat.id} src={cat.heroImg} alt={cat.label} />
          <div className="app2-hero-img-overlay" />
        </div>
      </section>

      {/* ── 2. CATEGORY NAV ─────────────────────────────────────── */}
      <nav className="app2-nav" aria-label="Categorías de aplicación">
        <div className="contenedor">
          <div className="app2-nav-inner">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`app2-nav-btn${active === c.id ? ' is-active' : ''}`}
                onClick={() => setActive(c.id)}
              >
                <i className={`fa-solid ${c.icon}`}></i>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 3–5. DYNAMIC CATEGORY CONTENT ───────────────────────── */}
      <div className="app2-content" key={cat.id}>

        {/* 3. OVERVIEW */}
        <section className="app2-overview">
          <div className="contenedor">
            <div className="app2-overview-grid">
              <div className="app2-overview-left">
                <div className="app2-overview-icon">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h2 className="app2-overview-title">{cat.headline}</h2>
                <p className="app2-overview-desc">{cat.description}</p>
              </div>
              <div className="app2-overview-card">
                <span className="app2-overview-card-label">Nuestro objetivo</span>
                <p className="app2-overview-card-text">{cat.objective}</p>
                <button
                  type="button"
                  className="app2-overview-cta"
                  onClick={() => openContactModal(cat.label)}
                >
                  Solicitar formulación
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. APPLICATION TYPES */}
        <section className="app2-types">
          <div className="contenedor">
            <div className="app2-section-header">
              <span className="app2-eyebrow">Tipos de aplicación</span>
              <h2 className="app2-section-title">¿En qué productos lo usamos?</h2>
            </div>
            <div className={`app2-types-grid app2-types-grid--${cat.types.length}`}>
              {cat.types.map((t) => (
                <article key={t.name} className="app2-type-card">
                  <div className="app2-type-card-img">
                    <img src={t.img} alt={t.name} />
                    <div className="app2-type-card-overlay" />
                  </div>
                  <div className="app2-type-card-body">
                    {t.note && <span className="app2-type-note">{t.note}</span>}
                    <h3 className="app2-type-name">{t.name}</h3>
                    <p className="app2-type-desc">{t.desc}</p>
                    <button
                      type="button"
                      className="app2-type-cta"
                      onClick={() => openContactModal(t.name)}
                    >
                      Ver soluciones
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. DETAILED SOLUTION BLOCK */}
        <section className="app2-detail">
          <div className="contenedor">
            <div className="app2-section-header">
              <span className="app2-eyebrow">Formulaciones técnicas</span>
              <h2 className="app2-section-title">Soluciones recomendadas</h2>
            </div>
            <div className="app2-detail-grid">
              <div className="app2-detail-left">
                <div className="app2-detail-img">
                  <img src={cat.solutionImg} alt={cat.label} />
                </div>
                <div className="app2-benefits-list">
                  {cat.benefits.map((b) => (
                    <div key={b.title} className="app2-benefit">
                      <div className="app2-benefit-icon">
                        <i className={b.icon}></i>
                      </div>
                      <div className="app2-benefit-text">
                        <h4>{b.title}</h4>
                        <p>{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="app2-solutions-list">
                {cat.solutions.map((s) => (
                  <div key={s.code} className="app2-solution-row">
                    <div className="app2-solution-info">
                      <span className="app2-solution-code">{s.code}</span>
                      <p className="app2-solution-name">{s.name}</p>
                      <p className="app2-solution-desc">{s.desc}</p>
                    </div>
                    <Link
                      to="/productos"
                      className="app2-solution-arrow"
                      aria-label="Ver en catálogo"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                ))}
                <div className="app2-solutions-footer">
                  <Link to="/productos" className="app2-catalog-link">
                    <i className="fa-solid fa-book-open"></i>
                    Ver catálogo completo
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>{/* /app2-content */}

      {/* ── 6. INTERMEDIATE CTA ─────────────────────────────────── */}
      <section className="app2-cta-mid">
        <div className="contenedor">
          <div className="app2-cta-mid-inner">
            <div className="app2-cta-mid-text">
              <h3>¿No encuentras la solución que necesitas?</h3>
              <p>Nuestro equipo técnico puede desarrollar una formulación a la medida de tu proceso.</p>
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={() => openContactModal()}
            >
              Hablar con un especialista
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* ── 7. BENEFITS STRIP ───────────────────────────────────── */}
      <section className="app2-features">
        <div className="contenedor">
          <div className="app2-features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="app2-feature">
                <div className="app2-feature-icon">
                  <i className={f.icon}></i>
                </div>
                <div>
                  <p className="app2-feature-title">{f.title}</p>
                  <p className="app2-feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Applications;
