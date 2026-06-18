import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useContactModal } from '../context/ContactModalContext';
import { House, Package, Users, Envelope, Gift } from '@phosphor-icons/react';

const BASE = import.meta.env.BASE_URL;

function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { cart, openPanel, panelOpen, hintDismissed } = useCart();
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
            <House size={27} weight="bold" /> Inicio
          </NavLink>
          <NavLink to="/productos">
            <Package size={27} weight="bold" /> Productos
          </NavLink>
          <NavLink to="/productos-v2">
            <Package size={27} weight="bold" /> Productos v2
          </NavLink>
          <NavLink to="/nosotros">
            <Users size={27} weight="bold" /> Nosotros
          </NavLink>
          <button
            type="button"
            className="nav-contact-btn"
            onClick={() => { setOpen(false); openContactModal(); }}
          >
            <Envelope size={27} weight="bold" /> Contacto
          </button>
        </nav>

        <div className="header-actions">
          {cart.length > 0 && !panelOpen && !hintDismissed && (
            <div className="nav-cart-hint" aria-hidden="true">
              ¡Aquí están tus muestras! 🎁
            </div>
          )}
          <button
            className={`nav-cart-btn${cart.length > 0 ? ' has-items' : ''}`}
            onClick={openPanel}
            aria-label="Ver solicitud de muestras"
            title="Solicitud de muestras"
          >
            <Gift size={36} weight="bold" />
            {cart.length > 0 && (
              <span className="nav-cart-badge">{cart.length}</span>
            )}
          </button>

          <button
            className={`nav-toggle${open ? ' is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span className="hb-bar" />
            <span className="hb-bar" />
            <span className="hb-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
