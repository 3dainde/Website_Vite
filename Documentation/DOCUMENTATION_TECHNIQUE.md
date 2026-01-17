# Documentation Technique - AuthInteractive v1.2.1

## Vue d'Ensemble Architecturale

AuthInteractive est une application web complète construite avec React et Vite, conçue comme une plateforme e-commerce moderne pour produits numériques et services créatifs. L'architecture suit les meilleures pratiques React modernes avec une séparation claire des responsabilités.

## Stack Technologique

### Frontend
- **React 19** - Framework UI principal avec hooks
- **Vite 5.4** - Build tool et serveur développement ultra-rapide
- **React Router v7** - Gestion du routage et de la navigation
- **TypeScript** - Type safety pour composants critiques
- **CSS3** - Styling responsive avec variables CSS

### Backend Services
- **Firebase** - Authentification et base de données (Firestore)
- **Stripe** - Intégration paiements
- **Formspree** - Gestion formulaires de contact

### Services Tiers
- **myMemory Translation** - Traduction automatique
- **IP Geolocation** - Détection localisation utilisateur

## Architecture Application

### 1. Système de Routage

```
/                    → Home (page d'accueil)
/produits            → Catalogue e-commerce
/produit/:id         → Détail produit
/jeux                → Galerie jeux vidéo (2 colonnes)
/developpement       → Ressources développeurs
/contact             → Formulaire contact (Formspree)
/login               → Authentification
/register            → Inscription
/pricing             → Page tarification
/checkout            → Panier et commande
/success             → Confirmation paiement
/dashboard           → Espace utilisateur
```

### 2. System de Traduction

#### Fonctionnement
1. Détection automatique langue via géolocalisation IP
2. Fallback sur langue navigateur si détection échoue
3. Traduction automatique via API myMemory
4. Préchargement des traductions au démarrage
5. Cache localStorage (24h)

#### Services
- `geolocation.service.ts` - Détection IP + mapping pays/langue
- `translation.service.ts` - Traduction dynamique des contenus
- `TranslationContext.tsx` - Context API pour accès global

#### Utilisation
```jsx
import { useTranslation } from '../context/TranslationContext';

function Component() {
  const { lang, setLang, t, loading } = useTranslation();
  
  return <h1>{t.home.welcome}</h1>;
}
```

### 3. Gestion d'État

#### Context API
- **LanguageContext** - Langue et traductions
- **AuthContext** - Utilisateur connecté et authentification
- **CartContext** - Panier d'achat persistant
- **TranslationContext** - Traductions complètes

#### Persistance
- `localStorage` - Panier, langue, préférences utilisateur
- `sessionStorage` - Données temporaires de session
- `Firebase` - Données persistentes utilisateur (optionnel)

### 4. Composants Principaux

#### Navigation
- `navbar` - Barre de navigation responsive
- `hamburger` - Menu mobile avec fermeture intelligente
- Fermeture au clic extérieur via `useEffect` et `useRef`

#### Formulaires
- `Contact.jsx` - Contact form avec Formspree
- Validation côté client
- Gestion des états (loading, succès, erreur)

#### Pages
- Pages React avec CSS modulé
- Lazy loading possible via React.lazy()
- Server-side rendering possible (futur)

## Système de Styling

### Architecture CSS
- **App.css** - Styles globaux et composants principaux (700+ lignes)
- **Fichiers CSS modulaires** - Styles spécialisés par domaine
  - `Auth.css` - Pages authentification
  - `Checkout.css` - Panier et paiement
  - `Pricing.css` - Page tarification
  - `ProductDetail.css` - Détail produit
  - `Dashboard.css` - Espace utilisateur

### Design System
```css
:root {
  --primary: #0096ff;      /* Bleu principal */
  --secondary: #1e1e2e;    /* Fond sombre */
  --accent: #00d4ff;       /* Accent cyan */
  --text: #ffffff;         /* Texte principal */
  --text-secondary: #b0b0b0; /* Texte secondaire */
  --bg-light: #2a2a3e;     /* Fond léger */
  --border: #404050;       /* Bordures */
}
```

### Responsive Design
- Mobile-first approach
- Breakpoint mobile : 600px
- Grille flexible avec CSS Grid
- Flexbox pour composants

## Formulaire de Contact

### Intégration Formspree
1. Envoie directement à support@authinteractive.com
2. Sans backend requis
3. Formspree gère les emails et le spam

### Flux
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });
  
  if (response.ok) {
    // Succès - afficher message
  }
}
```

### Variables d'Environnement
```env
VITE_FORMSPREE_ID=xreeejpo  # ID du formulaire Formspree
```

## Pages Jeux Vidéo

### Layout
- Grille 2 colonnes sur desktop
- 1 colonne sur mobile
- Centrée avec max-width 900px
- Cards harmonisées avec contact form

### Structure
```jsx
const games = [
  { id: 1, title: 'Titre', genre: 'Genre', status: 'En développement' },
  { id: 2, title: 'Titre', genre: 'Genre', status: 'En développement' }
];
```

## Footer Dynamique

- Année automatique via `new Date().getFullYear()`
- Liens sociaux (Facebook, YouTube, Instagram, Twitter)
- Sélecteur de langue
- Mise à jour automatique chaque année

## Performance

### Optimisations
- Code splitting avec React Router
- Tree shaking via ES modules
- CSS minifié en production
- JavaScript minifié et uglified
- Gzip compression

### Métriques
- Build time : ~1.5s
- Bundle size : ~300KB (gzipped ~90KB)
- Lazy loading pages disponible

## Déploiement

### GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

Déploie sur branche `gh-pages` automatiquement.

### Configuration Domaine Custom
1. Fichier `CNAME` dans `public/`
2. Configurez DNS du registraire
3. HTTPS automatique via GitHub

## Sécurité

### Bonnes Pratiques
- Variables d'environnement pour clés sensibles
- `.env.local` jamais committé
- Validation formulaires côté client ET serveur (futur)
- CORS pour API externes
- Content Security Policy (optionnel)

### Authentification Firebase
- À implémenter pour sections sécurisées
- Session tokens
- Refresh token automatique

## Extensibilité

### Ajouter une Nouvelle Page
1. Créer composant dans `src/pages/`
2. Ajouter route dans `App.jsx`
3. Ajouter traductions dans `translations.js`
4. Ajouter CSS si nécessaire

### Ajouter une Nouvelle Langue
1. Ajouter configuration dans `geolocation.service.ts`
2. Ajouter traductions dans `translations.js`
3. Tester avec différents navigateurs

### Ajouter Service Firebase
1. Initialiser dans `firebaseConfig.js`
2. Créer service dans `services/firebase.service.ts`
3. Utiliser via custom hook

## Debugging

### Outils
- React DevTools (extension navigateur)
- Vite DevTools
- Browser DevTools (F12)

### Mode Développement
```bash
npm run dev
```
Hot module replacement activé automatiquement.

### Logs Utiles
- `console.log('🌐 Langue détectée:', lang)`
- `console.log('🔄 Chargement traductions...')`
- `console.log('📧 Message envoyé')`

## Maintenance

### Mise à Jour Dépendances
```bash
npm outdated          # Voir packages obsolètes
npm update            # Mettre à jour
npm audit fix         # Fixer vulnérabilités
```

### Versionning
Suivre Semantic Versioning :
- v1.2.1 (MAJOR.MINOR.PATCH)
- Tags GitHub pour chaque release

## Intégrations Futures

- Authentification complète Firebase
- Paiements Stripe intégrés
- CDN pour images/assets
- Service Worker (PWA)
- Analytics (Google Analytics)
- Email marketing (Mailchimp)

## Support et Contact

- Repository : https://github.com/3dainde/Website_Vite
- Issues : Utilisez GitHub Issues
- Documentation : `/Documentation/`

---

**Version** : 1.2.1  
**Dernière mise à jour** : Janvier 2026
