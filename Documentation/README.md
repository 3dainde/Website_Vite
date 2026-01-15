# 🎮 AuthInteractive - Digital Products Platform

![Version](https://img.shields.io/badge/version-2.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)
![i18n](https://img.shields.io/badge/i18n-auto-brightgreen)

> **Plateforme de vente de produits digitaux premium** - Templates Unreal Engine, Assets 3D, Formations  
> ✨ **Nouveau** : Traduction automatique basée sur la géolocalisation IP

## 🚀 Quick Start

### Installation

```bash
# Clone le repository
git clone https://github.com/3dainde/Website_Vite.git
cd Website_Vite

# Installe les dépendances
npm install
# ou
pnpm install

# Démarrer le développement
npm run dev
```

### Configuration

Crée un fichier `.env` à la racine:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

## 🌐 Traduction Automatique (v2.1.0)

Le site détecte automatiquement la langue de l'utilisateur via son IP et traduit le contenu en temps réel !

### Fonctionnalités
- 🌍 Détection automatique de la langue (30+ pays)
- 🚀 Traduction en temps réel via API
- 💾 Cache intelligent (performances optimales)
- 🔄 Support de 100+ langues
- ⚡ < 2 secondes au premier chargement

### Documentation Complète
- 📊 [Récapitulatif](./IMPLEMENTATION_SUMMARY.md)
- 📘 [Guide Technique](./TRANSLATION_AUTO_GUIDE.md)
- ⚡ [Démarrage Rapide](./TRANSLATION_QUICK_START.md)
- 🔄 [Guide de Migration](./MIGRATION_GUIDE.md)
- 🧪 [Tests](./TRANSLATION_TESTS.md)

## 📋 Versions

### ✨ v2.1.0 - Traduction Automatique (Janvier 2026)
- Détection automatique de langue via IP
- Traduction en temps réel
- Cache multi-niveaux
- Support de 100+ langues
- Documentation complète

### ✅ v2.0 - Commercial Edition
- Authentification utilisateur
- Dashboard utilisateur
- Page tarification
- Services Stripe/Firebase

### 🔄 v2.1 - Payments Integration (Février 2026)
- Intégration Stripe complète
- Webhooks
- Factures automatiques
- Email notifications

[Voir le ROADMAP complet →](./ROADMAP.md)

## 📦 Caractéristiques

### 🛒 E-Commerce
- ✅ Catalogue de 6+ produits
- ✅ Filtrage et tri avancés
- ✅ Détails produit complets
- ✅ Panier persistant

### 👤 Utilisateurs
- ✅ Authentification sécurisée
- ✅ Dashboard personnalisé
- ✅ Gestion de profil
- ✅ Historique d'achats

### 💳 Paiements
- 🔄 Intégration Stripe (v2.1)
- 🔄 Factures automatiques
- 🔄 Gestion remboursements
- 🔄 Reçus email

### 🌍 Internationalization
- ✅ Français (FR)
- ✅ Anglais (EN)
- ✅ Espagnol (ES)
- ✅ Allemand (DE)
- ✅ Italien (IT)
- ✅ Russe (RU)

## 🏗️ Architecture

### Stack
- **Frontend:** React 18 + Vite
- **Styling:** CSS + Responsive Design
- **State:** Context API
- **Routing:** React Router v6
- **Database:** Firebase Firestore (coming soon)
- **Auth:** Firebase Auth (coming soon)
- **Payments:** Stripe (coming soon)

### Structure Dossiers
```
src/
├── pages/          # Pages principales
├── context/        # Context API (Cart, Auth)
├── services/       # Services externes
├── data/          # Données statiques
├── types/         # Types TypeScript
├── utils/         # Utilitaires
└── styles/        # CSS modulaires
```

## 📚 Documentation

- [Installation Guide](./src/Add%20Price/installation_guide.md)
- [Version 2.0 Guide](./VERSION_2.0_GUIDE.md)
- [Roadmap 2026](./ROADMAP.md)
- [Changelog](./CHANGELOG.md)

## 🎯 Roadmap

### Q1 2026
- [x] E-Commerce Foundation (v1.2.0)
- [x] Commercial Edition (v2.0)
- [ ] Stripe Integration (v2.1)

### Q2 2026
- [ ] Affiliate System (v2.2)
- [ ] Analytics Dashboard (v2.3)
- [ ] Admin Panel

### Q3+ 2026
- [ ] API REST (v3.0)
- [ ] Marketplace
- [ ] Plugins System

[Voir le roadmap complet →](./ROADMAP.md)

## 🔧 Commandes

### Développement
```bash
npm run dev      # Démarrer dev server
npm run build    # Build pour production
npm run preview  # Prévisualiser build
```

### Linting (À configurer)
```bash
npm run lint     # ESLint
npm run format   # Prettier
```

## 📊 Statistiques du Projet

- **Lignes de code:** 3,500+
- **Pages:** 12
- **Composants:** 4 pages e-commerce + 6 pages utilisateur
- **Produits:** 6 templates/assets/formations
- **Langues:** 6
- **Temps de développement:** 1 jour

## 🤝 Contribution

Les contributions sont bienvenues! Merci de:

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changes (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous license MIT. Voir [LICENSE](./LICENSE) pour plus de détails.

## 👥 Auteurs

- **3dainde** - Développeur principal

## 🐛 Reporting de Bugs

Trouvé un bug? Ouvre une [issue](https://github.com/3dainde/Website_Vite/issues)

## 📞 Support

- 📧 Email: support@authinteractive.com
- 💬 Discord: [Rejoindre le serveur]
- 🐙 GitHub: [Website_Vite](https://github.com/3dainde/Website_Vite)

## 🎓 Ressources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)

## 📈 Statut du Projet

```
Status: ACTIVE ✅
Latest Release: v2.0.0
Last Updated: January 13, 2026
Next Release: v2.1 (February 2026)
```

---

**Made with ❤️ by AuthInteractive**

*Une plateforme pour vendre vos créations digitales - Templates, Assets & Formations*
