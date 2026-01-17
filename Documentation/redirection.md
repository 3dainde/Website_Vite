# Configuration multi-langue avec URLs /fr et /en  
**Projet : Website_Vite (Vite + React + GitHub Pages)**

---

## Objectif

- Domaine principal : **https://authinteractive.com**
- URLs finales :
  - `/` → redirection automatique vers `/fr` ou `/en`
  - `/fr` → site en français
  - `/en` → site en anglais
- Déploiement via **GitHub Pages (branche `gh-pages`)**
- Redirection du domaine `.fr` vers `.com` gérée côté IONOS

---

## Dépendance requise

```bash
npm install react-router-dom
```

---

## 1. `vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
});
```

---

## 2. `src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const redirect = sessionStorage.redirect;
if (redirect) {
  sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", redirect);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

## 3. `src/App.jsx`

```jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

function detectLang() {
  const lang = navigator.language.toLowerCase();
  return lang.startsWith("fr") ? "fr" : "en";
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${detectLang()}`} replace />} />
      <Route path="/fr/*" element={<Home lang="fr" />} />
      <Route path="/en/*" element={<Home lang="en" />} />
    </Routes>
  );
}
```

---

## 4. `src/pages/Home.jsx`

```jsx
export default function Home({ lang }) {
  return (
    <div>
      {lang === "fr" ? "Site en français" : "English website"}
    </div>
  );
}
```

---

## 5. `public/404.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script>
      sessionStorage.redirect = window.location.pathname;
      window.location.replace("/");
    </script>
  </head>
</html>
```

---

## 6. `package.json` (extrait)

```json
{
  "homepage": "https://authinteractive.com"
}
```

---

## Résultat attendu

- `/` → `/fr` ou `/en`
- `/fr` → français
- `/en` → anglais
- Refresh OK (pas de 404)
