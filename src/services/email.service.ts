/**
 * Appels vers l'API e-mail (Cloudflare Worker, dossier /worker).
 *  - POST /api/contact   : formulaire de contact -> support@authinteractive.com
 *  - POST /api/subscribe : inscription "Soyez prévenu à la sortie"
 *
 * L'adresse de l'API se règle avec VITE_API_URL (fichier .env).
 */

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
  startedAt?: number;
}

export interface SubscribePayload {
  email: string;
  consent: boolean;
  source?: string;
  honeypot?: string;
}

const API_URL: string =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? 'https://api.authinteractive.com' : 'http://localhost:8787');

async function post(path: string, body: unknown): Promise<void> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = `Erreur ${response.status}`;
    try {
      const data = await response.json();
      if (data?.error) message = data.error;
    } catch {
      /* réponse non JSON */
    }
    throw new Error(message);
  }
}

export const sendContactForm = (payload: ContactPayload) => post('/api/contact', payload);

export const subscribeNewsletter = (payload: SubscribePayload) => post('/api/subscribe', payload);
