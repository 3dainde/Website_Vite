# 🚀 Guide d'Installation - Système E-commerce AuthInteractive

## 📦 ÉTAPE 1 : Installation des dépendances

```bash
cd Website_Vite
npm install @stripe/stripe-js
```

## 📁 ÉTAPE 2 : Créer la structure des fichiers

Créez ces nouveaux fichiers dans votre projet :

```
Website_Vite/
├── src/
│   ├── context/
│   │   └── CartContext.tsx          ← CRÉER CE FICHIER
│   ├── data/
│   │   └── productsData.ts          ← CRÉER CE FICHIER
│   ├── pages/
│   │   ├── ProductDetail.tsx        ← CRÉER CE FICHIER
│   │   ├── Checkout.tsx             ← CRÉER CE FICHIER
│   │   ├── Success.tsx              ← CRÉER CE FICHIER
│   │   └── ProduitsImproved.tsx     ← CRÉER CE FICHIER
│   └── App.tsx                      ← REMPLACER VOTRE FICHIER ACTUEL
```

## 📝 ÉTAPE 3 : Copier les fichiers

1. **CartContext.tsx** → Artifact 1 (copier le code)
2. **productsData.ts** → Artifact 2 (copier le code)
3. **ProductDetail.tsx** → Artifact 3 (copier le code)
4. **Checkout.tsx** → Artifact 4 (copier le code)
5. **Success.tsx** → Artifact 5 (copier le code)
6. **ProduitsImproved.tsx** → Artifact 6 (copier le code)
7. **App.tsx** → Artifact 7 (REMPLACER votre App.tsx actuel)

## 🔥 ÉTAPE 4 : Configuration Firebase

### 4.1 Activer Firestore dans Firebase Console

1. Allez sur https://console.firebase.google.com
2. Sélectionnez votre projet
3. Dans le menu gauche → **Firestore Database**
4. Cliquez sur **Créer une base de données**
5. Choisissez le mode **Test** (pour commencer)
6. Sélectionnez votre région (europe-west1 pour l'Europe)

### 4.2 Créer les règles de sécurité Firestore

Dans **Firestore → Règles**, remplacez par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Les commandes peuvent être créées par tout le monde
    match /orders/{orderId} {
      allow create: if true;
      allow read: if true;
    }
    
    // Les téléchargements sont privés (nécessiteront authentification plus tard)
    match /downloads/{downloadId} {
      allow read, write: if true; // À sécuriser plus tard
    }
  }
}
```

## 💳 ÉTAPE 5 : Configuration Stripe (OBLIGATOIRE)

### 5.1 Créer un compte Stripe

1. Allez sur https://stripe.com
2. Créez un compte (gratuit)
3. Activez le **mode Test**

### 5.2 Récupérer vos clés API

1. Dashboard Stripe → **Developers** → **API keys**
2. Copiez :
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...)

### 5.3 Créer le fichier .env

Créez `.env` à la racine de `Website_Vite/` :

```env
# Firebase (vous avez déjà)
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_projet_id
VITE_FIREBASE_STORAGE_BUCKET=votre_projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Stripe (NOUVEAU - à ajouter)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_ICI
```

⚠️ **IMPORTANT** : Le secret key Stripe (sk_test_...) ne va PAS dans ce fichier ! Il ira dans Firebase Functions plus tard.

## 🧪 ÉTAPE 6 : Tester l'installation

```bash
npm run dev
```

Testez ces URLs :
- http://localhost:5173/ → Page d'accueil
- http://localhost:5173/produits → Voir les produits
- http://localhost:5173/produit/template-wingsuit-ue5 → Fiche produit
- http://localhost:5173/checkout → Panier

## ✅ Ce qui fonctionne MAINTENANT

✅ Navigation complète
✅ Page produits avec filtres
✅ Fiches produits détaillées
✅ Ajout au panier
✅ Page panier / checkout
✅ Sauvegarde des commandes dans Firestore
✅ Page de succès
✅ Multi-langue complet
✅ Design responsive

## 🚧 Ce qui reste à faire (Étape 7 - Firebase Functions)

❌ Paiement Stripe réel (nécessite Firebase Functions)
❌ Envoi d'emails automatiques
❌ Génération de liens de téléchargement sécurisés
❌ Webhooks Stripe

## 📸 Ajouter des images produits

Créez le dossier `public/images/products/` et ajoutez :
- wingsuit.jpg
- scifi-pack.jpg
- formation-ue5.jpg
- inventory.jpg
- nature.jpg
- blueprint.jpg

Ou utilisez des placeholders pour l'instant.

## 🐛 Dépannage

### Erreur "Cannot find module"
```bash
npm install
npm run dev
```

### Erreur Firebase
Vérifiez que votre `.env` contient bien toutes les clés Firebase.

### Le panier ne s'affiche pas
Vérifiez que `CartProvider` enveloppe bien `<Router>` dans App.tsx.

## 📞 Support

Si ça ne fonctionne pas, envoyez-moi :
1. Le message d'erreur complet
2. La console du navigateur (F12)
3. Le fichier où ça bloque

## 🎉 Prochaine étape

Une fois que tout fonctionne, je vous créerai les **Firebase Functions** pour :
- Intégration Stripe complète
- Envoi d'emails
- Téléchargements sécurisés

**Testez d'abord cette version et dites-moi si tout fonctionne !** 🚀