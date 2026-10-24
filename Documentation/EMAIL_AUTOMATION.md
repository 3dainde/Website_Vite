# E-mails automatiques — contact & « Soyez prévenu à la sortie »

Tout est gratuit, sans période d'essai et sans carte bancaire :

| Rôle | Service | Offre gratuite |
|---|---|---|
| Héberger l'API (remplace Railway) | **Cloudflare Workers** | 100 000 requêtes / jour |
| Envoyer les e-mails + gérer la liste d'inscrits | **Brevo** | 300 e-mails / jour, API incluse |
| Recevoir les e-mails sur support@authinteractive.com | **Cloudflare Email Routing** | Illimité (transfert vers Gmail) |
| Héberger le site | GitHub Pages (inchangé) | Gratuit |

```
Visiteur ──> authinteractive.com (GitHub Pages)
                 │  formulaire Contact / Soyez prévenu
                 ▼
          api.authinteractive.com (Cloudflare Worker, dossier /worker)
                 │  API Brevo
                 ├──> e-mail à support@authinteractive.com ──(Email Routing)──> authinteractive@gmail.com
                 ├──> accusé de réception au visiteur
                 └──> contact ajouté à la liste « Soyez prévenu » ──> campagnes de nouveautés
```

> Pourquoi pas Railway ? Son offre « Free » ne donne que 1 $ de crédit par mois, ce qui ne suffit pas pour un serveur allumé en permanence. L'ancien `server.ts` (Express + SendGrid) ne compilait plus et a été retiré.

---

## 1. Mettre le domaine sur Cloudflare (une fois)

1. Créez un compte gratuit sur cloudflare.com, puis **Add a site** → `authinteractive.com` → offre **Free**.
2. Cloudflare recopie vos enregistrements DNS actuels. Vérifiez que ceux de GitHub Pages sont présents (4 enregistrements `A` vers `185.199.108–111.153` et `www` en `CNAME` vers `3dainde.github.io`). Mettez-les en **DNS only** (nuage gris).
3. Chez votre registrar, remplacez les serveurs DNS par les deux que Cloudflare vous donne. Attendez l'e-mail « Your site is active ».

## 2. Recevoir les e-mails sur support@authinteractive.com

1. Cloudflare → `authinteractive.com` → **Email** → **Email Routing** → **Get started**.
2. Ajoutez l'adresse personnalisée `support` → destination `authinteractive@gmail.com` (confirmez le lien reçu dans Gmail).
3. Acceptez l'ajout automatique des enregistrements MX/SPF.
4. Test : envoyez un e-mail à support@authinteractive.com depuis une autre adresse, il doit arriver dans Gmail.

> Pour **répondre** depuis support@ dans Gmail : Gmail → Paramètres → Comptes → « Envoyer des e-mails en tant que » → ajoutez support@authinteractive.com avec le serveur SMTP de Brevo (`smtp-relay.brevo.com`, port 587, identifiants SMTP visibles dans Brevo → SMTP & API).

## 3. Configurer Brevo

1. Créez un compte gratuit sur brevo.com.
2. **Expéditeurs, domaines** → **Domaines** → ajoutez `authinteractive.com` et copiez les enregistrements DNS demandés (DKIM, code Brevo, DMARC) dans Cloudflare → DNS. Sans cette étape, les e-mails partent en spam.
3. **Expéditeurs** → ajoutez `support@authinteractive.com` (nom : AuthInteractive).
4. **Contacts → Listes** → créez la liste **« Soyez prévenu à la sortie »** et notez son **numéro (ID)**.
5. *(facultatif)* **Contacts → Paramètres → Attributs** : créez `SOURCE` (texte) et `CONSENT_DATE` (date). Sans eux, l'inscription fonctionne quand même.
6. **SMTP & API → Clés API** → **Générer une clé**. Gardez-la secrète.
7. *(recommandé, RGPD)* Double opt-in : **Modèles** → créez un modèle de type « Double opt-in », notez son ID.

## 4. Déployer l'API (Cloudflare Worker)

Dans le terminal de VS Code :

```powershell
cd worker
npm install
npx wrangler login                     # ouvre le navigateur, connectez votre compte Cloudflare
npx wrangler secret put BREVO_API_KEY  # collez la clé Brevo
```

Ouvrez `worker/wrangler.toml` et réglez :

- `BREVO_LIST_ID` = l'ID de la liste créée à l'étape 3.4
- `BREVO_DOI_TEMPLATE_ID` = l'ID du modèle double opt-in (ou laissez vide)
- décommentez la ligne `routes = [...]` pour utiliser `api.authinteractive.com`

Puis :

```powershell
npx wrangler deploy
```

Test : ouvrez https://api.authinteractive.com/api/health → `{"status":"OK"}`.

## 5. Relier le site à l'API

Dans `.env` (à la racine du projet) :

```
VITE_API_URL=https://api.authinteractive.com
```

Puis `npm run deploy` comme d'habitude. Si vous n'utilisez pas le sous-domaine, mettez l'adresse `https://authinteractive-api.<votre-compte>.workers.dev` affichée par `wrangler deploy`.

## 6. Envoyer les nouveautés aux inscrits

Deux possibilités :

- **Depuis Brevo** : Campagnes → Créer une campagne e-mail → destinataires : liste « Soyez prévenu à la sortie ».
- **Depuis le projet** (script prêt) : écrivez votre e-mail en HTML (modèle : `worker/news/exemple-focus.html`), puis

```powershell
cd worker
$env:BREVO_API_KEY="xkeysib-..."
$env:BREVO_LIST_ID="2"
npm run news -- --file news/exemple-focus.html --subject "FOCUS : premier devlog" --test vous@exemple.com   # e-mail de test
npm run news -- --file news/exemple-focus.html --subject "FOCUS : premier devlog" --send                    # envoi à toute la liste
```

Le lien de désinscription est ajouté automatiquement.

## Tester en local

```powershell
# terminal 1 : API
cd worker
copy .dev.vars.example .dev.vars   # puis mettez votre clé Brevo dedans
npm run dev                        # http://localhost:8787

# terminal 2 : site
npm run dev                        # http://localhost:5173 (appelle l'API locale)
```

## Protection anti-spam incluse

- champ invisible (pot de miel) et délai minimum de remplissage : les robots reçoivent un faux « succès » ;
- 5 envois maximum par adresse IP et par quart d'heure ;
- validation des adresses, longueur maximale des champs, filtrage des messages bourrés de liens ;
- contenu échappé avant d'être mis dans l'e-mail.

Pour aller plus loin si le spam augmente : Cloudflare Turnstile (gratuit) devant les formulaires.
