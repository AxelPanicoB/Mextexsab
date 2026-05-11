import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import CartBar from './components/CartBar.jsx';
import ScrollToTopBtn from './components/ScrollToTopBtn.jsx';
import RouteProgress from './components/RouteProgress.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Products from './pages/Products.jsx';
import Applications from './pages/Applications.jsx';
import Contact from './pages/Contact.jsx';

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
        <div className="app-shell">
          <RevealObserver />
          <NavBar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/aplicaciones" element={<Applications />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/contacto" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <CartBar />
          <RouteProgress />
          <ScrollToTopBtn />
          <a
            className="whatsapp"
            href="https://wa.me/524422758979/?text=%20Hola,%20me%20gustaria%20recibir%20más%20información"
            target="_blank"
            rel="noopener noreferrer"
            title="Contáctanos por WhatsApp"
            aria-label="Contáctanos por WhatsApp"
          >
            <span className="whatsapp-pulse" />
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
