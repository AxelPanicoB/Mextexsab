function SectionHero() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Metexsab</p>
        <h1>Ingredientes para quesos, lácteos y bebidas con calidad industrial</h1>
        <p>
          Saborizantes, texturizantes, estabilizantes y auxiliares de proceso diseñados para mejorar la
          textura, estabilidad y sabor de tus fórmulas.
        </p>
        <div className="hero-actions">
          <a className="btn-primary" href="#productos">Ver productos</a>
          <a className="btn-secondary" href="#contacto">Contacto rápido</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card">
          <span>Quesos & Lácteos</span>
          <p>Soluciones adaptadas a procesos de queso fresco, madurado y análogo.</p>
        </div>
        <div className="hero-card accent">
          <span>Yogurt & Bebidas</span>
          <p>Formulaciones estables para bebidas, yogures y postres lácteos.</p>
        </div>
      </div>
    </section>
  );
}

export default SectionHero;
