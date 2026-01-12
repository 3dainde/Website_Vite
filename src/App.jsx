import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { translations } from "./translations";
import "./App.css";
import Home from "./pages/Home";
import Produits from "./pages/Produits";
import JeuxVideo from "./pages/JeuxVideo";
import Developpement from "./pages/Developpement";
import Contact from "./pages/Contact";

export const LanguageContext = React.createContext();

function Navigation({ lang, setLang, t }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">AuthInteractive</Link>
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">{t.nav.home}</Link></li>
          <li><Link to="/produits" className="nav-link">{t.nav.products}</Link></li>
          <li><Link to="/jeux" className="nav-link">{t.nav.games}</Link></li>
          <li><Link to="/developpement" className="nav-link">{t.nav.development}</Link></li>
          <li><Link to="/contact" className="nav-link">{t.nav.contact}</Link></li>
        </ul>
        <select className="language-select" value={lang} onChange={(e) => setLang(e.target.value)}>
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
      <Router>
        <div className="app">
          <Navigation lang={lang} setLang={setLang} t={t} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produits" element={<Produits />} />
              <Route path="/jeux" element={<JeuxVideo />} />
              <Route path="/developpement" element={<Developpement />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer t={t} />
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
