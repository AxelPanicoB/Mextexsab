import { Link } from 'react-router-dom';

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
    icon: 'fa-regular fa-user',
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
  { image: '/img/about-reference/solution-quesos.png', icon: 'fa-solid fa-cheese', label: 'Quesos y cremas', path: '/aplicaciones?tab=quesos' },
  { image: '/img/about-reference/solution-yogurt.png', icon: 'fa-solid fa-bottle-droplet', label: 'Yogurt y lácteos', path: '/aplicaciones?tab=yogurt' },
  { image: '/img/about-reference/solution-helados.png', icon: 'fa-solid fa-ice-cream', label: 'Helados y postres', path: '/aplicaciones?tab=helados' },
  { image: '/img/about-reference/solution-bebidas.png', icon: 'fa-solid fa-glass-water', label: 'Bebidas y concentrados', path: '/aplicaciones?tab=yogurt' },
  { image: '/img/about-reference/solution-colorantes.png', icon: 'fa-solid fa-palette', label: 'Colorantes', path: '/aplicaciones?tab=colorantes' },
  { image: '/img/about-reference/solution-auxiliares.png', icon: 'fa-solid fa-box-open', label: 'Auxiliares de proceso', path: '/aplicaciones?tab=auxiliares' },
];

const PROOF_POINTS = [
  { icon: 'fa-solid fa-flask', label: 'Ingredientes especializados' },
  { icon: 'fa-regular fa-circle-check', label: 'Calidad garantizada' },
  { icon: 'fa-solid fa-headset', label: 'Atención personalizada' },
  { icon: 'fa-solid fa-award', label: 'Soluciones que generan valor' },
];

function About() {
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
            <img src="/img/acueducto.png" alt="Acueducto de Querétaro" />
            <img src="/img/MetexSab.png" className="about-hero-logo-bg" aria-hidden="true" />
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
                <img src="/img/acueductod.png" alt="" />
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
              <h3>Misión</h3>
              <p>
                Servir a la comunidad de la industria alimentaria mexicana con
                ingredientes de calidad y competitivos, con un servicio
                eficiente, confiable, honesto y amable. Agregar valor y proveer
                soluciones, eliminando los problemas de suministro.
              </p>
            </article>

            <article className="about-mv-card">
              <h3>Visión</h3>
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
        <div className="contenedor about-proof-inner">
          <div className="about-proof-copy">
            <span className="about-proof-pill">Experiencia que genera resultados</span>
            <h2>Soluciones que aplican ciencia, experiencia y compromiso.</h2>
            <p>
              Acompañamos a la industria alimentaria con ingredientes confiables
              y un servicio cercano que impulsa tu crecimiento.
            </p>
            <Link to="/contacto" className="about-whatsapp-btn">
              <i className="fa-brands fa-whatsapp"></i> Hablemos de tu proyecto
            </Link>
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
            <img src="/img/about-reference/proof-lab.png" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
