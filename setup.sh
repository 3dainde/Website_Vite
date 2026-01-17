#!/bin/bash
# Script de setup automatisé pour AuthInteractive

echo "🚀 Setup AuthInteractive - Système de Contact Email"
echo "=================================================="
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

echo "✅ Node.js détecté: $(node -v)"
echo ""

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

echo ""
echo "✅ Installation terminée!"
echo ""

echo "⚙️  CONFIGURATION REQUISE:"
echo "=================================================="
echo ""
echo "1. Ouvrez le fichier .env et configurez:"
echo "   - GMAIL_USER=votre-email@gmail.com"
echo "   - GMAIL_PASSWORD=mot-de-passe-application"
echo ""
echo "2. Pour obtenir le mot de passe app Gmail:"
echo "   - Allez sur: https://myaccount.google.com"
echo "   - Activer 2FA si ce n'est pas déjà fait"
echo "   - Aller à: Sécurité > Mots de passe d'application"
echo "   - Sélectionner 'Mail' et 'Windows/Linux'"
echo "   - Copier le mot de passe généré"
echo ""

echo "🚀 DÉMARRAGE:"
echo "=================================================="
echo ""
echo "Terminal 1 - Serveur backend:"
echo "  npm run server:dev"
echo ""
echo "Terminal 2 - Frontend (dans un autre terminal):"
echo "  npm run dev"
echo ""

echo "✨ Une fois démarré, testez sur: http://localhost:5173"
echo ""
