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
} from './src/services/security.service.ts';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS Configuration
const corsOptions = {
  origin: [
    'https://authinteractive.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
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

app.post('/api/send-contact', async (req, res) => {
  try {
    const { name, email, message, honeypot } = req.body as ContactFormData;

    // Validation de base
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Valider le honeypot (protection contre les bots)
    if (!validateHoneypot(honeypot || '')) {
      console.warn('⚠️ Tentative de spam détectée (honeypot)');
      return res.status(400).json({ error: 'Erreur de validation' });
    }

    // Valider l'email
    if (!isValidEmail(email)) {
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
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email envoyé à ${PRIMARY_EMAIL} de ${cleanName}`);
      return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
    } catch (primaryError) {
      console.warn(`⚠️ Erreur lors de l'envoi à ${PRIMARY_EMAIL}:`, primaryError);

      // Fallback: envoyer vers l'email de secours
      try {
        const fallbackOptions = { ...mailOptions, to: FALLBACK_EMAIL };
        await transporter.sendMail(fallbackOptions);
        console.log(`✅ Email envoyé au fallback: ${FALLBACK_EMAIL}`);
        return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
      } catch (fallbackError) {
        console.error(`❌ Erreur fallback vers ${FALLBACK_EMAIL}:`, fallbackError);
        throw fallbackError;
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
    res.status(500).json({ error: 'Impossible d\'envoyer le message' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`🚀 Serveur de contact en écoute sur le port ${port}`);
});
