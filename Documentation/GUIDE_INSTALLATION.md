# Installation Guide - AuthInteractive v1.2.2

Complete installation and setup guide for the AuthInteractive project.

## System Requirements

- Node.js v16+ (recommended v18+)
- npm or pnpm
- Git
- Modern web browser

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

## Step 3: Configure Environment Variables

Create a `.env` file in the project root using `.env.example` as a template:

```bash
cp .env.example .env
```

Update the `.env` file with your actual credentials:

```env
# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your_app_password_here
PORT=3001
NODE_ENV=development

# Firebase Configuration (optional)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

# Stripe Configuration (optional)
VITE_STRIPE_PUBLISHABLE_KEY=your_public_key
```

IMPORTANT: Never commit `.env` files containing sensitive credentials. The `.env` file is listed in `.gitignore`.

### Gmail SMTP Configuration

To use the contact form with Gmail SMTP:

1. Enable 2-Factor Authentication on your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows/Linux"
4. Copy the generated 16-character password
5. Add credentials to `.env`:
   - GMAIL_USER: your-email@gmail.com
   - GMAIL_PASSWORD: paste the app password here

## Step 4: Start Development Server

Terminal 1 - Start backend server:
```bash
npm run server:dev
```

Terminal 2 - Start frontend (new terminal):
```bash
npm run dev
```

The application will be accessible at `http://localhost:5174`

## Step 5: Build for Production

```bash
npm run build
```

Compiled files are in the `dist/` folder

## Step 6: Preview Production Build

```bash
npm run preview
```

## Deployment

### GitHub Pages

```bash
npm run deploy
```

The site will be accessible at `https://your-username.github.io/Website_Vite/`

### Custom Domain with GitHub Pages

1. Create a `CNAME` file in the `public/` folder with your domain name
2. Configure DNS records at your registrar to point to GitHub Pages
3. Enable HTTPS in repository settings

### Alternative Platforms

The project can be deployed on:
- Vercel
- Netlify
- Heroku
- AWS Amplify
- Any server with Node.js support

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

## Security

Sensitive credentials must be protected:
- Never commit `.env` files
- Use `.env.example` as a template
- All sensitive files are protected by `.gitignore`
- Use only public keys for client-side services
- Keep private keys server-side only
- Rotate credentials regularly
- Use environment-specific configuration for different deployments

## Besoin d'Aide ?

- Documentation Vite : https://vitejs.dev
- Documentation React : https://react.dev
- Documentation React Router : https://reactrouter.com
- Issues GitHub : https://github.com/3dainde/Website_Vite/issues
