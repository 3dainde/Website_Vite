# 📧 Système de Contact Email - AuthInteractive

## ✅ Installation Terminée!

Tous les fichiers et dépendances sont configurés. Voici comment démarrer:

---

## 🔧 Configuration Requise (UNE SEULE FOIS)

### Étape 1: Configurer les Credentials Gmail

1. Ouvrez le fichier **`.env`** à la racine du projet
2. Remplissez vos credentials Gmail:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
PORT=3001
```

### Étape 2: Obtenir le Mot de Passe Application Gmail

1. Allez sur [myaccount.google.com](https://myaccount.google.com)
2. Cliquez sur **"Sécurité"** dans le menu de gauche
3. Activez **l'authentification à deux facteurs** (si pas déjà fait)
4. Cherchez **"Mots de passe d'application"** dans la section "Sécurité"
5. Sélectionnez **"Mail"** et **"Windows/Linux"**
6. Copiez le mot de passe généré (16 caractères)
7. Collez-le dans `.env` comme `GMAIL_PASSWORD`

---

## 🚀 Démarrage

### Terminal 1 - Serveur Backend

```bash
npm run server:dev
```

Vous devriez voir:
```
🚀 Serveur de contact en écoute sur le port 3001
```

### Terminal 2 - Frontend Vite (nouveau terminal)

```bash
npm run dev
```

Vous devriez voir:
```
VITE v5.0.11  ready in 123 ms

➜  Local:   http://localhost:5173/
```

---

## 📝 Test du Formulaire

1. Ouvrez [http://localhost:5173](http://localhost:5173)
2. Allez à la page "Contactez-nous"
3. Remplissez le formulaire
4. Cliquez sur "Envoyer"

### Résultats attendus:

✅ **Email envoyé à `support@authinteractive.com`**
- Message de succès: "✅ Message envoyé avec succès!"

❌ **Si l'envoi échoue:**
- Le système essaie automatiquement `authinteractive@gmail.com`
- Même message de succès (l'utilisateur ne voit pas la différence)

---

## 🏗️ Structure Technique

### Backend
- **Fichier:** `server.ts`
- **Tech:** Express + Nodemailer + TypeScript
- **Port:** 3001
- **Endpoint:** `POST /api/send-contact`

### Frontend
- **Fichier:** `src/pages/Contact.jsx`
- **Service:** `src/services/email.service.ts`
- **Proxy:** Configuré dans `vite.config.ts`

### Variables d'Environnement
- **`.env`** - Backend (credentials Gmail)
- **`.env.local`** - Frontend (URL API)

---

## 🔄 Processus d'Envoi

```
Utilisateur soumet le formulaire
    ↓
Frontend appelle POST /api/send-contact
    ↓
Backend reçoit la requête
    ↓
Tentative 1: Envoyer à support@authinteractive.com
    ↓
    ❌ Échoue? → Tentative 2: Envoyer à authinteractive@gmail.com
    ✅ Succès?
    ↓
Réponse au frontend
    ↓
Message de confirmation affiché
```

---

## 📋 Commandes Disponibles

```bash
# Frontend
npm run dev          # Démarrage développement
npm run build        # Build pour production
npm run preview      # Prévisualiser le build

# Backend
npm run server:dev   # Démarrage développement
npm run server:build # Builder le TypeScript
npm run server:start # Lancer le serveur compilé
```

---

## 🐛 Dépannage

### Le serveur refuse de démarrer
- Vérifier que le port 3001 est libre
- Changer `PORT=3001` dans `.env` si nécessaire

### Erreur "GMAIL_PASSWORD non configuré"
- Vérifier que `.env` existe à la racine
- Relancer le serveur après modification

### Les emails ne s'envoient pas
- Vérifier les credentials Gmail dans `.env`
- Vérifier que 2FA est activé sur Google Account
- Vérifier que le mot de passe app est correct

### Erreur CORS
- Vérifier que le frontend appelle `http://localhost:3001`
- Vérifier que le backend écoute bien sur 3001

---

## 📦 Déploiement Production

### Backend (Render, Railway, Heroku...)

```bash
npm run server:build
npm run server:start
```

Définir les variables d'environnement:
```
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
PORT=3001
```

### Frontend (Vercel, Netlify...)

Définir:
```
VITE_API_URL=https://votre-backend.com
```

---

## 📧 Contacts Emails

- **Principal:** support@authinteractive.com
- **Fallback:** authinteractive@gmail.com

Les deux recevraient les messages du formulaire de contact.

---

## ✨ C'est prêt!

Le système est complètement configuré et prêt à l'emploi! 🎉

Des questions? Besoin de modifications? 😊
