import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate, useLocation } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TranslationProvider, useTranslation } from "./context/TranslationContext";
import { CartIcon, LogoMark, MenuIcon, CloseIcon } from "./components/Icons";
import "./App.css";

// Créer LanguageContext pour la compatibilité avec les anciens composants
export const LanguageContext = React.createContext();

// Pages du site
import Home from "./pages/Home";
import JeuxVideo from "./pages/JeuxVideo";
import Boutique from "./pages/Boutique";
import Contact from "./pages/Contact";

// Pages E-commerce
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

// Pages compte
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";

function CartLink({ label }) {
  const { itemCount } = useCart();
  return (
    <Link to="/checkout" className="icon-button" aria-label={`${label}, ${itemCount}`}>
      <CartIcon />
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </Link>
  );
}

function UserMenu() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Link to="/dashboard" className="nav-link">
      {user.name}
    </Link>
  );
}

const NAV_ITEMS = [
  { to: "/", key: "home", end: true },
  { to: "/jeux", key: "games" },
  { to: "/boutique", key: "shop" },
  { to: "/contact", key: "contact" },
];

function LanguageSwitch({ lang, setLang }) {
  return (
    <div className="lang-switch" role="group" aria-label="Langue / Language">
      <button type="button" aria-pressed={lang === "fr"} onClick={() => setLang("fr")}>FR</button>
      <span aria-hidden="true">/</span>
      <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
    </div>
  );
}

function Navigation({ lang, setLang, t }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;
  const mobileClass = ({ isActive }) => `mobile-menu-link${isActive ? " active" : ""}`;

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="AuthInteractive, accueil">
          <LogoMark />
          <span>
            AUTH<span className="nav-logo-accent">INTERACTIVE</span>
          </span>
        </Link>

        <nav aria-label={t.nav.main} className="nav-desktop">
          <ul className="nav-menu">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <NavLink to={item.to} end={item.end} className={linkClass}>
                  {t.nav[item.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-tools">
          <LanguageSwitch lang={lang} setLang={setLang} />
          <UserMenu />
          <CartLink label={t.nav.cart} />
          <button
            type="button"
            className="icon-button hamburger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t.nav.menu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon size={20} /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" aria-label={t.nav.main} className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.key} to={item.to} end={item.end} className={mobileClass}>
            {t.nav[item.key]}
          </NavLink>
        ))}
        <div className="mobile-lang">
          <LanguageSwitch lang={lang} setLang={setLang} />
        </div>
      </nav>
    </header>
  );
}

function Footer({ t }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <span>&copy; {currentYear} AuthInteractive. {t.footer.copyright}</span>
          <div className="footer-social">
            <a href="https://www.facebook.com/gaming/authinteractive" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/icons/facebook.svg" alt="" className="social-icon" />
            </a>
            <a href="https://www.youtube.com/channel/UCm4l45-JQhK__iM2ks4eg2Q" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <img src="/icons/youtube.svg" alt="" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/AuthInteractive/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/icons/instagram.svg" alt="" className="social-icon" />
            </a>
            <a href="https://twitter.com/AuthInteractive" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
              <img src="/icons/twitter.svg" alt="" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Remonte en haut à chaque changement de page, ou vers l'ancre (#suivre…).
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  const { lang, setLang, t, loading } = useTranslation();

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      <Router>
        <ScrollManager />
        <div className="app">
          <Navigation lang={lang} setLang={setLang} t={t} />
          <main className="main-content" aria-busy={loading}>
            <Routes>
              {/* Pages publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/jeux" element={<JeuxVideo />} />
              <Route path="/boutique" element={<Navigate to="/boutique/musiques" replace />} />
              <Route path="/boutique/:section" element={<Boutique />} />
              <Route path="/produits" element={<Navigate to="/boutique/templates" replace />} />
              <Route path="/produit/:id" element={<ProductDetail />} />
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

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer t={t} />
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

function AppWrapper() {
  return (
    <TranslationProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </TranslationProvider>
  );
}

export default AppWrapper;
