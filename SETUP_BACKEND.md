# Configuration du serveur de contact

## Variables d'environnement (.env)

```env
# Gmail SMTP
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASSWORD=your-app-password

# Port du serveur
PORT=3001
```

## Comment obtenir le mot de passe d'application Gmail:

1. Aller sur [myaccount.google.com](https://myaccount.google.com)
2. Activer l'authentification à deux facteurs
3. Aller dans "Sécurité" -> "Mots de passe d'application"
4. Sélectionner "Mail" et "Windows"
5. Copier le mot de passe généré

## Installation et démarrage

```bash
# Installation des dépendances
npm install

# Démarrage en développement
npm run dev

# Build pour production
npm run build

# Démarrage en production
npm start
```

## Endpoint API

**POST** `/api/send-contact`

Body:
```json
{
  "name": "Votre nom",
  "email": "votre@email.com",
  "message": "Votre message"
}
```

Response:
```json
{
  "success": true,
  "message": "Email envoyé avec succès"
}
```
