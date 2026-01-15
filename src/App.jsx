import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { translations } from "./translations";
import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

// Pages existantes
import Home from "./pages/Home";
import JeuxVideo from "./pages/JeuxVideo";
import Developpement from "./pages/Developpement";
import Contact from "./pages/Contact";

// Nouvelles pages E-commerce v1.2.0
import ProduitsImproved from "./pages/ProduitsImproved";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

// Nouvelles pages v2.0 - Commerciales
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";

export const LanguageContext = React.createContext();

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

function UserMenu() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Link to="/dashboard" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        👤 {user.name}
      </Link>
    </div>
  );
}

function Navigation({ lang, setLang, t }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo"><img src="./logo.png" alt="Logo" className="nav-logo-img" />AuthInteractive</Link>
        
        {/* Menu desktop */}
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
          <li><UserMenu /></li>
        </ul>

        {/* Hamburger button */}
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Menu mobile */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <Link to="/" className="mobile-menu-link" onClick={toggleMenu}>{t.nav.home}</Link>
        <Link to="/produits" className="mobile-menu-link" onClick={toggleMenu}>{t.nav.products}</Link>
        <Link to="/jeux" className="mobile-menu-link" onClick={toggleMenu}>{t.nav.games}</Link>
        <Link to="/developpement" className="mobile-menu-link" onClick={toggleMenu}>{t.nav.development}</Link>
        <Link to="/contact" className="mobile-menu-link" onClick={toggleMenu}>{t.nav.contact}</Link>
        <Link to="/checkout" className="mobile-menu-link" onClick={toggleMenu} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          🛒 {t.nav.cart || 'Panier'}
          <CartIndicator />
        </Link>
        <UserMenu />
      </div>
    </nav>
  );
}

function Footer({ t }) {
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
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="app">
              <Navigation lang={lang} setLang={setLang} t={t} />
              <main className="main-content">
                <Routes>
                  {/* Pages publiques */}
                  <Route path="/" element={<Home />} />
                  <Route path="/produits" element={<ProduitsImproved />} />
                  <Route path="/produit/:id" element={<ProductDetail />} />
                  <Route path="/jeux" element={<JeuxVideo />} />
                  <Route path="/developpement" element={<Developpement />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Pages d'authentification */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/pricing" element={<Pricing />} />
                  
                  {/* Pages panier et paiement */}
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/success" element={<Success />} />
                  
                  {/* Pages utilisateur */}
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer t={t} />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </LanguageContext.Provider>
  );
}

export default App;

