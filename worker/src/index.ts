/**
 * API e-mail d'AuthInteractive — Cloudflare Worker (offre gratuite).
 *
 *  POST /api/contact    Formulaire de contact -> e-mail à CONTACT_TO (support@authinteractive.com)
 *                       + accusé de réception automatique au visiteur.
 *  POST /api/subscribe  "Soyez prévenu à la sortie" -> contact ajouté à la liste Brevo
 *                       (double opt-in si BREVO_DOI_TEMPLATE_ID est défini).
 *  GET  /api/health     Vérification de fonctionnement.
 *
 * Les e-mails partent par l'API Brevo (offre gratuite : 300 e-mails / jour).
 * Configuration : wrangler.toml (variables) + `wrangler secret put BREVO_API_KEY`.
 */

export interface Env {
  BREVO_API_KEY: string;
  CONTACT_TO: string;
  SENDER_EMAIL: string;
  SENDER_NAME: string;
  ALLOWED_ORIGINS: string;
  BREVO_LIST_ID: string;
  BREVO_DOI_TEMPLATE_ID?: string;
  DOI_REDIRECT_URL?: string;
  SEND_ACK?: string;
}

const BREVO = 'https://api.brevo.com/v3';
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const MIN_FILL_MS = 2500; // un humain met plus de 2,5 s à remplir le formulaire

// Limite simple par adresse IP (par instance du Worker) : 5 envois / 15 min.
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.replace(/\u0000/g, '').trim().slice(0, max) : '';
}

function looksLikeSpam(text: string): boolean {
  const links = (text.match(/https?:\/\//gi) || []).length;
  return links > 3 || /\b(viagra|casino|crypto ?bonus|seo services|backlinks)\b/i.test(text);
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors },
  });
}

async function brevo(env: Env, path: string, payload: unknown): Promise<Response> {
  return fetch(`${BREVO}${path}`, {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

function emailLayout(title: string, bodyHtml: string): string {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#04070c;font-family:Arial,Helvetica,sans-serif;color:#e8f1fa">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#04070c;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#060b12;border:1px solid #16324a">
<tr><td style="padding:24px 28px;border-bottom:1px solid #16324a;font-size:18px;font-weight:bold;letter-spacing:3px">AUTH<span style="color:#1ec8ff">INTERACTIVE</span></td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 16px;font-size:20px;color:#ffffff">${title}</h1>
${bodyHtml}
</td></tr>
<tr><td style="padding:18px 28px;border-top:1px solid #16324a;font-size:12px;color:#8fa3b8">AuthInteractive · <a href="https://authinteractive.com" style="color:#1ec8ff">authinteractive.com</a></td></tr>
</table></td></tr></table></body></html>`;
}

async function handleContact(request: Request, env: Env, cors: Record<string, string>): Promise<Response> {
  const data = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!data) return json({ error: 'Requête invalide' }, 400, cors);

  const oneLine = (v: string) => v.replace(/[\r\n\t]+/g, ' ');
  const name = oneLine(clean(data.name, 100));
  const email = clean(data.email, 200);
  const subject = oneLine(clean(data.subject, 120)) || 'Contact';
  const message = clean(data.message, 5000);
  const honeypot = clean(data.honeypot, 200);
  const startedAt = Number(data.startedAt) || 0;

  if (!name || !email || message.length < 10) return json({ error: 'Tous les champs sont requis' }, 400, cors);
  if (!EMAIL_RE.test(email)) return json({ error: 'Adresse e-mail invalide' }, 400, cors);

  // Robots : on répond "succès" sans rien envoyer, pour ne pas leur révéler le filtre.
  const tooFast = startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast || looksLikeSpam(`${name} ${message}`)) {
    return json({ success: true }, 200, cors);
  }

  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const res = await brevo(env, '/smtp/email', {
    sender: { name: env.SENDER_NAME, email: env.SENDER_EMAIL },
    to: [{ email: env.CONTACT_TO, name: 'Support AuthInteractive' }],
    replyTo: { email, name },
    subject: `[Site] ${subject} — ${name}`,
    htmlContent: emailLayout(
      'Nouveau message du site',
      `<p style="margin:0 0 6px;color:#b7c6d6"><strong style="color:#fff">Nom :</strong> ${escapeHtml(name)}</p>
<p style="margin:0 0 6px;color:#b7c6d6"><strong style="color:#fff">E-mail :</strong> ${escapeHtml(email)}</p>
<p style="margin:0 0 16px;color:#b7c6d6"><strong style="color:#fff">Sujet :</strong> ${escapeHtml(subject)}</p>
<div style="padding:16px;border:1px solid #16324a;color:#e8f1fa;line-height:1.6">${safeMessage}</div>
<p style="margin:16px 0 0;font-size:13px;color:#8fa3b8">Répondez directement à cet e-mail pour écrire à ${escapeHtml(name)}.</p>`
    ),
    textContent: `Nom : ${name}\nE-mail : ${email}\nSujet : ${subject}\n\n${message}`,
    tags: ['contact'],
  });

  if (!res.ok) {
    console.error('Brevo /smtp/email', res.status, await res.text());
    return json({ error: "L'envoi a échoué" }, 502, cors);
  }

  // Accusé de réception automatique au visiteur (désactivable avec SEND_ACK = "false").
  if (env.SEND_ACK !== 'false') {
    const ack = await brevo(env, '/smtp/email', {
      sender: { name: env.SENDER_NAME, email: env.SENDER_EMAIL },
      to: [{ email, name }],
      replyTo: { email: env.CONTACT_TO, name: 'Support AuthInteractive' },
      subject: 'Nous avons bien reçu votre message',
      htmlContent: emailLayout(
        `Merci ${escapeHtml(name)} !`,
        `<p style="margin:0 0 12px;color:#b7c6d6;line-height:1.6">Votre message « ${escapeHtml(subject)} » est bien arrivé. Nous vous répondons rapidement, en général sous 48 h.</p>
<p style="margin:0;color:#b7c6d6;line-height:1.6">L'équipe AuthInteractive</p>`
      ),
      textContent: `Merci ${name} ! Votre message « ${subject} » est bien arrivé. Nous vous répondons rapidement, en général sous 48 h.\n\nL'équipe AuthInteractive`,
      tags: ['contact-ack'],
    });
    if (!ack.ok) console.warn('Accusé de réception non envoyé', ack.status, await ack.text());
  }

  return json({ success: true }, 200, cors);
}

async function handleSubscribe(request: Request, env: Env, cors: Record<string, string>): Promise<Response> {
  const data = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!data) return json({ error: 'Requête invalide' }, 400, cors);

  const email = clean(data.email, 200).toLowerCase();
  const source = clean(data.source, 40) || 'site';
  if (clean(data.honeypot, 200)) return json({ success: true }, 200, cors);
  if (data.consent !== true) return json({ error: 'Consentement requis' }, 400, cors);
  if (!EMAIL_RE.test(email)) return json({ error: 'Adresse e-mail invalide' }, 400, cors);

  const listId = Number(env.BREVO_LIST_ID);
  const attributes = { SOURCE: source, CONSENT_DATE: new Date().toISOString().slice(0, 10) };
  const doiTemplate = Number(env.BREVO_DOI_TEMPLATE_ID || 0);

  const res = doiTemplate
    ? await brevo(env, '/contacts/doubleOptinConfirmation', {
        email,
        includeListIds: [listId],
        templateId: doiTemplate,
        redirectionUrl: env.DOI_REDIRECT_URL || 'https://authinteractive.com/jeux',
        attributes,
      })
    : await brevo(env, '/contacts', { email, listIds: [listId], updateEnabled: true, attributes });

  if (!res.ok) {
    const detail = await res.text();
    // Les attributs SOURCE / CONSENT_DATE doivent exister dans Brevo ; sinon on réessaie sans.
    if (res.status === 400 && /attribute/i.test(detail)) {
      const retry = doiTemplate
        ? await brevo(env, '/contacts/doubleOptinConfirmation', {
            email,
            includeListIds: [listId],
            templateId: doiTemplate,
            redirectionUrl: env.DOI_REDIRECT_URL || 'https://authinteractive.com/jeux',
          })
        : await brevo(env, '/contacts', { email, listIds: [listId], updateEnabled: true });
      if (retry.ok) return json({ success: true }, 200, cors);
    }
    console.error('Brevo contacts', res.status, detail);
    return json({ error: "L'inscription a échoué" }, 502, cors);
  }

  return json({ success: true }, 200, cors);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request, env);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (url.pathname === '/api/health') return json({ status: 'OK' }, 200, cors);

    if (request.method !== 'POST') return json({ error: 'Méthode non autorisée' }, 405, cors);

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (rateLimited(ip)) return json({ error: 'Trop de demandes, réessayez plus tard' }, 429, cors);

    try {
      if (url.pathname === '/api/contact' || url.pathname === '/api/send-contact') {
        return await handleContact(request, env, cors);
      }
      if (url.pathname === '/api/subscribe') {
        return await handleSubscribe(request, env, cors);
      }
    } catch (error) {
      console.error('Erreur API', error);
      return json({ error: 'Erreur serveur' }, 500, cors);
    }

    return json({ error: 'Introuvable' }, 404, cors);
  },
};
