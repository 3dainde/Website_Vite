#!/usr/bin/env node
/**
 * Envoi des nouveautés aux inscrits "Soyez prévenu à la sortie".
 *
 * Usage (PowerShell, depuis le dossier worker) :
 *   $env:BREVO_API_KEY="xkeysib-..."
 *   npm run news -- --file news/focus-beta.html --subject "FOCUS passe en bêta" --test vous@exemple.com
 *   npm run news -- --file news/focus-beta.html --subject "FOCUS passe en bêta" --send
 *
 *  --test <email>  envoie seulement un e-mail de test à cette adresse
 *  --send          envoie la campagne à toute la liste (sinon : brouillon créé dans Brevo)
 *  --list <id>     liste Brevo (défaut : BREVO_LIST_ID ou 2)
 *
 * Le fichier HTML est le corps de l'e-mail. Le lien de désinscription obligatoire
 * est ajouté automatiquement en bas s'il manque.
 */
import { readFile } from 'node:fs/promises';

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const has = (name) => args.includes(`--${name}`);

const apiKey = process.env.BREVO_API_KEY;
const file = opt('file');
const subject = opt('subject');
const listId = Number(opt('list') || process.env.BREVO_LIST_ID || 2);
const sender = {
  name: process.env.SENDER_NAME || 'AuthInteractive',
  email: process.env.SENDER_EMAIL || 'support@authinteractive.com',
};

if (!apiKey || !file || !subject) {
  console.error('Il manque BREVO_API_KEY, --file ou --subject. Voir l’en-tête du script.');
  process.exit(1);
}

async function brevo(method, path, body) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method,
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Brevo ${method} ${path} -> ${res.status} ${text}`);
  return text ? JSON.parse(text) : {};
}

let html = await readFile(file, 'utf8');
if (!html.includes('{{ unsubscribe }}')) {
  html += '\n<p style="font-size:12px;color:#8fa3b8">Vous recevez cet e-mail car vous êtes inscrit sur authinteractive.com. <a href="{{ unsubscribe }}">Se désinscrire</a></p>';
}

const campaign = await brevo('POST', '/emailCampaigns', {
  name: `${subject} — ${new Date().toISOString().slice(0, 10)}`,
  subject,
  sender,
  htmlContent: html,
  recipients: { listIds: [listId] },
});
console.log(`Campagne créée (id ${campaign.id}).`);

const testEmail = opt('test');
if (testEmail) {
  await brevo('POST', `/emailCampaigns/${campaign.id}/sendTest`, { emailTo: [testEmail] });
  console.log(`E-mail de test envoyé à ${testEmail}.`);
} else if (has('send')) {
  await brevo('POST', `/emailCampaigns/${campaign.id}/sendNow`);
  console.log(`Envoi lancé vers la liste ${listId}.`);
} else {
  console.log('Brouillon enregistré dans Brevo (ajoutez --send pour envoyer, ou --test <email>).');
}
