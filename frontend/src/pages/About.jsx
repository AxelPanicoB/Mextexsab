import { Link } from 'react-router-dom';
import { useContactModal } from '../context/ContactModalContext';
import {
  Flag, Star, ListChecks, Lightbulb, Handshake, Scales, ClipboardText, ShieldCheck,
  Users,
  Cheese, Drop, Jar, Drop as GlassWater, Palette, Package, IceCream,
  ArrowRight,
} from '@phosphor-icons/react';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';

const BASE = import.meta.env.BASE_URL;

const VALUES = [
  { Icon: ListChecks,   title: 'Responsabilidad',                                     text: 'Cumplimos nuestros compromisos con seriedad y puntualidad.' },
  { Icon: Lightbulb,    title: 'Innovación y valor agregado',                         text: 'Mejoramos continuamente para ofrecer soluciones de alto impacto.' },
  { Icon: Users,        title: 'Trato profesional y amable',                          text: 'Construimos relaciones de confianza con un trato cercano y respetuoso.' },
  { Icon: Scales,       title: 'Honestidad',                                          text: 'Actuamos con ética, transparencia y claridad en cada proceso.' },
  { Icon: ShieldCheck,  title: 'Confiabilidad',                                       text: 'Somos consistentes en la calidad y desempeño de nuestras soluciones.' },
  { Icon: Handshake,    title: 'Cooperación con clientes y proveedores',              text: 'Obtenemos sinergia que apoya los intereses mutuos a largo plazo.' },
];

const SOLUTIONS = [
  { image: `${BASE}img/about-reference/solution-quesos.png`,    Icon: Cheese,     label: 'Quesos y cremas',         path: '/productos?tab=quesos' },
  { image: `${BASE}img/about-reference/solution-yogurt.png`,    Icon: Drop,       label: 'Yogurt y lácteos',        path: '/productos?tab=yogurt' },
  { image: `${BASE}img/about-reference/solution-helados.png`,   Icon: IceCream,   label: 'Helados y postres',       path: '/productos?tab=helados' },
  { image: `${BASE}img/about-reference/solution-bebidas.png`,   Icon: GlassWater, label: 'Bebidas y concentrados',  path: '/productos?tab=bebidas' },
  { image: `${BASE}img/about-reference/solution-colorantes.png`,Icon: Palette,    label: 'Colorantes',              path: '/productos?tab=colorantes' },
  { image: `${BASE}img/about-reference/solution-auxiliares.png`,Icon: Package,    label: 'Auxiliares de proceso',   path: '/productos?tab=auxiliares' },
];

function About() {
  return (
    <>
      <section className="about-hero about-molecule-bg">
        <div className="about-hero-shell">
          <div className="about-hero-copy">
            <div className="unified-mol-field" aria-hidden="true">
              <svg className="m-svg m-svg-1" viewBox="0 0 80 92" fill="none"><polygon points="40,3 77,23 77,69 40,89 3,69 3,23" stroke="rgba(119,208,105,0.18)" strokeWidth="1.5"/><circle cx="40" cy="46" r="5" fill="rgba(92,184,69,0.12)"/><circle cx="40" cy="3" r="3" fill="rgba(119,208,105,0.2)"/><circle cx="77" cy="23" r="3" fill="rgba(119,208,105,0.15)"/><circle cx="40" cy="89" r="3" fill="rgba(119,208,105,0.2)"/><circle cx="3" cy="23" r="3" fill="rgba(119,208,105,0.12)"/></svg>
              <svg className="m-svg m-svg-4" viewBox="0 0 70 70" fill="none"><circle cx="35" cy="35" r="31" stroke="rgba(119,208,105,0.06)" strokeWidth="1" strokeDasharray="5 5"/><circle cx="35" cy="35" r="10" stroke="rgba(119,208,105,0.16)" strokeWidth="1.5"/><circle cx="35" cy="4" r="3.5" fill="rgba(92,184,69,0.15)"/><circle cx="66" cy="35" r="3.5" fill="rgba(92,184,69,0.10)"/><circle cx="35" cy="66" r="3.5" fill="rgba(92,184,69,0.12)"/><line x1="35" y1="7" x2="35" y2="25" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><line x1="63" y1="35" x2="45" y2="35" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/></svg>
              <svg className="m-svg m-svg-7" viewBox="0 0 70 80" fill="none"><polygon points="35,3 67,20 67,60 35,77 3,60 3,20" stroke="rgba(119,208,105,0.16)" strokeWidth="1.4"/><circle cx="35" cy="40" r="14" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/><circle cx="35" cy="40" r="4" fill="rgba(92,184,69,0.18)"/></svg>
              <svg className="m-svg m-svg-9" viewBox="0 0 130 50" fill="none"><circle cx="12" cy="25" r="9" stroke="rgba(119,208,105,0.15)" strokeWidth="1.3"/><line x1="21" y1="22" x2="37" y2="14" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/><line x1="21" y1="28" x2="37" y2="36" stroke="rgba(119,208,105,0.12)" strokeWidth="1.2"/><circle cx="44" cy="11" r="7" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/><circle cx="44" cy="39" r="7" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/><line x1="51" y1="11" x2="73" y2="25" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><line x1="51" y1="39" x2="73" y2="25" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><circle cx="79" cy="25" r="9" stroke="rgba(119,208,105,0.15)" strokeWidth="1.3"/></svg>
              <div className="m-dot m-dot-1"/><div className="m-dot m-dot-2"/><div className="m-dot m-dot-3"/>
              <div className="m-dot m-dot-4"/><div className="m-dot m-dot-5"/>
            </div>
            <div className="about-carbon-field" aria-hidden="true">
              {Array.from({ length: 15 }).map((_, index) => (
                <span key={index}></span>
              ))}
            </div>
            <span className="about-pill">Nosotros</span>
            <h1>
              Mexicana de <span>Textura y Sabor</span>
            </h1>
            <p>
              Fundada en 2007 en la ciudad de Querétaro, Metexsab nació para
              servir a la industria alimentaria mexicana con ingredientes de
              calidad y soluciones a la medida. Más de 15 años después, seguimos
              desarrollando texturizantes, saborizantes, colorantes y auxiliares
              de proceso con el mismo compromiso: un servicio eficiente, rápido
              y cordial que ayuda a nuestros clientes a lograr sus objetivos de
              calidad, costo y eficiencia.
            </p>
          </div>

          <div className="about-hero-photo">
            <img src={`${BASE}img/acueductod.png`} alt="Acueducto de Querétaro" />
          </div>
        </div>
      </section>

      <section className="about-story-section reveal-section">
        <div className="contenedor">
          <div className="about-story-grid">
            <article className="about-mv-card">
              <div className="about-mv-header">
                <span className="about-mv-icon"><Flag size={30} weight="regular" /></span>
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
                <span className="about-mv-icon"><Star size={30} weight="regular" /></span>
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
                <value.Icon size={42} weight="regular" />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-solutions-section reveal-section">
        <div className="unified-mol-field" aria-hidden="true">
          <svg className="m-svg m-svg-1" viewBox="0 0 80 92" fill="none"><polygon points="40,3 77,23 77,69 40,89 3,69 3,23" stroke="rgba(119,208,105,0.18)" strokeWidth="1.5"/><circle cx="40" cy="46" r="5" fill="rgba(92,184,69,0.12)"/><circle cx="40" cy="3" r="3" fill="rgba(119,208,105,0.2)"/><circle cx="77" cy="23" r="3" fill="rgba(119,208,105,0.15)"/><circle cx="77" cy="69" r="3" fill="rgba(119,208,105,0.15)"/><circle cx="40" cy="89" r="3" fill="rgba(119,208,105,0.2)"/><circle cx="3" cy="69" r="3" fill="rgba(119,208,105,0.12)"/><circle cx="3" cy="23" r="3" fill="rgba(119,208,105,0.12)"/></svg>
          <svg className="m-svg m-svg-4" viewBox="0 0 70 70" fill="none"><circle cx="35" cy="35" r="31" stroke="rgba(119,208,105,0.06)" strokeWidth="1" strokeDasharray="5 5"/><circle cx="35" cy="35" r="10" stroke="rgba(119,208,105,0.16)" strokeWidth="1.5"/><circle cx="35" cy="4" r="3.5" fill="rgba(92,184,69,0.15)"/><circle cx="66" cy="35" r="3.5" fill="rgba(92,184,69,0.10)"/><circle cx="35" cy="66" r="3.5" fill="rgba(92,184,69,0.12)"/><circle cx="4" cy="35" r="3.5" fill="rgba(92,184,69,0.08)"/><line x1="35" y1="7" x2="35" y2="25" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><line x1="63" y1="35" x2="45" y2="35" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><line x1="35" y1="63" x2="35" y2="45" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/><line x1="7" y1="35" x2="25" y2="35" stroke="rgba(119,208,105,0.1)" strokeWidth="1"/></svg>
          <svg className="m-svg m-svg-7" viewBox="0 0 70 80" fill="none"><polygon points="35,3 67,20 67,60 35,77 3,60 3,20" stroke="rgba(119,208,105,0.16)" strokeWidth="1.4"/><circle cx="35" cy="40" r="14" stroke="rgba(119,208,105,0.10)" strokeWidth="1"/></svg>
          <svg className="m-svg m-svg-9" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="5" fill="rgba(92,184,69,0.20)"/><ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/><ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.10)" strokeWidth="1" transform="rotate(60 30 30)"/><ellipse cx="30" cy="30" rx="28" ry="10" stroke="rgba(119,208,105,0.08)" strokeWidth="1" transform="rotate(120 30 30)"/></svg>
          <svg className="m-svg m-svg-11" viewBox="0 0 60 60" fill="none"><line x1="30" y1="5" x2="30" y2="55" stroke="rgba(119,208,105,0.13)" strokeWidth="1.5"/><line x1="5" y1="30" x2="55" y2="30" stroke="rgba(119,208,105,0.13)" strokeWidth="1.5"/><circle cx="30" cy="30" r="6" fill="rgba(92,184,69,0.15)"/><circle cx="30" cy="5" r="3" fill="rgba(92,184,69,0.10)"/><circle cx="30" cy="55" r="3" fill="rgba(92,184,69,0.10)"/><circle cx="5" cy="30" r="3" fill="rgba(92,184,69,0.10)"/><circle cx="55" cy="30" r="3" fill="rgba(92,184,69,0.10)"/></svg>
          <svg className="m-svg m-svg-17" viewBox="0 0 110 64" fill="none"><polygon points="28,2 54,16 54,48 28,62 2,48 2,16" stroke="rgba(119,208,105,0.14)" strokeWidth="1.2"/><polygon points="82,2 108,16 108,48 82,62 56,48 56,16" stroke="rgba(119,208,105,0.12)" strokeWidth="1"/></svg>
          <svg className="m-svg m-svg-19" viewBox="0 0 55 55" fill="none"><circle cx="27" cy="10" r="8" stroke="rgba(119,208,105,0.13)" strokeWidth="1.2"/><circle cx="10" cy="42" r="8" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/><circle cx="45" cy="42" r="8" stroke="rgba(119,208,105,0.11)" strokeWidth="1"/><line x1="22" y1="17" x2="15" y2="35" stroke="rgba(119,208,105,0.09)" strokeWidth="1"/><line x1="32" y1="17" x2="40" y2="35" stroke="rgba(119,208,105,0.09)" strokeWidth="1"/><line x1="18" y1="42" x2="37" y2="42" stroke="rgba(119,208,105,0.08)" strokeWidth="1"/></svg>
          <div className="m-dot m-dot-1"/><div className="m-dot m-dot-2"/><div className="m-dot m-dot-3"/>
          <div className="m-dot m-dot-4"/><div className="m-dot m-dot-5"/><div className="m-dot m-dot-6"/>
        </div>
        <div className="contenedor" style={{position:'relative',zIndex:2}}>
          <div className="about-centered-heading">
            <span className="about-mini-pill">Nuestras soluciones</span>
            <h2>Productos para cada <span>aplicación</span> alimentaria</h2>
          </div>

          <div className="about-solutions-grid">
            {SOLUTIONS.map((solution) => (
              <Link to={solution.path} className="about-solution-card" key={solution.label}>
                <img src={solution.image} alt={solution.label} />
                <span>
                  <solution.Icon size={33} weight="regular" />
                </span>
                <h3>{solution.label}</h3>
              </Link>
            ))}
          </div>

          <div className="about-solutions-action">
            <Link to="/productos" className="about-outline-btn">
              Ver todos los productos
            </Link>
            <a
              className="about-whatsapp-btn"
              href={`https://wa.me/524422758979/?text=${encodeURIComponent('Hola, conocí su empresa en su página web y me gustaría hablar de mi proyecto')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={27} /> Hablemos de tu proyecto
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
