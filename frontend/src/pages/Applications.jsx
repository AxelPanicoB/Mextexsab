import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const APPLICATIONS = [
  {
    id: 'quesos',
    icon: 'fa-cheese',
    label: 'Quesos y Cremas',
    description: 'Texturizantes y estabilizantes para retención de humedad, cuerpo y control de sinéresis en quesos frescos, análogos y cremas ácidas.',
    subcategories: [
      {
        name: 'Quesos Frescos',
        note: 'Panela, Ranchero, Morral, Canasto',
        products: [
          { code: 'QRH-40-004', desc: 'Retenedor de humedad y texturizante. Aumenta rendimiento y reduce desuerado en quesos frescos y análogos.' },
          { code: 'FLA-20-005', desc: 'Carragenina refinada. Mejora textura, cuerpo y reduce pérdida de finos en corte.' },
        ],
      },
      {
        name: 'Quesos Análogos y Pizzeros',
        products: [
          { code: 'QRH-50-064', desc: 'Forma gel termorresistente. Previene excesiva fluidez en queso para pizza y evita requemado.' },
        ],
      },
      {
        name: 'Cremas Ácidas y Aderezos',
        products: [
          { code: 'CRE-40-023', desc: 'Estabilizante/emulsionante de bajo contenido graso. Aporta cuerpo, cremosidad y brillo.' },
          { code: 'CRE-40-020', desc: 'Espesante para cremas ácidas y aderezos. Textura uniforme y estable.' },
        ],
      },
    ],
  },
  {
    id: 'helados',
    icon: 'fa-ice-cream',
    label: 'Helados y Postres',
    description: 'Soluciones para controlar textura, retención de aire y cristales de hielo en helados, cremas montadas y postres congelados.',
    subcategories: [
      {
        name: 'Cremas Montadas y Helados Aireados',
        products: [
          { code: 'CREB-0265', desc: 'Agente aireante y estabilizante. Hidratación a temperatura ambiente, sin necesidad de pasteurización.' },
          { code: 'EBH-40-033', desc: 'Estabilizante/emulsificante para bases vegetales y de mantequilla. Controla cristalización.' },
        ],
      },
      {
        name: 'Productos Congelados y Paletas',
        products: [
          { code: 'NPB-10-023', desc: 'Mezcla de gomas naturales. Controla tamaño de cristales de hielo y mejora resistencia al derretimiento.' },
        ],
      },
    ],
  },
  {
    id: 'yogurt',
    icon: 'fa-bottle-droplet',
    label: 'Yogurt y Bebidas',
    description: 'Sistemas que evitan sinéresis y aportan cuerpo en yogures, bebidas con pulpa, concentrados lácteos y mezclas UHT/HTST.',
    subcategories: [
      {
        name: 'Yogurt',
        products: [
          { code: 'Serie EYGR', desc: 'Proporciona consistencia y previene sinéresis durante almacenamiento, con y sin homogeneizado.' },
        ],
      },
      {
        name: 'Bebidas Lácteas y Concentrados',
        products: [
          { code: 'BCP-20-029', desc: 'Desarrollo inmediato de viscosidad para bebidas instantáneas. Estabilización de sólidos en suspensión.' },
          { code: 'BCP-20-030', desc: 'Texturizante para concentrados con pulpa. Aporta cuerpo y viscosidad sin afectar el sabor.' },
        ],
      },
      {
        name: 'Fórmulas Lácteas (UHT / HTST)',
        products: [
          { code: 'LEF-40-022', desc: 'Estabilizante UHT/HTST. Previene precipitación de proteínas bajo tratamiento térmico severo.' },
        ],
      },
    ],
  },
  {
    id: 'colorantes',
    icon: 'fa-palette',
    label: 'Colorantes',
    description: 'Colorantes naturales y estabilizados de alta resistencia a pasteurización, pH y tratamiento térmico para la industria alimentaria.',
    subcategories: [
      {
        name: 'Colorantes Naturales (Achiote)',
        products: [
          { code: 'MTXX-8020', desc: 'Suspensión en aceite de achiote. Tonos de amarillo a naranja. Resistente a pasteurización.' },
          { code: 'MTXX-8040', desc: 'Versión concentrada de mayor intensidad de color para lácteos y confitería.' },
        ],
      },
      {
        name: 'Colorantes Inorgánicos',
        products: [
          { code: 'DTI-4022', desc: 'Suspensión de dióxido de titanio blanco. Resistente a pasteurización y tratamiento térmico.' },
        ],
      },
    ],
  },
  {
    id: 'auxiliares',
    icon: 'fa-gear',
    label: 'Auxiliares de Proceso',
    description: 'Aditivos funcionales para optimizar la producción, estabilizar pH y mejorar la vida de anaquel del producto terminado.',
    subcategories: [
      {
        name: 'Emulsionantes',
        products: [
          { code: 'EML-30-010', desc: 'Concentrado de emulsionante natural. Mínimo 90% de concentración. Mejora textura sin aportar sabor graso.' },
        ],
      },
      {
        name: 'Reguladores de pH y Conservadores',
        products: [
          { code: 'MTS-LACTO-70-003', desc: 'Sal sódica de ácido láctico al 60%. Buffer de pH y conservador natural para lácteos y dulces.' },
        ],
      },
    ],
  },
];

const FEATURES = [
  { icon: 'fa-solid fa-flask',           title: 'Desarrollo a la medida',  desc: 'Formulaciones personalizadas según tus necesidades de proceso y producto.' },
  { icon: 'fa-solid fa-clipboard-check', title: 'Respaldo técnico',        desc: 'Acompañamiento en pruebas, escalamiento e implementación en planta.' },
  { icon: 'fa-solid fa-chart-line',      title: 'Resultados medibles',     desc: 'Mejora de rendimiento, calidad, estabilidad y vida de anaquel.' },
  { icon: 'fa-solid fa-shield-halved',   title: 'Calidad garantizada',     desc: 'Cumplimos con los más altos estándares de inocuidad y calidad alimentaria.' },
];

function CountUp({ to, suffix = '' }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const frames = 52;
    let n = 0;
    const id = setInterval(() => {
      n++;
      setVal(Math.min(Math.round((to / frames) * n), to));
      if (n >= frames) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [to]);
  return <>{val}{suffix}</>;
}

function Applications() {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(() => {
    const t = searchParams.get('tab');
    return APPLICATIONS.some(a => a.id === t) ? t : 'quesos';
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const t = searchParams.get('tab');
    if (APPLICATIONS.some(a => a.id === t)) setActive(t);
  }, [searchParams]);

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
              <i className="fa-solid fa-atom"></i>
              Catálogo de Soluciones
            </span>
            <h1 className="unified-hero-h1">
              Soluciones para cada<br/>
              <span>aplicación alimentaria</span>
            </h1>
            <p className="unified-hero-p">
              Sistemas funcionales especializados que mejoran la estabilidad,
              textura, rendimiento y calidad en procesos industriales.
            </p>
          </div>
          <div className="unified-hero-stats hero-fw-stats">
            <div className="unified-stat">
              <strong><CountUp to={25} suffix="+" /></strong>
              <span>Soluciones técnicas</span>
            </div>
            <div className="unified-stat">
              <strong><CountUp to={4} /></strong>
              <span>Líneas funcionales</span>
            </div>
            <div className="unified-stat">
              <strong><CountUp to={15} suffix="+" /></strong>
              <span>Años de experiencia</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLICATION EXPLORER ─────────────────────────────── */}
      <section className="app-explorer reveal-section">
        <div className="contenedor">
          <div className="app-explorer-header">
            <span className="about-home-eyebrow">— Líneas de aplicación</span>
            <h2>Soluciones especializadas<br/>por categoría</h2>
            <p className="app-explorer-sub">Selecciona una línea para ver los productos disponibles y sus aplicaciones específicas en tu proceso.</p>
          </div>

          <div className="app-cat-nav" role="tablist">
            {APPLICATIONS.map((a) => (
              <button
                key={a.id}
                type="button"
                role="tab"
                aria-selected={active === a.id}
                className={`app-cat-btn${active === a.id ? ' active' : ''}`}
                onClick={() => setActive(a.id)}
              >
                <i className={`fa-solid ${a.icon}`}></i>
                <span>{a.label}</span>
              </button>
            ))}
          </div>

          {APPLICATIONS.filter((a) => a.id === active).map((cat) => (
            <div key={cat.id} className="app-cat-panel">
              <div className="app-cat-sidebar">
                <div className="app-cat-sidebar-icon">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3>{cat.label}</h3>
                <p>{cat.description}</p>
                <Link
                  to={`/contacto?interest=${encodeURIComponent(cat.label)}`}
                  className="app-cat-cta"
                >
                  Solicitar formulación <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
              <div className="app-cat-content">
                {cat.subcategories.map((sub) => (
                  <div key={sub.name} className="app-subcat">
                    <div className="app-subcat-header">
                      <h4>{sub.name}</h4>
                      {sub.note && <span className="app-subcat-note">{sub.note}</span>}
                    </div>
                    <div className="app-products-list">
                      {sub.products.map((p) => (
                        <div key={p.code} className="app-product-row">
                          <span className="app-product-code">{p.code}</span>
                          <p className="app-product-desc">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="app-cat-footer">
                  <Link to="/productos" className="app-see-products">
                    <i className="fa-solid fa-box-open"></i>
                    Ver catálogo completo de productos
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES STRIP ───────────────────────────────────── */}
      <section className="app-features reveal-section">
        <div className="contenedor">
          <div className="app-features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="app-feature">
                <div className="app-feature-icon">
                  <i className={f.icon}></i>
                </div>
                <div>
                  <p className="app-feature-title">{f.title}</p>
                  <p className="app-feature-desc">{f.desc}</p>
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
