# Configuration Stripe

## 1. Clés API

### Frontend (.env)
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### Backend (functions/.env)
```
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

**⚠️ Important** : Récupérez vos clés depuis https://dashboard.stripe.com/test/apikeys

## 2. Configuration du Webhook

### Étapes pour obtenir le Webhook Secret :

1. **Accéder au Dashboard Stripe**
   - Allez sur https://dashboard.stripe.com/test/webhooks
   - Assurez-vous d'être en mode TEST

2. **Créer un endpoint webhook**
   - Cliquez sur "Ajouter un endpoint" / "Add endpoint"
   - URL de l'endpoint : 
     - **Local** : `http://localhost:5001/authinteractivedotcom/us-central1/stripeWebhook`
     - **Production** : `https://us-central1-authinteractivedotcom.cloudfunctions.net/stripeWebhook`

3. **Sélectionner les événements**
   - Cochez : `checkout.session.completed`
   - Cochez : `payment_intent.succeeded` (optionnel)

4. **Récupérer le secret du webhook**
   - Après création, cliquez sur l'endpoint
   - Copiez le "Signing secret" qui commence par `whsec_...`
   - Ajoutez-le dans `functions/.env` :
     ```
     STRIPE_WEBHOOK_SECRET=whsec_votre_secret_ici
     ```

## 3. URLs de Redirection

### Configuration actuelle (LOCAL)
```
CLIENT_URL=http://localhost:5173
VITE_FIREBASE_FUNCTIONS_URL=http://127.0.0.1:5001/authinteractivedotcom/us-central1
```

### Configuration PRODUCTION
```
CLIENT_URL=https://authinteractive.com
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-authinteractivedotcom.cloudfunctions.net
```

## 4. Test de la Configuration

### Tester localement avec Stripe CLI
```bash
# Installer Stripe CLI
# Windows (avec Scoop)
scoop install stripe

# Authentification
stripe login

# Écouter les webhooks en local
stripe listen --forward-to localhost:5001/authinteractivedotcom/us-central1/stripeWebhook

# Le CLI vous donnera un webhook secret temporaire à utiliser
```

### Effectuer un paiement de test
1. Utilisez les cartes de test Stripe :
   - Succès : `4242 4242 4242 4242`
   - CVC : n'importe quel nombre à 3 chiffres
   - Date : n'importe quelle date future

## 5. Script de test automatisé

Un script de test est disponible : `test-stripe-checkout.js`

```bash
node test-stripe-checkout.js
```

Ce script :
- Crée une session Stripe Checkout
- Génère une URL de paiement
- Vous permet de tester le processus complet

## 6. Sécurité

⚠️ **IMPORTANT** :
- Ne jamais commiter les fichiers `.env` dans Git
- Les fichiers `.env` sont déjà dans `.gitignore`
- Utilisez des variables d'environnement séparées pour production/développement
- Les clés secrètes (`sk_test_...` et `whsec_...`) doivent TOUJOURS rester privées
- Les clés de test peuvent être renouvelées sur le dashboard Stripe si nécessaire
