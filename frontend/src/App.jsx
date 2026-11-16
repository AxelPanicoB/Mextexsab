import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import WhatsAppChat from './components/WhatsAppChat.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ContactModalProvider } from './context/ContactModalContext.jsx';
import { WhatsAppChatProvider } from './context/WhatsAppChatContext.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import CartBar from './components/CartBar.jsx';
import RouteSeo from './components/RouteSeo.jsx';
import ContactModal from './components/ContactModal.jsx';
import ScrollToTopBtn from './components/ScrollToTopBtn.jsx';
import RouteProgress from './components/RouteProgress.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Catalog from './pages/Catalog.jsx';
import Landing from './pages/Landing.jsx';
import LANDINGS from './data/landings.js';

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

// Al cambiar de página, empieza arriba (sin esto se conserva el scroll de la página anterior).
// "instant" porque el CSS tiene scroll-behavior: smooth y no queremos ver cómo sube.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter basename="/Mextexsab">
      <CartProvider>
        <ContactModalProvider>
        <WhatsAppChatProvider>
        <div className="app-shell">
          <RevealObserver />
          <ScrollToTop />
          <RouteSeo />
          <NavBar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Catalog />} />
              <Route path="/nosotros" element={<About />} />
              {LANDINGS.map((l) => (
                <Route key={l.slug} path={`/${l.slug}`} element={<Landing landing={l} />} />
              ))}
            </Routes>
          </main>
          <Footer />
          <CartBar />
          <ContactModal />
          <RouteProgress />
          <ScrollToTopBtn />
          <WhatsAppChat />
        </div>
        </WhatsAppChatProvider>
        </ContactModalProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
