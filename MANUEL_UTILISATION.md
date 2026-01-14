# 📚 Manuel d'Utilisation - AuthInteractive Website

## 📖 Table des matières
1. [Introduction à Vite](#introduction-à-vite)
2. [Structure du projet](#structure-du-projet)
3. [Ajouter des produits](#ajouter-des-produits)
4. [Ajouter des jeux](#ajouter-des-jeux)
5. [Créer des liens entre pages](#créer-des-liens-entre-pages)
6. [Système de traduction](#système-de-traduction)
7. [Commandes utiles](#commandes-utiles)

---

## 🚀 Introduction à Vite

### Qu'est-ce que Vite ?
**Vite** (prononcé "vit", comme le mot français) est un outil de build moderne pour les applications web. Il offre :
- ⚡ **Démarrage ultra-rapide** : Le serveur de développement démarre en quelques millisecondes
- 🔥 **Hot Module Replacement (HMR)** : Les changements apparaissent instantanément sans recharger la page
- 📦 **Build optimisé** : Utilise Rollup pour créer des bundles performants

### Pourquoi Vite ?
- **Plus rapide que Webpack** : Utilise les modules ES natifs du navigateur
- **Moins de configuration** : Fonctionne out-of-the-box avec React
- **Écosystème moderne** : Compatible avec TypeScript, JSX, CSS modules, etc.

### Concepts clés
```javascript
// import.meta.env : Variables d'environnement Vite
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

// import.meta.hot : Hot Module Replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
```

---

## 📁 Structure du projet

```
Website_Vite/
├── src/
│   ├── pages/           # Pages React
│   │   ├── Home.jsx
│   │   ├── Produits.jsx
│   │   ├── JeuxVideo.jsx
│   │   ├── Contact.jsx
│   │   └── Developpement.jsx
│   ├── App.jsx          # Composant principal
│   ├── App.css          # Styles globaux
│   ├── translations.js  # Traductions multilingues
│   ├── firebaseConfig.js
│   └── index.jsx        # Point d'entrée
├── public/              # Fichiers statiques
│   └── CNAME
├── images/              # Images
├── icons/               # Icônes
├── index.html           # HTML principal
├── vite.config.ts       # Configuration Vite
└── package.json         # Dépendances
```

---

## 🛍️ Ajouter des produits

### 1. Ajouter les traductions

Ouvrir `src/translations.js` et ajouter les clés nécessaires dans **toutes les langues** :

```javascript
// Dans chaque langue (fr, en, es, de, it, ru)
products: {
  // ... traductions existantes ...
  
  // Nouvelles traductions pour votre produit
  newGameTitle: 'Mon Nouveau Jeu',
  newGameDesc: 'Description de mon jeu',
  
  // Si c'est un service
  newServiceTitle: 'Mon Service',
  newServiceDesc: 'Description du service'
}
```

**⚠️ Important** : Ajouter la traduction dans **les 6 langues** (fr, en, es, de, it, ru)

### 2. Modifier le composant Produits

Ouvrir `src/pages/Produits.jsx` :

#### Option A : Ajouter un jeu dans la liste existante

```jsx
const products = [
  { id: 1, title: 'Neon Drift', price: '14.99€', descKey: 'neonDriftDesc' },
  { id: 2, title: 'Voidwalkers', price: '19.99€', descKey: 'voidwalkersDesc' },
  { id: 3, title: 'Echoes of Terra', price: '12.99€', descKey: 'echoesDesc' },
  // 🆕 Nouveau produit
  { id: 4, title: 'Mon Nouveau Jeu', price: '24.99€', descKey: 'newGameDesc' }
];
```

#### Option B : Ajouter une nouvelle section complète

Après la section `plugins`, ajouter :

```jsx
<section className="products-section">
  <h2>{t.products.newServiceTitle}</h2>
  <div className="products-grid">
    <div className="product-card">
      <div className="product-image">
        <div className="placeholder">{t.products.newServiceTitle}</div>
      </div>
      <h3>{t.products.newServiceTitle}</h3>
      <p>{t.products.newServiceDesc}</p>
      <p className="price">{t.products.onQuote}</p>
      <button className="btn">{t.products.buy}</button>
    </div>
  </div>
</section>
```

### 3. Personnaliser avec une image

Remplacer le placeholder par une vraie image :

```jsx
<div className="product-image">
  <img src="/images/mon-jeu.png" alt="Mon Jeu" />
</div>
```

Placez l'image dans le dossier `/images/`

---

## 🎮 Ajouter des jeux

### 1. Ajouter les traductions des genres

Dans `src/translations.js` :

```javascript
games: {
  title: 'Nos Jeux',
  available: 'Disponible',
  coming: 'En développement',
  actionStrategy: 'Action-Stratégie',
  action: 'Action',
  adventure: 'Aventure',
  // 🆕 Nouveaux genres
  rpg: 'RPG',
  simulation: 'Simulation',
  puzzle: 'Puzzle',
  fps: 'FPS'
}
```

### 2. Ajouter le jeu dans la liste

Ouvrir `src/pages/JeuxVideo.jsx` :

```jsx
const games = [
  { id: 1, title: 'TBD', genreKey: 'actionStrategy' },
  { id: 2, title: 'TBD', genreKey: 'action' },
  { id: 3, title: 'TBD', genreKey: 'adventure' },
  // 🆕 Nouveau jeu
  { id: 4, title: 'My New Game', genreKey: 'rpg' }
];
```

### 3. Ajouter des détails et statut

Pour différencier les jeux disponibles vs en développement :

```jsx
const games = [
  { 
    id: 1, 
    title: 'Neon Drift', 
    genreKey: 'actionStrategy',
    status: 'available', // ou 'coming'
    image: '/images/neon-drift.jpg'
  }
];

// Dans le JSX
<span className={`status-badge status-${game.status === 'available' ? 'available' : 'coming'}`}>
  {game.status === 'available' ? t.games.available : t.games.coming}
</span>
```

### 4. Créer une page détaillée pour un jeu

#### Étape 1 : Créer le composant

Créer `src/pages/GameDetail.jsx` :

```jsx
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LanguageContext } from '../App';

export default function GameDetail() {
  const { t } = useContext(LanguageContext);
  const { gameId } = useParams();

  // Données du jeu (à adapter selon vos besoins)
  const gameData = {
    1: {
      titleKey: 'neonDriftTitle',
      descKey: 'neonDriftFullDesc',
      images: ['/images/neon-1.jpg', '/images/neon-2.jpg'],
      features: ['featNeonDrift1', 'featNeonDrift2', 'featNeonDrift3'],
      price: '14.99€'
    }
  };

  const game = gameData[gameId];

  return (
    <div className="page-container">
      <Link to="/jeux" className="back-link">← {t.games.backToList}</Link>
      <h1>{t.games[game.titleKey]}</h1>
      <div className="game-detail">
        <div className="game-gallery">
          {game.images.map((img, idx) => (
            <img key={idx} src={img} alt={`Screenshot ${idx + 1}`} />
          ))}
        </div>
        <div className="game-info">
          <p className="game-description">{t.games[game.descKey]}</p>
          <h3>{t.games.features}</h3>
          <ul>
            {game.features.map((feat, idx) => (
              <li key={idx}>{t.games[feat]}</li>
            ))}
          </ul>
          <p className="price">{game.price}</p>
          <button className="btn">{t.products.buy}</button>
        </div>
      </div>
    </div>
  );
}
```

#### Étape 2 : Ajouter la route

Dans `src/App.jsx`, importer et ajouter la route :

```jsx
import GameDetail from "./pages/GameDetail";

// Dans les Routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/produits" element={<Produits />} />
  <Route path="/jeux" element={<JeuxVideo />} />
  {/* 🆕 Nouvelle route pour les détails du jeu */}
  <Route path="/jeux/:gameId" element={<GameDetail />} />
  <Route path="/developpement" element={<Developpement />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

#### Étape 3 : Ajouter le lien dans la liste

Dans `src/pages/JeuxVideo.jsx` :

```jsx
import { Link } from 'react-router-dom';

// Remplacer le div par un Link
{games.map(game => (
  <Link to={`/jeux/${game.id}`} key={game.id} className="game-card">
    <div className="game-image">
      <div className="placeholder">{game.title}</div>
    </div>
    <h3>{game.title}</h3>
    <p>{t.games[game.genreKey]}</p>
    <span className="status-badge status-coming">
      {t.games.coming}
    </span>
  </Link>
))}
```

---

## 🔗 Créer des liens entre pages

### Liens internes avec React Router

React Router utilise le composant `<Link>` pour la navigation :

```jsx
import { Link } from 'react-router-dom';

// Lien simple
<Link to="/produits">Voir nos produits</Link>

// Lien avec classe CSS
<Link to="/contact" className="btn">Contactez-nous</Link>

// Lien avec paramètre
<Link to={`/jeux/${gameId}`}>Voir le jeu</Link>
```

### Navigation programmatique

Pour naviguer depuis du code JavaScript :

```jsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Faire quelque chose...
    navigate('/produits');
  };

  return <button onClick={handleClick}>Aller aux produits</button>;
}
```

### Liens externes

Pour des liens vers d'autres sites :

```jsx
<a 
  href="https://example.com" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Lien externe
</a>
```

### Exemples pratiques

#### Retour à la page précédente
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
<button onClick={() => navigate(-1)}>← Retour</button>
```

#### Lien conditionnel
```jsx
{game.available ? (
  <Link to={`/jeux/${game.id}`}>Jouer maintenant</Link>
) : (
  <span>Bientôt disponible</span>
)}
```

#### Lien actif (menu actuel)
```jsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/produits" 
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  Produits
</NavLink>
```

---

## 🌍 Système de traduction

### Architecture

Le système utilise **React Context** pour gérer les traductions :

```
translations.js (source) 
    ↓
App.jsx (Context Provider)
    ↓
Pages (useContext pour lire)
```

### Ajouter une nouvelle clé de traduction

#### 1. Dans `translations.js`

```javascript
export const translations = {
  fr: {
    // ... sections existantes ...
    myNewSection: {
      title: 'Mon Titre',
      description: 'Ma description',
      button: 'Mon Bouton'
    }
  },
  en: {
    myNewSection: {
      title: 'My Title',
      description: 'My description',
      button: 'My Button'
    }
  },
  // ... répéter pour es, de, it, ru
};
```

#### 2. Dans un composant

```jsx
import { useContext } from 'react';
import { LanguageContext } from '../App';

function MyComponent() {
  const { t } = useContext(LanguageContext);

  return (
    <div>
      <h1>{t.myNewSection.title}</h1>
      <p>{t.myNewSection.description}</p>
      <button>{t.myNewSection.button}</button>
    </div>
  );
}
```

### Interpolation de variables

Pour des traductions dynamiques :

```javascript
// translations.js
welcome: 'Bienvenue {name} !'

// Composant
const userName = "Alice";
<p>{t.home.welcome.replace('{name}', userName)}</p>
```

### Traductions plurielles

```javascript
// translations.js
itemCount: {
  zero: 'Aucun article',
  one: '1 article',
  other: '{count} articles'
}

// Composant
const getItemText = (count) => {
  if (count === 0) return t.itemCount.zero;
  if (count === 1) return t.itemCount.one;
  return t.itemCount.other.replace('{count}', count);
};
```

---

## 💻 Commandes utiles

### Développement

```bash
# Démarrer le serveur de développement
npm run dev
# ou
pnpm dev

# Accès : http://localhost:5173/
```

### Build de production

```bash
# Compiler pour la production
npm run build

# Le résultat sera dans le dossier /dist
```

### Prévisualiser le build

```bash
# Prévisualiser la version de production
npm run preview
```

### Gestion des dépendances

```bash
# Installer une nouvelle dépendance
npm install package-name

# Installer une dépendance de développement
npm install -D package-name

# Mettre à jour les dépendances
npm update
```

### Débogage

```bash
# Afficher les erreurs détaillées
npm run dev -- --debug

# Vider le cache de Vite
rm -rf node_modules/.vite
```

---

## 🎨 Personnalisation du style

### Modifier les couleurs globales

Dans `src/App.css` :

```css
:root {
  --primary: #0096ff;      /* Couleur principale */
  --secondary: #1e1e2e;    /* Couleur secondaire */
  --accent: #00d4ff;       /* Couleur accent */
  --text: #ffffff;         /* Texte */
  --bg-light: #2a2a3e;     /* Fond clair */
}
```

### Ajouter des styles à un composant

Créer un fichier CSS dédié ou ajouter dans `App.css` :

```css
/* Style pour les cartes de jeu */
.game-card {
  background: var(--bg-light);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s;
}

.game-card:hover {
  transform: translateY(-5px);
}
```

---

## 🔧 Configuration avancée

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_API_URL=https://api.example.com
VITE_FIREBASE_API_KEY=your_key_here
```

Utilisation :

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

⚠️ Préfixe `VITE_` obligatoire pour que Vite les expose

### Configuration Vite personnalisée

Dans `vite.config.ts` :

```typescript
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,           // Changer le port
    open: true,           // Ouvrir le navigateur automatiquement
    host: true            // Exposer sur le réseau local
  },
  build: {
    outDir: "dist",
    sourcemap: false
  }
});
```

---

## 📝 Bonnes pratiques

### 1. Organisation des fichiers
- Un composant = un fichier
- Nommer les fichiers en PascalCase : `MyComponent.jsx`
- Grouper les composants liés dans des dossiers

### 2. Performance
- Utiliser `React.memo()` pour éviter les re-renders inutiles
- Lazy loading pour les pages : `const Home = lazy(() => import('./pages/Home'))`

### 3. Traductions
- **Toujours** ajouter les traductions dans les 6 langues
- Utiliser des clés descriptives : `productCard.title` plutôt que `pc.t`

### 4. Git
- Commiter régulièrement avec des messages clairs
- Ne pas commiter `node_modules/` ni `.env`

---

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
```

### Erreur de traduction
- Vérifier que la clé existe dans **toutes les langues**
- Vérifier la syntaxe JSON dans `translations.js`

### Erreur de build
```bash
# Nettoyer et reconstruire
rm -rf dist
npm run build
```

### Hot reload ne fonctionne pas
- Redémarrer le serveur : Ctrl+C puis `npm run dev`
- Vider le cache du navigateur

---

## 📚 Ressources

- [Documentation Vite](https://vitejs.dev/)
- [Documentation React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🎯 Checklist pour ajouter une nouvelle fonctionnalité

- [ ] Ajouter les traductions dans les 6 langues
- [ ] Créer ou modifier le composant React
- [ ] Ajouter la route si nécessaire dans `App.jsx`
- [ ] Tester dans le navigateur
- [ ] Vérifier que toutes les langues fonctionnent
- [ ] Tester les liens entre pages
- [ ] Vérifier le responsive (mobile/desktop)
- [ ] Commiter les changements avec un message clair

---

**Fait avec ❤️ pour AuthInteractive**

*Version 1.0 - Janvier 2026*
