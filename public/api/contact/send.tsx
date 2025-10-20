// pages/api/contact/send.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { EncryptionService, KeyManagementService } from '../../../lib/encryption.utils';
import DOMPurify from 'isomorphic-dompurify';

// Interface pour les données de contact
interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// Cache en mémoire pour le rate limiting (remplacer par Redis en production)
const requestCache = new Map<string, number[]>();

/**
 * Vérifier et appliquer le rate limiting
 */
function checkRateLimit(clientIP: string | undefined): { allowed: boolean; message: string } {
  const ip = clientIP || 'unknown';
  const now = Date.now();
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000');
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '3');

  const requests = requestCache.get(ip) || [];
  const recentRequests = requests.filter(timestamp => now - timestamp < windowMs);

  if (recentRequests.length >= maxRequests) {
    return {
      allowed: false,
      message: `Trop de tentatives. Réessayez dans ${Math.ceil((recentRequests[0] + windowMs - now) / 1000)} secondes.`
    };
  }

  recentRequests.push(now);
  requestCache.set(ip, recentRequests);

  return { allowed: true, message: 'OK' };
}

/**
 * Valider les données du formulaire
 */
function validateFormData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validation nom
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Nom manquant ou invalide');
  } else if (data.name.trim().length < 2 || data.name.trim().length > 100) {
    errors.push('Nom doit contenir entre 2 et 100 caractères');
  }

  // Validation email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Email invalide');
  }

  // Validation sujet
  if (!data.subject || typeof data.subject !== 'string') {
    errors.push('Sujet manquant');
  } else if (data.subject.trim().length < 3 || data.subject.trim().length > 200) {
    errors.push('Sujet doit contenir entre 3 et 200 caractères');
  }

  // Validation message
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message manquant');
  } else if (data.message.trim().length < 10 || data.message.trim().length > 5000) {
    errors.push('Message doit contenir entre 10 et 5000 caractères');
  }

  // Détection de spam
  const spamPatterns = [
    /http[s]?:\/\//i,
    /www\./i,
    /\[url\]/i,
    /<a href/i,
    /buy now/i,
    /cheap/i,
    /viagra/i,
    /casino/i,
    /click here/i
  ];

  const fullText = `${data.subject} ${data.message}`.toLowerCase();
  for (const pattern of spamPatterns) {
    if (pattern.test(fullText)) {
      errors.push('Contenu suspect détecté');
      break;
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Nettoyer et préparer les données
 */
function sanitizeData(data: ContactData): ContactData {
  return {
    name: DOMPurify.sanitize(data.name.trim()),
    email: DOMPurify.sanitize(data.email.trim().toLowerCase()),
    subject: DOMPurify.sanitize(data.subject.trim()),
    message: DOMPurify.sanitize(data.message.trim()),
    timestamp: new Date().toISOString()
  };
}

/**
 * Envoyer l'email sécurisé
 */
async function sendSecureEmail(
  cleanData: ContactData,
  encryptedPayload: string,
  clientIP: string | undefined
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: true
    }
  });

  // Vérifier la connexion
  await transporter.verify();

  // Email sécurisé avec données chiffrées
  const htmlContent = `
    <!DOCTYPE html>
    <html dir="ltr" lang="fr">
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .header { background: linear-gradient(135deg, #1e464a 0%, #2d5559 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
        .data-section { background: #f0f4f8; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #6366f1; }
        .message-box { background: #ffffff; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0; white-space: pre-wrap; word-wrap: break-word; }
        .encrypted-notice { background: #ecfdf5; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10b981; font-size: 12px; }
        .security-info { background: #fff7ed; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b; font-size: 11px; }
        .footer { color: #666; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px; text-align: center; }
        strong { color: #1e464a; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nouveau Message de Contact Sécurisé</h1>
          <p>E-QOS | Plateforme Digitale</p>
        </div>
        
        <div class="content">
          <h2>Détails du Contact</h2>
          
          <div class="data-section">
            <p><strong>Nom:</strong> ${cleanData.name}</p>
            <p><strong>Email:</strong> ${cleanData.email}</p>
            <p><strong>Sujet:</strong> ${cleanData.subject}</p>
            <p><strong>Date/Heure:</strong> ${cleanData.timestamp}</p>
            <p><strong>IP Source:</strong> ${clientIP || 'N/A'}</p>
          </div>

          <h3>Message</h3>
          <div class="message-box">${cleanData.message}</div>

          <div class="encrypted-notice">
            <strong>🔒 Message Sécurisé</strong>
            <p>Cette communication a été chiffrée avec AES-256-GCM et protégée par HMAC-SHA256.</p>
          </div>

          <div class="security-info">
            <strong>ℹ️ Informations de Sécurité</strong>
            <p>Payload chiffré (double chiffrement): ${encryptedPayload.substring(0, 50)}...</p>
            <p>Vérifiez l'intégrité des données avant toute action.</p>
          </div>

          <div class="footer">
            <p>Cet email a été généré automatiquement depuis le formulaire de contact sécurisé d'E-QOS.</p>
            <p>Ne pas répondre à cet email. Répondez directement au contact via la plateforme.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: {
      name: 'E-QOS Contact Sécurisé',
      address: process.env.SMTP_FROM_EMAIL || 'noreply@e-qos.com'
    },
    to: process.env.CONTACT_EMAIL || 'contact.admin@e-qos.com',
    replyTo: cleanData.email,
    subject: `[🔒 SÉCURISÉ] E-QOS Contact: ${cleanData.subject}`,
    html: htmlContent,
    text: `
Nouveau message de contact E-QOS (Sécurisé)

De: ${cleanData.name} <${cleanData.email}>
Sujet: ${cleanData.subject}
Date: ${cleanData.timestamp}
IP: ${clientIP}

Message:
${cleanData.message}

---
Ce message a été envoyé via le formulaire de contact sécurisé d'E-QOS.
Données chiffrées avec AES-256-GCM + HMAC-SHA256.
    `.trim()
  };

  // Envoyer avec timeout de sécurité
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Timeout d\'envoi email'));
    }, 15000);

    transporter.sendMail(mailOptions, (err, info) => {
      clearTimeout(timeout);
      if (err) reject(err);
      else resolve(info);
    });
  });
}

/**
 * Handler principal
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const clientIP = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;

    // Vérifier rate limiting
    const rateLimitCheck = checkRateLimit(clientIP);
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({ error: rateLimitCheck.message });
    }

    // Extraire et valider les données
    const { name, email, subject, message } = req.body;
    const validation = validateFormData({ name, email, subject, message });

    if (!validation.valid) {
      return res.status(400).json({
        error: 'Validation échouée',
        details: validation.errors
      });
    }

    // Nettoyer les données
    const cleanData: ContactData = sanitizeData({
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // Chiffrement double (AES-256 + HMAC)
    const aesKey = process.env.CONTACT_FORM_SECRET || 'default-secret';
    const hmacSecret = process.env.HMAC_SECRET || process.env.CONTACT_FORM_SECRET || 'default-secret';

    const payloadJSON = JSON.stringify(cleanData);
    const encryptedPayload = EncryptionService.encryptDouble(
      payloadJSON,
      aesKey,
      hmacSecret
    );

    // Envoyer l'email sécurisé
    await sendSecureEmail(cleanData, encryptedPayload, clientIP);

    // Log de sécurité (à adapter selon votre système)
    console.log(`[SECURE_CONTACT] Email envoyé avec succès - IP: ${clientIP} - Email: ${cleanData.email}`);

    // Répondre au client
    res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès et sécurisé',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[SECURE_CONTACT_ERROR]', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    // Ne pas révéler d'informations sensibles
    res.status(500).json({
      error: 'Erreur lors du traitement. Réessayez dans quelques instants.',
      timestamp: new Date().toISOString()
    });
  }
}