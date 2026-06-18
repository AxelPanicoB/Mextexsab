import { Link } from 'react-router-dom';
import { useContactModal } from '../context/ContactModalContext';
import { Phone, Envelope } from '@phosphor-icons/react';
import WhatsAppIcon from './WhatsAppIcon.jsx';

const BASE = import.meta.env.BASE_URL;

function Footer() {
  const { openContactModal } = useContactModal();
  return (
    <footer>
      <div className="site-footer">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="logo-footer-wrap">
              <img src={`${BASE}img/metexsabb.png`} alt="Metexsab" className="logo-footer" />
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
                <Phone size={27} weight="regular" />
                <div>
                  <p className="contact-label">Teléfono</p>
                  <a href="tel:4422180650">442 218 0650</a>
                  <a href="tel:4422189635">442 218 9635</a>
                </div>
              </div>
              <div className="contact-item">
                <WhatsAppIcon size={27} />
                <div>
                  <p className="contact-label">WhatsApp</p>
                  <a
                    href="https://wa.me/524422758979/?text=Hola,%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    442 275 8979
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <Envelope size={27} weight="regular" />
                <div>
                  <p className="contact-label">Correo</p>
                  <a href="mailto:ventas@metexsab.com">ventas@metexsab.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Navegación</h3>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><button type="button" className="footer-link-btn" onClick={openContactModal}>Contacto</button></li>
              <li>
                <a
                  href={`${BASE}Documentos/Aviso_Privacidad_Integral_Metexsab.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aviso de Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Metexsab. Todos los derechos reservados.</p>
          <a
            className="footer-privacy-link"
            href={`${BASE}Documentos/Aviso_Privacidad_Integral_Metexsab.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Aviso de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
