# Guide d'Installation - AuthInteractive v1.2.1

## Prérequis Système

- Node.js v16+ (recommandé v18+)
- npm ou pnpm
- Git
- Un navigateur moderne

## Étape 1 : Cloner le Repository

```bash
git clone https://github.com/3dainde/Website_Vite.git
cd Website_Vite
```

## Étape 2 : Installer les Dépendances

```bash
npm install
```

Ou avec pnpm :
```bash
pnpm install
```

## Étape 3 : Configuration des Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Formspree (pour le formulaire de contact)
VITE_FORMSPREE_ID=votre_id_ici

# Firebase (optionnel, pour futures fonctionnalités)
VITE_FIREBASE_API_KEY=votre_clé_api
VITE_FIREBASE_AUTH_DOMAIN=votre_domaine
VITE_FIREBASE_PROJECT_ID=votre_projet_id

# Stripe (optionnel, pour paiements futurs)
VITE_STRIPE_PUBLISHABLE_KEY=votre_clé_publique
```

### Configuration Formspree

1. Allez sur https://formspree.io
2. Créez un compte gratuit
3. Créez un nouveau formulaire "website"
4. Récupérez l'ID du formulaire dans l'URL : `https://formspree.io/f/xxxxxID`
5. Insérez cet ID dans `VITE_FORMSPREE_ID`

## Étape 4 : Lancer le Serveur de Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## Étape 5 : Compiler pour Production

```bash
npm run build
```

Les fichiers compilés sont dans le dossier `dist/`

## Étape 6 : Prévisualiser le Build Production

```bash
npm run preview
```

## Déploiement

### GitHub Pages

```bash
npm run build
npx gh-pages -d dist
```

Le site sera accessible sur `https://votre-username.github.io/Website_Vite/`

### Domaine Custom avec GitHub Pages

1. Créez un fichier `CNAME` dans le dossier `public/` avec votre domaine
2. Configurez les DNS chez votre registraire pour pointer vers GitHub Pages
3. Activez HTTPS dans les paramètres du repository

### Autres Plateformes

Le projet peut être déployé sur :
- Vercel
- Netlify
- Heroku
- AWS Amplify
- n'importe quel serveur avec support Node.js

## Structure du Projet

```
Website_Vite/
├── src/
│   ├── pages/           # Pages React
│   ├── components/      # Composants réutilisables
│   ├── context/         # Context API (authentification, panier, traduction)
│   ├── services/        # Services (Firebase, Stripe, Formspree)
│   ├── data/            # Données statiques
│   ├── styles/          # Fichiers CSS spécialisés
│   ├── types/           # Types TypeScript
│   ├── utils/           # Fonctions utilitaires
│   ├── App.jsx          # Composant principal
│   ├── App.css          # Styles globaux
│   └── index.jsx        # Point d'entrée
├── public/              # Assets statiques
├── dist/                # Build production (généré)
├── Documentation/       # Cette documentation
├── package.json         # Dépendances et scripts
└── vite.config.ts       # Configuration Vite
```

## Dépendances Principales

- **React 19** - Framework UI
- **Vite 5** - Build tool et serveur dev
- **React Router v7** - Routage
- **Firebase** - Backend (authentification, base de données)
- **Stripe.js** - Intégration paiements
- **TypeScript** - Type safety

## Scripts Disponibles

```bash
npm run dev       # Serveur de développement
npm run build     # Compile pour production
npm run preview   # Prévisualise le build
npm run build --host  # Build accessible via réseau
```

## Configuration Avancée

### Vite

Modifiez `vite.config.ts` pour :
- Changer le port du serveur dev
- Ajouter des alias d'imports
- Configurer le build

### TypeScript

Modifiez `tsconfig.json` pour :
- Ajouter des types globaux
- Changer les options de compilation
- Configurer les chemins des imports

## Troubleshooting

### Port 5173 déjà utilisé

```bash
npm run dev -- --port 3000
```

### Module non trouvé

Assurez-vous que toutes les dépendances sont installées :
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build échoue

Vérifiez que TypeScript compile sans erreur :
```bash
npx tsc --noEmit
```

## Support Multi-Langue

Le site supporte 6 langues :
- Français (FR)
- Anglais (EN)
- Espagnol (ES)
- Allemand (DE)
- Italien (IT)
- Russe (RU)

La langue est détectée automatiquement selon le navigateur de l'utilisateur.

## Sécurité

Les clés sensibles doivent être dans `.env.local` (non committées) :
- Jamais commitez `.env.local`
- Utilisez `.env.example` pour documenter les variables requises
- Utilisez des clés publiques pour Stripe (les clés privées restent serveur)

## Besoin d'Aide ?

- Documentation Vite : https://vitejs.dev
- Documentation React : https://react.dev
- Documentation React Router : https://reactrouter.com
- Issues GitHub : https://github.com/3dainde/Website_Vite/issues
