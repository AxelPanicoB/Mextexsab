import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function Footer() {
  return (
    <footer>
      {/* ── FOOTER VERDE ─────────────────────────────── */}
      <div className="site-footer">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="logo-footer-wrap">
              <img src={`${BASE}img/MetexSab(2).png`} alt="Metexsab" className="logo-footer" />
            </div>
            <p className="footer-description">
              Soluciones especializadas en aditivos alimentarios de calidad
              superior para la industria láctea mexicana.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contacto</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <p className="contact-label">Email</p>
                  <a href="mailto:ventas@metexsab.com">ventas@metexsab.com</a>
                </div>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <p className="contact-label">Teléfono</p>
                  <a href="tel:4422180650">442 218 0650</a>
                  <a href="tel:4422189635">442 218 9635</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Navegación</h3>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/aplicaciones">Aplicaciones</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Metexsab. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
