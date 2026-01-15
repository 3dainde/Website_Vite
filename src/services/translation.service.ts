/**
 * Service de traduction automatique
 * Utilise l'API Google Translate gratuite via MyMemory
 * Alternative: LibreTranslate (open source et gratuit)
 */

interface TranslationCache {
  [key: string]: string;
}

const translationCache: TranslationCache = {};

// Langue source par défaut (le site est en français à la base)
const DEFAULT_SOURCE_LANG = 'fr';

/**
 * Traduit un texte vers la langue cible
 * Utilise un cache pour éviter les traductions répétées
 */
export async function translateText(
  text: string,
  targetLang: string,
  sourceLang: string = DEFAULT_SOURCE_LANG
): Promise<string> {
  // Si la langue cible est la même que la source, pas besoin de traduire
  if (targetLang === sourceLang) {
    return text;
  }

  // Vérifier le cache
  const cacheKey = `${text}|${sourceLang}|${targetLang}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    // Option 1: MyMemory Translation API (gratuit, 1000 requêtes/jour par IP)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.responseStatus === 200 && data.responseData.translatedText) {
        const translated = data.responseData.translatedText;
        translationCache[cacheKey] = translated;
        return translated;
      }
    }
  } catch (error) {
    console.warn('Erreur de traduction avec MyMemory:', error);
  }

  // Fallback: retourner le texte original
  return text;
}

/**
 * Traduit un objet de traduction complet
 * Parcourt récursivement toutes les propriétés
 */
export async function translateObject(
  obj: any,
  targetLang: string,
  sourceLang: string = DEFAULT_SOURCE_LANG
): Promise<any> {
  if (typeof obj === 'string') {
    return translateText(obj, targetLang, sourceLang);
  }

  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => translateObject(item, targetLang, sourceLang)));
  }

  if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    const entries = Object.entries(obj);
    
    // Traduire toutes les propriétés en parallèle pour plus de performance
    await Promise.all(
      entries.map(async ([key, value]) => {
        result[key] = await translateObject(value, targetLang, sourceLang);
      })
    );
    
    return result;
  }

  return obj;
}

/**
 * Traduit plusieurs textes en une seule requête (batch)
 * Plus efficace pour traduire plusieurs éléments
 */
export async function translateBatch(
  texts: string[],
  targetLang: string,
  sourceLang: string = DEFAULT_SOURCE_LANG
): Promise<string[]> {
  if (targetLang === sourceLang) {
    return texts;
  }

  const results = await Promise.all(
    texts.map(text => translateText(text, targetLang, sourceLang))
  );

  return results;
}

/**
 * Précharge les traductions pour une langue donnée
 * Utile pour améliorer les performances
 */
export async function preloadTranslations(
  baseTranslations: any,
  targetLang: string
): Promise<any> {
  console.log(`🔄 Préchargement des traductions pour: ${targetLang}`);
  
  // Vérifier si les traductions sont déjà en cache
  const cacheKey = `preload_${targetLang}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      console.log(`✅ Traductions chargées depuis le cache`);
      return parsed;
    } catch (e) {
      console.warn('Cache invalide, rechargement...');
    }
  }

  // Traduire l'objet complet
  const translated = await translateObject(baseTranslations, targetLang, DEFAULT_SOURCE_LANG);
  
  // Mettre en cache le résultat
  try {
    localStorage.setItem(cacheKey, JSON.stringify(translated));
  } catch (e) {
    console.warn('Impossible de mettre en cache les traductions:', e);
  }

  console.log(`✅ Traductions préchargées pour: ${targetLang}`);
  return translated;
}

/**
 * Nettoie le cache de traduction
 */
export function clearTranslationCache(): void {
  Object.keys(translationCache).forEach(key => delete translationCache[key]);
  
  // Nettoyer aussi le localStorage
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('preload_')) {
      localStorage.removeItem(key);
    }
  });
  
  console.log('🧹 Cache de traduction nettoyé');
}

/**
 * Configuration pour LibreTranslate (alternative open source)
 * Nécessite un serveur LibreTranslate déployé
 */
export async function translateWithLibreTranslate(
  text: string,
  targetLang: string,
  sourceLang: string = DEFAULT_SOURCE_LANG,
  apiUrl: string = 'https://libretranslate.com/translate'
): Promise<string> {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.translatedText;
    }
  } catch (error) {
    console.warn('Erreur avec LibreTranslate:', error);
  }

  return text;
}
