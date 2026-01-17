/**
 * Middleware de sécurité pour le formulaire de contact
 * Protection contre le spam et les attaques
 */

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

// Rate limiting: max 5 requêtes par IP par 15 minutes
const rateLimitStore: RateLimitStore = {};
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

export function rateLimitMiddleware(req: any, res: any, next: any) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();

  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  }

  const store = rateLimitStore[ip];

  // Réinitialiser si la fenêtre est expirée
  if (now > store.resetTime) {
    store.count = 0;
    store.resetTime = now + RATE_LIMIT_WINDOW;
  }

  store.count++;

  if (store.count > RATE_LIMIT_MAX) {
    return res.status(429).json({
      error: 'Trop de requêtes. Veuillez réessayer plus tard.',
    });
  }

  next();
}

// Détection de spam basique
export function isLikelySpam(data: {
  name: string;
  email: string;
  message: string;
}): boolean {
  const spamKeywords = [
    'viagra',
    'casino',
    'poker',
    'lottery',
    'click here',
    'bitcoin',
    'crypto',
    'buy now',
    'free money',
    'work from home',
    'earn fast',
    'xxx',
    'adult',
  ];

  const content = `${data.name} ${data.email} ${data.message}`.toLowerCase();

  // Vérifier les mots-clés de spam
  for (const keyword of spamKeywords) {
    if (content.includes(keyword)) {
      return true;
    }
  }

  // Vérifier les URLs suspectes (trop d'URLs)
  const urlCount = (content.match(/http/g) || []).length;
  if (urlCount > 2) {
    return true;
  }

  // Vérifier les caractères répétitifs (ex: "!!!!!!!" ou "AAAAAA")
  if (/(.)\1{4,}/.test(content)) {
    return true;
  }

  // Message trop court ou trop long
  if (data.message.trim().length < 10 || data.message.length > 5000) {
    return true;
  }

  return false;
}

// Validation d'email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Valider le honeypot (champ invisible pour piéger les bots)
export function validateHoneypot(honeypot: string): boolean {
  // Le honeypot doit être vide
  return !honeypot || honeypot.trim() === '';
}

// Nettoyer le contenu
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, 1000) // Limiter la taille
    .replace(/[<>]/g, ''); // Supprimer les chevrons
}
