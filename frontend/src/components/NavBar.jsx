import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useContactModal } from '../context/ContactModalContext';

const BASE = import.meta.env.BASE_URL;

function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { cart, openPanel } = useCart();
  const { openContactModal } = useContactModal();

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <img src={`${BASE}img/MetexSab.png`} alt="Metexsab" />
        </Link>

        <nav className={`site-nav${open ? ' open' : ''}`} aria-label="Navegación principal">
          <NavLink to="/" end>
            <i className="fa-solid fa-house"></i> Inicio
          </NavLink>
          <NavLink to="/productos">
            <i className="fa-solid fa-box-open"></i> Productos
          </NavLink>
          <NavLink to="/aplicaciones">
            <i className="fa-solid fa-flask-vial"></i> Aplicaciones
          </NavLink>
          <NavLink to="/nosotros">
            <i className="fa-solid fa-users"></i> Nosotros
          </NavLink>
          <button
            type="button"
            className="nav-contact-btn"
            onClick={() => { setOpen(false); openContactModal(); }}
          >
            <i className="fa-solid fa-envelope"></i> Contacto
          </button>
        </nav>

        <div className="header-actions">
          <button
            className={`nav-cart-btn${cart.length > 0 ? ' has-items' : ''}`}
            onClick={openPanel}
            aria-label="Ver solicitud de muestras"
            title="Solicitud de muestras"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {cart.length > 0 && (
              <span className="nav-cart-badge">{cart.length}</span>
            )}
          </button>

          <button
            className="nav-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
