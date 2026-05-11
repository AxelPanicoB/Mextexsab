import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <img src="/img/MetexSab.png" alt="Metexsab" />
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
          <NavLink to="/contacto">
            <i className="fa-solid fa-envelope"></i> Contacto
          </NavLink>
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>
    </header>
  );
}

export default NavBar;
