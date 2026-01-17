import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  rateLimitMiddleware,
  isLikelySpam,
  isValidEmail,
  validateHoneypot,
  sanitizeInput,
} from './src/services/security.service.js';

// Ne charger .env que si les variables ne sont pas déjà définies (dev local uniquement)
if (!process.env.PORT) {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || '3001';

// 🔍 LOG: Afficher les variables d'environnement et l'origine
console.log('📋 Configuration du serveur:');
console.log(`   PORT env: "${process.env.PORT}"`);
console.log(`   Port utilisé: ${port}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`   GMAIL_USER configuré: ${process.env.GMAIL_USER ? '✅ OUI' : '❌ NON'}`);
console.log(`   GMAIL_PASSWORD configuré: ${process.env.GMAIL_PASSWORD ? '✅ OUI' : '❌ NON'}`);

// CORS Configuration
const corsOptions = {
  origin: [
    'https://authinteractive.com',
    'https://www.authinteractive.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  maxAge: 3600,
};

console.log('🔐 Origins CORS autorisées:', corsOptions.origin);

// 🔍 Middleware de logging CORS
app.use((req, res, next) => {
  console.log(`\n📨 [${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log(`   Origin: ${req.get('origin') || 'N/A'}`);
  console.log(`   User-Agent: ${req.get('user-agent')?.substring(0, 50) || 'N/A'}`);
  next();
});

app.use(cors(corsOptions));

// 🔍 Middleware pour voir la réponse CORS
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function(data) {
    console.log(`   ✅ Response status: ${res.statusCode}`);
    console.log(`   CORS Headers appliqués:`);
    console.log(`      Access-Control-Allow-Origin: ${res.get('Access-Control-Allow-Origin') || 'N/A'}`);
    console.log(`      Access-Control-Allow-Credentials: ${res.get('Access-Control-Allow-Credentials') || 'N/A'}`);
    return originalJson.call(this, data);
  };
  next();
});

app.use(express.json());
app.use(rateLimitMiddleware); // Appliquer le rate limiting à toutes les routes

// Configuration Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD, // App password, pas le mot de passe Gmail
  },
});

const PRIMARY_EMAIL = 'support@authinteractive.com';
const FALLBACK_EMAIL = 'authinteractive@gmail.com';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

// Handler pour les preflight requests (OPTIONS)
app.options('/api/send-contact', cors(corsOptions));

app.post('/api/send-contact', async (req, res) => {
  try {
    console.log('\n🟢 [POST /api/send-contact] Requête reçue');
    console.log('   Body reçu:', Object.keys(req.body));
    
    const { name, email, message, honeypot } = req.body as ContactFormData;

    // Validation de base
    if (!name || !email || !message) {
      console.warn('   ❌ Validation échouée: champs manquants');
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    console.log(`   ✅ Champs valides: name="${name.substring(0, 20)}", email="${email}"`);

    // Valider le honeypot (protection contre les bots)
    if (!validateHoneypot(honeypot || '')) {
      console.warn('⚠️ Tentative de spam détectée (honeypot)');
      return res.status(400).json({ error: 'Erreur de validation' });
    }

    // Valider l'email
    if (!isValidEmail(email)) {
      console.warn(`   ❌ Email invalide: ${email}`);
      return res.status(400).json({ error: 'Email invalide' });
    }

    // Détecter le spam
    if (isLikelySpam({ name, email, message })) {
      console.warn('⚠️ Message filtré comme spam');
      // Retourner un succès fictif pour ne pas révéler la détection
      return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
    }

    // Nettoyer les inputs
    const cleanName = sanitizeInput(name);
    const cleanMessage = sanitizeInput(message);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: PRIMARY_EMAIL,
      replyTo: email,
      subject: `Nouveau message de contact de ${cleanName}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${cleanMessage.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Tentative d'envoi vers l'email principal
    try {
      console.log(`   📧 Tentative d'envoi à ${PRIMARY_EMAIL}...`);
      await transporter.sendMail(mailOptions);
      console.log(`   ✅ Email envoyé avec succès à ${PRIMARY_EMAIL}`);
      return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
    } catch (primaryError) {
      console.warn(`   ⚠️ Erreur lors de l'envoi à ${PRIMARY_EMAIL}:`, primaryError);

      // Fallback: envoyer vers l'email de secours
      try {
        console.log(`   📧 Fallback: Tentative d'envoi à ${FALLBACK_EMAIL}...`);
        const fallbackOptions = { ...mailOptions, to: FALLBACK_EMAIL };
        await transporter.sendMail(fallbackOptions);
        console.log(`   ✅ Email envoyé au fallback: ${FALLBACK_EMAIL}`);
        return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
      } catch (fallbackError) {
        console.error(`   ❌ Erreur fallback vers ${FALLBACK_EMAIL}:`, fallbackError);
        throw fallbackError;
      }
    }
  } catch (error) {
    console.error('   ❌ Erreur lors de l\'envoi:', error);
    res.status(500).json({ error: 'Impossible d\'envoyer le message' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 Serveur de contact démarré avec succès!');
  console.log('='.repeat(60));
  console.log(`📍 Port: ${port}`);
  console.log(`🔐 CORS activé`);
  console.log(`📧 Email primaire: ${PRIMARY_EMAIL}`);
  console.log(`📧 Email de secours: ${FALLBACK_EMAIL}`);
  console.log('='.repeat(60) + '\n');
});
