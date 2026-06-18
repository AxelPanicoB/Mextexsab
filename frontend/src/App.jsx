import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import WhatsAppIcon from './components/WhatsAppIcon.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ContactModalProvider } from './context/ContactModalContext.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import CartBar from './components/CartBar.jsx';
import ContactModal from './components/ContactModal.jsx';
import ScrollToTopBtn from './components/ScrollToTopBtn.jsx';
import RouteProgress from './components/RouteProgress.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Catalog from './pages/Catalog.jsx';

// Mensaje de WhatsApp contextual según la sección que está viendo el usuario
function WhatsAppFab() {
  const { pathname } = useLocation();
  const section = pathname.startsWith('/productos')
    ? 'Vengo del catálogo de productos y me gustaría recibir más información'
    : pathname.startsWith('/nosotros')
      ? 'Conocí su empresa en la sección Nosotros y me gustaría recibir más información'
      : 'Visité su página web y me gustaría recibir más información';
  const href = `https://wa.me/524422758979/?text=${encodeURIComponent(`Hola, ${section}`)}`;
  return (
    <a
      className="whatsapp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Contáctanos por WhatsApp"
      aria-label="Contáctanos por WhatsApp"
    >
      <span className="whatsapp-pulse" />
      <WhatsAppIcon size={28} />
    </a>
  );
}

function RevealObserver() {
  const location = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => {
      const targets = document.querySelectorAll('.reveal-section:not(.is-revealed)');
      if (!targets.length) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-revealed'); obs.unobserve(e.target); }
        }),
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      targets.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 80);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter basename="/Mextexsab">
      <CartProvider>
        <ContactModalProvider>
        <div className="app-shell">
          <RevealObserver />
          <NavBar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Catalog />} />
              <Route path="/nosotros" element={<About />} />
            </Routes>
          </main>
          <Footer />
          <CartBar />
          <ContactModal />
          <RouteProgress />
          <ScrollToTopBtn />
          <WhatsAppFab />
        </div>
        </ContactModalProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
