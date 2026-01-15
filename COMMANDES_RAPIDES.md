# 🚀 Commandes Rapides - Système de Traduction Automatique

## 🛠️ Développement

### Lancer le Serveur de Développement
```bash
npm run dev
```
- URL: http://localhost:5173
- Hot reload activé
- Console logs disponibles

### Build Production
```bash
npm run build
```
- Compile TypeScript + Vite
- Output: `dist/`
- Optimisé et minifié

### Preview Build
```bash
npm run preview
```
- Teste la version de production localement

---

## 🧪 Tests

### Ouvrir le Site
```bash
# 1. Lancer le serveur
npm run dev

# 2. Ouvrir le navigateur
# http://localhost:5173

# 3. Ouvrir la console (F12)
# Chercher les logs de traduction
```

### Logs à Vérifier
Dans la console du navigateur :
```
🌐 Initialisation de la traduction automatique...
🎯 Langue détectée: fr
🔄 Chargement des traductions...
✅ Traductions préchargées pour: fr
```

---

## 🔧 Debugging

### Console JavaScript (F12)

#### Voir la Langue Actuelle
```javascript
localStorage.getItem('userLanguage')
```

#### Voir le Cache de Traductions
```javascript
Object.keys(localStorage).filter(k => k.startsWith('preload_'))
```

#### Voir Tous les Items en Cache
```javascript
Object.keys(localStorage)
```

#### Vider le Cache Complet
```javascript
localStorage.clear()
```

#### Vider Uniquement les Traductions
```javascript
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('preload_') || key === 'userLanguage' || key === 'userLanguageCacheTime') {
    localStorage.removeItem(key);
  }
});
```

#### Forcer la Re-détection de Langue
```javascript
localStorage.removeItem('userLanguage');
localStorage.removeItem('userLanguageCacheTime');
location.reload();
```

---

## 🌍 Tests de Localisation

### Test avec Différentes Langues

#### Français
```javascript
localStorage.setItem('userLanguage', 'fr');
location.reload();
```

#### Anglais
```javascript
localStorage.setItem('userLanguage', 'en');
location.reload();
```

#### Espagnol
```javascript
localStorage.setItem('userLanguage', 'es');
location.reload();
```

#### Allemand
```javascript
localStorage.setItem('userLanguage', 'de');
location.reload();
```

### Réinitialiser (Détection Auto)
```javascript
localStorage.removeItem('userLanguage');
location.reload();
```

---

## 📊 Monitoring

### Activer les Logs Détaillés

Dans la console :
```javascript
// Voir tous les événements de fetch
window.addEventListener('fetch', e => console.log('Fetch:', e));

// Monitorer les changements de localStorage
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  console.log('localStorage.setItem:', key, value);
  originalSetItem.apply(this, arguments);
};
```

### Voir les Performances

```javascript
// Mesurer le temps de traduction
console.time('translation');
// Changer de langue ici
console.timeEnd('translation');
```

---

## 🔄 Réinitialisation Complète

### Reset Total du Projet

```bash
# 1. Arrêter le serveur (Ctrl+C)

# 2. Nettoyer les dépendances
rm -rf node_modules
rm package-lock.json

# 3. Réinstaller
npm install

# 4. Rebuild
npm run build

# 5. Redémarrer
npm run dev
```

### Reset Navigateur

```javascript
// Dans la console
localStorage.clear();
sessionStorage.clear();
location.reload(true); // Hard reload
```

---

## 📦 Gestion du Cache

### Voir la Taille du Cache

```javascript
function getLocalStorageSize() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return (total / 1024).toFixed(2) + ' KB';
}

console.log('Taille du cache:', getLocalStorageSize());
```

### Nettoyer le Cache Ancien

```javascript
// Supprimer les caches de plus de 24h
const now = Date.now();
const maxAge = 24 * 60 * 60 * 1000; // 24 heures

Object.keys(localStorage).forEach(key => {
  if (key.endsWith('CacheTime')) {
    const time = parseInt(localStorage.getItem(key));
    if (now - time > maxAge) {
      const dataKey = key.replace('CacheTime', '');
      localStorage.removeItem(key);
      localStorage.removeItem(dataKey);
      console.log('Cache expiré supprimé:', dataKey);
    }
  }
});
```

---

## 🚨 Résolution de Problèmes

### Traductions Ne Marchent Pas

```bash
# 1. Vérifier la console pour les erreurs
# Ouvrir F12 → Console

# 2. Vider le cache
localStorage.clear();

# 3. Recharger
location.reload();

# 4. Vérifier l'internet
# Tester: https://api.mymemory.translated.net/get?q=hello&langpair=en|fr
```

### Langue Incorrecte

```javascript
// Forcer une langue spécifique
localStorage.setItem('userLanguage', 'en'); // ou 'fr', 'es', etc.
location.reload();
```

### Performance Lente

```javascript
// Vérifier si le cache est utilisé
const cached = localStorage.getItem('preload_en');
if (cached) {
  console.log('Cache disponible:', (cached.length / 1024).toFixed(2) + ' KB');
} else {
  console.log('Pas de cache - première visite normale');
}
```

### Erreurs de Compilation

```bash
# Vérifier TypeScript
npm run build

# Si erreurs, vérifier les imports
# Tous les composants doivent utiliser:
import { useTranslation } from '../context/TranslationContext';
```

---

## 📱 Tests sur Mobile

### Avec Chrome DevTools

```bash
# 1. Ouvrir DevTools (F12)
# 2. Toggle device toolbar (Ctrl+Shift+M)
# 3. Sélectionner un appareil
# 4. Tester le responsive
```

### Tester Différents Pays (Console)

```javascript
// Simuler un pays
localStorage.setItem('userLanguage', 'ja'); // Japon
location.reload();
```

---

## 🎨 Personnalisation

### Changer la Durée du Cache

```javascript
// Dans geolocation.service.ts
// Ligne ~52
if (cacheAge < 24 * 60 * 60 * 1000) { // 24 heures
  // Changer 24 par le nombre d'heures souhaité
}
```

### Ajouter une Langue

```javascript
// Dans geolocation.service.ts
// Ajouter dans COUNTRY_TO_LANGUAGE
JP: 'ja',  // Japonais
CN: 'zh',  // Chinois
```

### Changer l'API de Traduction

```javascript
// Dans translation.service.ts
// Remplacer MyMemory par LibreTranslate
const response = await fetch('https://libretranslate.com/translate', {
  method: 'POST',
  body: JSON.stringify({
    q: text,
    source: sourceLang,
    target: targetLang
  })
});
```

---

## 📚 Documentation

### Ouvrir la Documentation

```bash
# VSCode
code Documentation/

# Navigateur (si serveur local)
# File → Open → Documentation/INDEX.md
```

### Liens Rapides

- [Récapitulatif](./Documentation/IMPLEMENTATION_SUMMARY.md)
- [Guide Technique](./Documentation/TRANSLATION_AUTO_GUIDE.md)
- [Démarrage Rapide](./Documentation/TRANSLATION_QUICK_START.md)
- [Tests](./Documentation/TRANSLATION_TESTS.md)

---

## 🔐 Sécurité

### Vérifier les APIs

```bash
# Test ipapi.co
curl https://ipapi.co/json/

# Test MyMemory
curl "https://api.mymemory.translated.net/get?q=hello&langpair=en|fr"
```

### Limites APIs

```javascript
// Voir combien de requêtes restent (approximatif)
// MyMemory: 1000/jour par IP
// Compteur simple:
let requestCount = parseInt(localStorage.getItem('apiRequestCount') || '0');
console.log('Requêtes aujourd\'hui:', requestCount, '/ 1000');
```

---

## ✅ Checklist Avant Production

```bash
☐ npm run build (sans erreurs)
☐ Tester toutes les pages
☐ Tester sur différents navigateurs
☐ Tester le cache (reload multiple)
☐ Tester changement manuel de langue
☐ Vérifier la console (pas d'erreurs)
☐ Tester avec VPN (différents pays)
☐ Vérifier les performances (< 2s)
```

---

## 🚀 Déploiement

### Build Production

```bash
# 1. Build
npm run build

# 2. Tester localement
npm run preview

# 3. Déployer le dossier dist/
# Selon votre hébergeur (Vercel, Netlify, etc.)
```

---

## 💡 Tips & Astuces

### Raccourcis Utiles

```
F12             → Ouvrir DevTools
Ctrl+Shift+C    → Inspect Element
Ctrl+Shift+M    → Toggle Device Toolbar
Ctrl+Shift+R    → Hard Reload
F5              → Reload
```

### Snippets Utiles

#### Logger Toutes les Traductions
```javascript
const { t } = useTranslation();
console.log('Traductions:', JSON.stringify(t, null, 2));
```

#### Mesurer le Temps de Chargement
```javascript
const start = performance.now();
// ... actions
const end = performance.now();
console.log('Temps:', (end - start).toFixed(2) + 'ms');
```

---

**Version** : 2.1.0  
**Dernière mise à jour** : Janvier 2026  
**Status** : ✅ Opérationnel

---

**Développé avec ❤️ par Auth Interactive**
