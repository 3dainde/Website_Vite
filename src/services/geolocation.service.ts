/**
 * Service de géolocalisation basé sur l'IP
 * Détecte automatiquement la langue de l'utilisateur selon son pays
 */

interface GeolocationData {
  country: string;
  countryCode: string;
  language: string;
  ip: string;
}

const COUNTRY_TO_LANGUAGE: { [key: string]: string } = {
  FR: 'fr',
  CA: 'fr', // Quebec
  BE: 'fr', // Belgique
  CH: 'fr', // Suisse
  US: 'en',
  GB: 'en',
  AU: 'en',
  NZ: 'en',
  IE: 'en',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  DE: 'de',
  AT: 'de',
  IT: 'it',
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  PT: 'pt',
  BR: 'pt',
  NL: 'nl',
  PL: 'pl',
  TR: 'tr',
  JP: 'ja',
  CN: 'zh',
  KR: 'ko',
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
};

/**
 * Détecte la langue de l'utilisateur basée sur son IP
 * Utilise plusieurs APIs gratuites en fallback
 */
export async function detectUserLanguage(): Promise<string> {
  // D'abord, essayer de récupérer depuis le cache
  const cached = localStorage.getItem('userLanguage');
  const cacheTime = localStorage.getItem('userLanguageCacheTime');
  
  if (cached && cacheTime) {
    const cacheAge = Date.now() - parseInt(cacheTime);
    // Cache valide pendant 24 heures
    if (cacheAge < 24 * 60 * 60 * 1000) {
      console.log('🌍 Langue détectée depuis le cache:', cached);
      return cached;
    }
  }

  try {
    // Essayer plusieurs APIs gratuites
    const apis = [
      'https://ipapi.co/json/',
      'https://ip-api.com/json/?fields=countryCode',
      'https://freeipapi.com/api/json',
    ];

    for (const api of apis) {
      try {
        const response = await fetch(api);
        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country_code || data.countryCode || data.country;
          
          if (countryCode) {
            const language = COUNTRY_TO_LANGUAGE[countryCode] || 'en';
            
            // Mettre en cache le résultat
            localStorage.setItem('userLanguage', language);
            localStorage.setItem('userLanguageCacheTime', Date.now().toString());
            
            console.log('🌍 Langue détectée:', language, 'pour le pays:', countryCode);
            return language;
          }
        }
      } catch (err) {
        console.warn(`Erreur avec l'API ${api}:`, err);
        continue;
      }
    }
  } catch (error) {
    console.warn('Impossible de détecter la localisation:', error);
  }

  // Fallback: utiliser la langue du navigateur
  const browserLang = navigator.language.split('-')[0];
  console.log('🌍 Utilisation de la langue du navigateur:', browserLang);
  return browserLang || 'en';
}

/**
 * Force la détection de la langue (ignore le cache)
 */
export async function refreshUserLanguage(): Promise<string> {
  localStorage.removeItem('userLanguage');
  localStorage.removeItem('userLanguageCacheTime');
  return detectUserLanguage();
}

/**
 * Obtient la langue de l'utilisateur (depuis le cache ou détection)
 */
export function getUserLanguage(): string {
  return localStorage.getItem('userLanguage') || navigator.language.split('-')[0] || 'en';
}
