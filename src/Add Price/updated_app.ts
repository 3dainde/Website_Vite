// src/App.tsx - VERSION MISE À JOUR avec E-commerce
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { translations } from "./translations";
import { CartProvider, useCart } from "./context/CartContext";
import "./App.css";

// Pages existantes
import Home from "./pages/Home";
import JeuxVideo from "./pages/JeuxVideo";
import Developpement from "./pages/Developpement";
import Contact from "./pages/Contact";

// Nouvelles pages E-commerce
import ProduitsImproved from "./pages/ProduitsImproved";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

export const LanguageContext = React.createContext<any>(null);

function CartIndicator() {
  const { itemCount } = useCart();
  
  if (itemCount === 0) return null;
  
  return (
    <span style={{
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: 'linear-gradient(135deg, #ff3232, #ff6b6b)',
      color: '#fff',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 700,
      boxShadow: '0 2px 8px rgba(255, 50, 50, 0.4)'
    }}>
      {itemCount}
    </span>
  );
}

function Navigation({ lang, setLang, t }: any) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="./logo.png" alt="Logo" className="nav-logo-img" />
          AuthInteractive
        </Link>
        
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">{t.nav.home}</Link></li>
          <li><Link to="/produits" className="nav-link">{t.nav.products}</Link></li>
          <li><Link to="/jeux" className="nav-link">{t.nav.games}</Link></li>
          <li><Link to="/developpement" className="nav-link">{t.nav.development}</Link></li>
          <li><Link to="/contact" className="nav-link">{t.nav.contact}</Link></li>
          <li style={{ position: 'relative' }}>
            <Link to="/checkout" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
              🛒
              <CartIndicator />
            </Link>
          </li>
        </ul>
        
        <select 
          className="language-select" 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="de">DE</option>
          <option value="it">IT</option>
          <option value="ru">RU</option>
        </select>
      </div>
    </nav>
  );
}

function Footer({ t }: any) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2026 AuthInteractive. {t.footer.copyright}</p>
        <div className="footer-links">
          <a href="https://www.facebook.com/gaming/authinteractive" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="./icons/facebook.svg" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://www.youtube.com/channel/UCm4l45-JQhK__iM2ks4eg2Q" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img src="./icons/youtube.svg" alt="YouTube" className="social-icon" />
          </a>
          <a href="https://www.instagram.com/AuthInteractive/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="./icons/instagram.svg" alt="Instagram" className="social-icon" />
          </a>
          <a href="https://twitter.com/AuthInteractive" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="./icons/twitter.svg" alt="Twitter" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [lang, setLang] = useState("fr");
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      <CartProvider>
        <Router>
          <div className="app">
            <Navigation lang={lang} setLang={setLang} t={t} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produits" element={<ProduitsImproved />} />
                <Route path="/produit/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/jeux" element={<JeuxVideo />} />
                <Route path="/developpement" element={<Developpement />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer t={t} />
          </div>
        </Router>
      </CartProvider>
    </LanguageContext.Provider>
  );
}

export default App;