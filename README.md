# AuthInteractive

A modern, full-featured e-commerce web application built with React, Vite, and Express.

## Overview

AuthInteractive is a complete platform for managing and selling digital products and creative services. The application features secure authentication, multi-language support, automated contact forms, and integrated payment processing.

## Features

- Modern React 19 architecture with Vite
- Multi-language support (6 languages)
- Contact form and "notify me" newsletter through a free Cloudflare Worker + Brevo (see Documentation/EMAIL_AUTOMATION.md)
- Automatic spam and bot protection
- Product catalog and e-commerce functionality
- User authentication and dashboard
- Responsive design for all devices
- Type-safe with TypeScript
- Production-ready build pipeline

## Technology Stack

### Frontend
- React 19
- Vite 5.4
- React Router v7
- TypeScript
- CSS3

### Backend
- Cloudflare Workers (folder `worker/`), free plan
- Brevo API (transactional e-mails + mailing list)
- TypeScript

### Infrastructure
- GitHub Pages deployment
- Firebase integration (authentication, database)
- Stripe payment processing

## Quick Start

### Prerequisites
- Node.js v16+ (recommended v18+)
- npm or pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/3dainde/Website_Vite.git
cd Website_Vite
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Update `.env` with your credentials (Gmail SMTP, Firebase, etc.)

4. Start the development servers:

Terminal 1 - Backend (e-mail API):
```bash
npm --prefix worker install
npm run api:dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

The application will be available at `http://localhost:5174`

## Development

### Available Commands

```bash
npm run dev           # Start frontend development server
npm run api:dev       # Start the e-mail API locally (Cloudflare Worker)
npm run api:deploy    # Deploy the e-mail API
npm run build         # Create production build
npm run preview       # Preview production build locally
npm run deploy        # Build and deploy to GitHub Pages
```

### Project Structure

```text
D:\AuthInteractive/
├── publier-refonte.bat               # Script batch de publication automatique (GitHub + GitHub Pages)
├── CUBE_MainMenu_Title01.mp3         # Bande sonore originale (Titre 01)
├── CUBE_MainMenu_Title02.mp3         # Bande sonore originale (Titre 02)
├── auth-interactive-dev/             # Dépôt initial / workspace de référence
└── Vite Project/                     # 🚀 PROJET PRINCIPAL DU SITE (React 19 + Vite)
    ├── package.json                  # Dépendances (React 19, Vite, Stripe, Firebase, i18next)
    ├── vite.config.ts                # Configuration du bundler Vite
    ├── tsconfig.json                 # Configuration TypeScript
    ├── index.html                    # Entrée HTML principale (polices Orbitron, Rajdhani, Inter)
    ├── CNAME                         # Domaine personnalisé (authinteractive.com)
    ├── .env.example                  # Variables d'environnement d'exemple
    │
    ├── public/                       # Fichiers statiques servis à la racine
    │   ├── 404.html                  # Redirection SPA pour GitHub Pages
    │   ├── CNAME                     # Configuration domaine pour GitHub Pages
    │   ├── favicon.png & logo.png    # Identité visuelle AuthInteractive
    │   ├── icons/                    # Icônes SVG et polices FontAwesome
    │   ├── images/
    │   │   ├── products/             # Illustrations des templates et formations
    │   │   └── site/                 # Visuels du site (hero.webp, cube.webp, wingsuit.webp...)
    │   └── music/                    # Extraits musicaux pour la boutique (LISEZMOI.txt...)
    │
    ├── src/                          # Code source de l'application
    │   ├── index.jsx                 # Point d'entrée React 19 (#root)
    │   ├── App.jsx                   # Routeur React Router v7, Navigation, Footer, Providers
    │   ├── App.css                   # Thème global néon cyan (refonte 2026, variables CSS)
    │   ├── styles.css                # Styles utilitaires
    │   │
    │   ├── components/               # Composants réutilisables
    │   │   ├── Icons.jsx             # Bibliothèque d'icônes SVG intégrées (Logo, Menu, Cart...)
    │   │   └── NewsletterForm.jsx    # Formulaire newsletter "Être averti" relié à l'API Brevo
    │   │
    │   ├── context/                  # Gestion d'état global (React Context)
    │   │   ├── AuthContext.tsx       # Gestion des sessions et utilisateurs Firebase
    │   │   ├── CartContext.tsx       # Panier d'achat e-commerce (musiques, templates)
    │   │   └── TranslationContext.tsx# Internationalisation dynamique (FR / EN)
    │   │
    │   ├── data/                     # Données et contenus du site
    │   │   ├── siteData.ts           # Projets (FOCUS, Wingsuit, Cube System), Devlog, Musiques
    │   │   └── productsData.ts       # Catalogue produits (Templates Unreal Engine, Formations)
    │   │
    │   ├── pages/                    # Pages de l'application
    │   │   ├── Home.jsx              # Accueil : vitrine studio, projets vedettes, portes boutique
    │   │   ├── JeuxVideo.jsx         # Catalogue des jeux en développement, R&D et Devlog
    │   │   ├── Boutique.jsx          # Boutique : écoute des musiques et catalogue templates
    │   │   ├── Contact.jsx           # Formulaire de contact avec protection anti-spam
    │   │   ├── ProductDetail.tsx     # Fiche détaillée d'un produit (fonctionnalités, achat)
    │   │   ├── Checkout.tsx          # Tunnel de commande et paiement Stripe sécurisé
    │   │   ├── Success.tsx           # Page de confirmation après paiement validé
    │   │   ├── Login.tsx             # Page de connexion
    │   │   ├── Register.tsx          # Page de création de compte
    │   │   ├── Dashboard.tsx         # Espace membre (accès aux achats et clés)
    │   │   └── Pricing.tsx           # Tarification des offres
    │   │
    │   ├── services/                 # Connecteurs et logique métier
    │   │   ├── email.service.ts      # Envoi de messages via l'API Cloudflare Worker
    │   │   ├── stripe.service.ts     # Initialisation des sessions Stripe Checkout
    │   │   ├── firebase.service.ts   # Configuration et services Firebase
    │   │   ├── geolocation.service.ts# Détection géographique pour la langue et devise
    │   │   └── translation.service.ts# Service de chargement des traductions
    │   │
    │   ├── styles/                   # Styles CSS spécifiques par page
    │   │   ├── Auth.css              # Styles pour Login / Register
    │   │   ├── Checkout.css          # Styles du tunnel de paiement
    │   │   ├── Dashboard.css         # Styles de l'espace client
    │   │   ├── Pricing.css           # Styles des grilles de prix
    │   │   └── ProductDetail.css     # Styles des pages produits
    │   │
    │   └── types/                    # Définitions TypeScript
    │       └── auth.ts               # Types utilisateur et profils
    │
    ├── worker/                       # ⚡ BACKEND SERVERLESS (Cloudflare Worker)
    │   ├── wrangler.toml             # Configuration du worker Cloudflare
    │   ├── package.json              # Dépendances du worker
    │   ├── src/index.ts              # API REST (contact, mailing-list, Brevo)
    │   ├── scripts/send-news.mjs     # Script Node.js d'envoi de newsletters
    │   └── news/exemple-focus.html   # Gabarit d'e-mail d'information FOCUS
    │
    └── Documentation/                # Documentation technique
        ├── EMAIL_AUTOMATION.md       # Configuration de l'API e-mail Cloudflare + Brevo
        ├── STRIPE_CONFIGURATION.md   # Configuration des clés Stripe (Live & Test)
        └── TECHNICAL_DOCUMENTATION.md# Documentation technique globale
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# E-mail API (Cloudflare Worker)
VITE_API_URL=https://api.authinteractive.com

# Firebase (optional)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...

# Stripe (optional)
VITE_STRIPE_PUBLISHABLE_KEY=...
```

### Security Notes

- Credentials in `.env` are protected by `.gitignore`
- Never commit sensitive files to version control
- Use Gmail App Passwords for SMTP authentication
- Store private keys server-side only

## Deployment

### GitHub Pages

```bash
npm run deploy
```

This command builds the application and deploys it to the `gh-pages` branch.

### Custom Domain

1. Add your domain to `public/CNAME`
2. Configure DNS records at your registrar
3. Enable HTTPS in repository settings

### Other Platforms

The project can be deployed to Vercel, Netlify, Heroku, AWS Amplify, or any Node.js-compatible server.

## Security

- Contact form includes rate limiting (5 requests per IP per 15 minutes)
- Bot protection via honeypot field
- Automatic spam detection
- Email validation
- Input sanitization
- CORS protection
- Sensitive credentials stored in `.env`

## Documentation

- Full installation guide: [Installation Guide](Documentation/GUIDE_INSTALLATION.md)
- Technical documentation: [Technical Documentation](Documentation/TECHNICAL_DOCUMENTATION.md)

## Troubleshooting

### Emails Not Sending
- Check https://api.authinteractive.com/api/health
- Check the Worker logs: `cd worker && npx wrangler tail`
- Check that the domain is authenticated in Brevo (DKIM)
- Full guide: [Documentation/EMAIL_AUTOMATION.md](Documentation/EMAIL_AUTOMATION.md)

### Build Failures
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Verify TypeScript compilation: `npx tsc --noEmit`

## Support

For issues and questions:
- GitHub Issues: https://github.com/3dainde/Website_Vite/issues
- Email: support@authinteractive.com

## License

All rights reserved. AuthInteractive 2024-2026.

## Version

Current version: 2.1.0

Last updated: October 2026
