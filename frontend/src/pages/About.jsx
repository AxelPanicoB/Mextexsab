import { Link } from 'react-router-dom';
import { useContactModal } from '../context/ContactModalContext';

const BASE = import.meta.env.BASE_URL;

const HERO_FACTS = [
  { icon: 'fa-solid fa-flask-vial', title: 'Experiencia', text: 'desde 2007' },
  { icon: 'fa-solid fa-location-dot', title: 'Querétaro,', text: 'México' },
  { icon: 'fa-solid fa-shield-halved', title: 'Soluciones', text: 'confiables' },
  { icon: 'fa-solid fa-people-group', title: 'Soporte técnico', text: 'especializado' },
];

const VALUES = [
  {
    icon: 'fa-solid fa-list-check',
    title: 'Responsabilidad',
    text: 'Cumplimos nuestros compromisos con seriedad y puntualidad.'
  },
  {
    icon: 'fa-regular fa-lightbulb',
    title: 'Búsqueda constante de innovación y valor agregado',
    text: 'Mejoramos continuamente para ofrecer soluciones de alto impacto.'
  },
  {
    icon: 'fa-regular fa-handshake',
    title: 'Trato profesional y amable',
    text: 'Construimos relaciones de confianza con un trato cercano y respetuoso.'
  },
  {
    icon: 'fa-solid fa-scale-balanced',
    title: 'Honestidad',
    text: 'Actuamos con ética, transparencia y claridad en cada proceso.'
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Confiabilidad',
    text: 'Somos consistentes en la calidad y desempeño de nuestras soluciones.'
  },
  {
    icon: 'fa-regular fa-clipboard',
    title: 'Cumplimiento con las legislaciones vigentes',
    text: 'Aseguramos que nuestros productos y procesos cumplan estándares aplicables.'
  },
];

const SOLUTIONS = [
  { image: `${BASE}img/about-reference/solution-quesos.png`, icon: 'fa-solid fa-cheese', label: 'Quesos y cremas', path: '/aplicaciones?tab=quesos' },
  { image: `${BASE}img/about-reference/solution-yogurt.png`, icon: 'fa-solid fa-bottle-droplet', label: 'Yogurt y lácteos', path: '/aplicaciones?tab=yogurt' },
  { image: `${BASE}img/about-reference/solution-helados.png`, icon: 'fa-solid fa-ice-cream', label: 'Helados y postres', path: '/aplicaciones?tab=helados' },
  { image: `${BASE}img/about-reference/solution-bebidas.png`, icon: 'fa-solid fa-glass-water', label: 'Bebidas y concentrados', path: '/aplicaciones?tab=bebidas' },
  { image: `${BASE}img/about-reference/solution-colorantes.png`, icon: 'fa-solid fa-palette', label: 'Colorantes', path: '/aplicaciones?tab=colorantes' },
  { image: `${BASE}img/about-reference/solution-auxiliares.png`, icon: 'fa-solid fa-box-open', label: 'Auxiliares de proceso', path: '/aplicaciones?tab=auxiliares' },
];

const PROOF_POINTS = [
  { icon: 'fa-solid fa-flask', label: 'Ingredientes especializados' },
  { icon: 'fa-regular fa-circle-check', label: 'Calidad garantizada' },
  { icon: 'fa-solid fa-headset', label: 'Atención personalizada' },
  { icon: 'fa-solid fa-award', label: 'Soluciones que generan valor' },
];

function About() {
  const { openContactModal } = useContactModal();
  return (
    <>
      <section className="about-hero about-molecule-bg">
        <div className="about-hero-shell">
          <div className="about-hero-copy">
            <div className="about-carbon-field" aria-hidden="true">
              {Array.from({ length: 15 }).map((_, index) => (
                <span key={index}></span>
              ))}
            </div>
            <span className="about-pill">Nosotros</span>
            <h1>
              Ingredientes y soluciones para la <span>industria alimentaria</span>
            </h1>
            <p>
              Especialistas en texturizantes, estabilizantes, colorantes y
              auxiliares de proceso que mejoran el rendimiento, la calidad y la
              eficiencia de tus productos.
            </p>

            <div className="about-hero-facts">
              {HERO_FACTS.map((fact) => (
                <div className="about-hero-fact" key={fact.title}>
                  <span className="about-hero-fact-icon">
                    <i className={fact.icon}></i>
                  </span>
                  <strong>{fact.title}</strong>
                  <small>{fact.text}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="about-hero-divider" aria-hidden="true">
            <svg viewBox="0 0 180 520" preserveAspectRatio="none">
              <path className="divider-fill" d="M168 0 C118 112 118 194 146 276 C176 363 110 460 16 520 L0 520 L0 0 Z" />
            </svg>
          </div>

          <div className="about-hero-photo">
            <img src={`${BASE}img/acueducto.png`} alt="Acueducto de Querétaro" />
            <div className="about-hero-caption">
              <i className="fa-solid fa-archway"></i>
              <p>
                Historia que nos inspira, <strong>calidad que nos define.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story-section reveal-section">
        <div className="contenedor">
          <div className="about-story-grid">
            <article className="about-story-card">
              <div className="about-story-illustration" aria-hidden="true">
                <img src={`${BASE}img/acueductod.png`} alt="" />
              </div>
              <div className="about-story-copy">
                <span className="about-mini-pill">Nuestra historia</span>
                <h2>Mexicana de Textura y Sabor</h2>
                <p>
                  Fundada en 2007 en la ciudad de Querétaro, Metexsab es una
                  empresa especializada en ingredientes y soluciones para la
                  industria alimentaria mexicana.
                </p>
                <p>
                  Estamos comprometidos a ofrecer un servicio eficiente, rápido
                  y cordial, apoyando a nuestros clientes a lograr sus objetivos
                  de calidad, costo y eficiencia.
                </p>
              </div>
            </article>

            <article className="about-mv-card">
              <div className="about-mv-header">
                <span className="about-mv-icon"><i className="fa-regular fa-flag"></i></span>
                <h3>Misión</h3>
              </div>
              <p>
                Servir a la comunidad de la industria alimentaria mexicana con
                ingredientes de calidad y competitivos, con un servicio
                eficiente, confiable, honesto y amable. Agregar valor y proveer
                soluciones, eliminando los problemas de suministro.
              </p>
            </article>

            <article className="about-mv-card">
              <div className="about-mv-header">
                <span className="about-mv-icon"><i className="fa-regular fa-star"></i></span>
                <h3>Visión</h3>
              </div>
              <p>
                Brindar soluciones innovadoras, prácticas e inspiradoras a la
                industria alimentaria que provoquen que nuestros clientes se
                conviertan en líderes de su segmento.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-values-section reveal-section">
        <div className="contenedor">
          <div className="about-centered-heading">
            <span className="about-mini-pill">Nuestros valores</span>
            <h2>Lo que nos <span>guía</span> cada día</h2>
          </div>

          <div className="about-values-row">
            {VALUES.map((value) => (
              <article className="about-value-item" key={value.title}>
                <i className={value.icon}></i>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-solutions-section reveal-section">
        <div className="contenedor">
          <div className="about-centered-heading">
            <span className="about-mini-pill">Nuestras soluciones</span>
            <h2>Productos para cada <span>aplicación</span> alimentaria</h2>
          </div>

          <div className="about-solutions-grid">
            {SOLUTIONS.map((solution) => (
              <Link to={solution.path} className="about-solution-card" key={solution.label}>
                <img src={solution.image} alt={solution.label} />
                <span>
                  <i className={solution.icon}></i>
                </span>
                <h3>{solution.label}</h3>
              </Link>
            ))}
          </div>

          <div className="about-solutions-action">
            <Link to="/aplicaciones" className="about-outline-btn">
              Ver todos los productos <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      <section className="about-proof-section reveal-section">
        <div className="unified-mol-field" aria-hidden="true">
          <svg className="m-svg m-svg-1" viewBox="0 0 80 92" fill="none"><polygon points="40,3 77,23 77,69 40,89 3,69 3,23" stroke="rgba(119,208,105,0.18)" strokeWidth="1.5"/><circle cx="40" cy="46" r="5" fill="rgba(92,184,69,0.12)"/><circle cx="40" cy="3" r="3" fill="rgba(119,208,105,0.2)"/><circle cx="77" cy="23" r="3" fill="rgba(119,208,105,0.15)"/><circle cx="77" cy="69" r="3" fill="rgba(119,208,105,0.15)"/><circle cx="40" cy="89" r="3" fill="rgba(119,208,105,0.2)"/><circle cx="3" cy="69" r="3" fill="rgba(119,208,105,0.12)"/><circle cx="3" cy="23" r="3" fill="rgba(119,208,105,0.12)"/></svg>
          <svg className="m-svg m-svg-2" viewBox="0 0 130 50" fill="none"><circle cx="12" cy="25" r="9" stroke="rgba(119,208,105,0.15)" strokeWidth="1.3"/><line x1="21" y1="22" x2="37" y2="14" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/><line x1="21" y1="28" x2="37" y2="36" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/><circle cx="44" cy="11" r="7" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/><circle cx="44" cy="39" r="7" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/><line x1="51" y1="11" x2="73" y2="25" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><line x1="51" y1="39" x2="73" y2="25" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><circle cx="79" cy="25" r="9" stroke="rgba(119,208,105,0.15)" strokeWidth="1.3"/><line x1="88" y1="25" x2="108" y2="25" stroke="rgba(119,208,105,0.12)" strokeWidth="1.5"/><circle cx="115" cy="25" r="7" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/></svg>
          <svg className="m-svg m-svg-4" viewBox="0 0 70 70" fill="none"><circle cx="35" cy="35" r="31" stroke="rgba(119,208,105,0.06)" strokeWidth="1" strokeDasharray="5 5"/><circle cx="35" cy="35" r="10" stroke="rgba(119,208,105,0.16)" strokeWidth="1.5"/><circle cx="35" cy="4" r="3.5" fill="rgba(92,184,69,0.15)"/><circle cx="66" cy="35" r="3.5" fill="rgba(92,184,69,0.10)"/><circle cx="35" cy="66" r="3.5" fill="rgba(92,184,69,0.12)"/><circle cx="4" cy="35" r="3.5" fill="rgba(92,184,69,0.08)"/><line x1="35" y1="7" x2="35" y2="25" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><line x1="63" y1="35" x2="45" y2="35" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><line x1="35" y1="63" x2="35" y2="45" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><line x1="7" y1="35" x2="25" y2="35" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/></svg>
          <svg className="m-svg m-svg-7" viewBox="0 0 70 80" fill="none"><polygon points="35,3 67,20 67,60 35,77 3,60 3,20" stroke="rgba(119,208,105,0.16)" strokeWidth="1.4"/><circle cx="35" cy="40" r="14" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/></svg>
          <svg className="m-svg m-svg-9" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="5" fill="rgba(92,184,69,0.20)"/><ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/><ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.10)" strokeWidth="1" transform="rotate(60 30 30)"/><ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.08)" strokeWidth="1" transform="rotate(120 30 30)"/></svg>
          <svg className="m-svg m-svg-11" viewBox="0 0 60 60" fill="none"><line x1="30" y1="5" x2="30" y2="55" stroke="rgba(119,208,105,0.13)" strokeWidth="1.5"/><line x1="5" y1="30" x2="55" y2="30" stroke="rgba(119,208,105,0.13)" strokeWidth="1.5"/><circle cx="30" cy="30" r="6" fill="rgba(92,184,69,0.15)"/><circle cx="30" cy="5" r="3" fill="rgba(92,184,69,0.10)"/><circle cx="30" cy="55" r="3" fill="rgba(92,184,69,0.10)"/><circle cx="5" cy="30" r="3" fill="rgba(92,184,69,0.10)"/><circle cx="55" cy="30" r="3" fill="rgba(92,184,69,0.10)"/></svg>
          <svg className="m-svg m-svg-14" viewBox="0 0 80 40" fill="none"><circle cx="10" cy="20" r="7" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/><line x1="17" y1="14" x2="33" y2="8" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/><circle cx="40" cy="6" r="6" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/><line x1="46" y1="10" x2="62" y2="20" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/><circle cx="70" cy="22" r="7" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/></svg>
          <svg className="m-svg m-svg-17" viewBox="0 0 110 64" fill="none"><polygon points="28,2 54,16 54,48 28,62 2,48 2,16" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/><polygon points="82,2 108,16 108,48 82,62 56,48 56,16" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/></svg>
          <svg className="m-svg m-svg-19" viewBox="0 0 55 55" fill="none"><circle cx="27" cy="10" r="8" stroke="rgba(119,208,105,0.13)" strokeWidth="1.2"/><circle cx="10" cy="42" r="8" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/><circle cx="45" cy="42" r="8" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/><line x1="22" y1="17" x2="15" y2="35" stroke="rgba(119,208,105,0.09)" strokeWidth="1"/><line x1="32" y1="17" x2="40" y2="35" stroke="rgba(119,208,105,0.09)" strokeWidth="1"/><line x1="18" y1="42" x2="37" y2="42" stroke="rgba(119,208,105,0.08)" strokeWidth="1"/></svg>
          <div className="m-dot m-dot-1"/><div className="m-dot m-dot-2"/><div className="m-dot m-dot-3"/>
          <div className="m-dot m-dot-4"/><div className="m-dot m-dot-5"/><div className="m-dot m-dot-6"/>
        </div>
        <div className="contenedor about-proof-inner">
          <div className="about-proof-copy">
            <span className="about-proof-pill">Experiencia que genera resultados</span>
            <h2>Soluciones que aplican ciencia, experiencia y compromiso.</h2>
            <p>
              Acompañamos a la industria alimentaria con ingredientes confiables
              y un servicio cercano que impulsa tu crecimiento.
            </p>
            <button type="button" className="about-whatsapp-btn" onClick={openContactModal}>
              <i className="fa-brands fa-whatsapp"></i> Hablemos de tu proyecto
            </button>
          </div>

          <div className="about-proof-points">
            {PROOF_POINTS.map((point) => (
              <div className="about-proof-point" key={point.label}>
                <i className={point.icon}></i>
                <strong>{point.label}</strong>
              </div>
            ))}
          </div>

          <div className="about-proof-image" aria-hidden="true">
            <img src={`${BASE}img/about-reference/proof-lab.png`} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
