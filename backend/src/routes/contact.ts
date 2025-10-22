// backend/src/routes/contact.ts
import express, { Router, Request, Response, NextFunction } from 'express';
import { Resend } from 'resend';
import { EncryptionService } from '../lib/encryption.utils';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { sanitize } from 'isomorphic-dompurify';

const router: Router = express.Router();

// Initialiser Resend
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}
const resend = new Resend(process.env.RESEND_API_KEY);

// Interface pour les données de contact
interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
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
    /click here/i,
    /<script/i,
    /onclick/i
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
    name: sanitize(data.name.trim()),
    email: sanitize(data.email.trim().toLowerCase()),
    subject: sanitize(data.subject.trim()),
    message: sanitize(data.message.trim()),
    timestamp: new Date().toISOString()
  };
}

/**
 * Envoyer l'email sécurisé avec Resend
 */
async function sendSecureEmail(
  cleanData: ContactData,
  encryptedPayload: string,
  clientIP: string | undefined
) {
  // Construire le HTML de l'email
  const htmlContent = `
    <!DOCTYPE html>
    <html dir="ltr" lang="fr">
    <head>
      <meta charset="utf-8">
      <style>
        * { margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .header { background: linear-gradient(135deg, #1e464a 0%, #2d5559 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { font-size: 24px; margin-bottom: 10px; }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
        .data-section { background: #f0f4f8; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #6366f1; }
        .data-section p { margin: 10px 0; }
        .message-box { background: #ffffff; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0; white-space: pre-wrap; word-wrap: break-word; font-family: 'Courier New', monospace; }
        .encrypted-notice { background: #ecfdf5; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10b981; font-size: 12px; }
        .encrypted-notice strong { color: #059669; }
        .security-info { background: #fff7ed; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b; font-size: 11px; }
        .security-info strong { color: #d97706; }
        .footer { color: #666; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px; text-align: center; }
        strong { color: #1e464a; }
        h3 { margin-top: 20px; margin-bottom: 10px; color: #1e464a; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔒 Nouveau Message de Contact Sécurisé</h1>
          <p>E-QOS | Plateforme Digitale Africaine</p>
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
            <strong>✓ Message Sécurisé</strong>
            <p>Cette communication a été chiffrée avec AES-256-GCM et protégée par HMAC-SHA256.</p>
          </div>

          <div class="security-info">
            <strong>ℹ️ Payload Chiffré (Double Chiffrement)</strong>
            <p style="word-break: break-all; margin-top: 10px; font-family: 'Courier New', monospace; background: #f3f4f6; padding: 10px; border-radius: 4px;">
              ${encryptedPayload.substring(0, 100)}...
            </p>
            <p style="margin-top: 10px;">Vérifiez l'intégrité des données avant toute action (HMAC-SHA256).</p>
          </div>

          <div class="footer">
            <p><strong>E-QOS Contact Form</strong></p>
            <p>Cet email a été généré automatiquement depuis le formulaire de contact sécurisé d'E-QOS.</p>
            <p>Ne pas répondre à cet email automatique. Répondez directement au contact.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Envoyer avec Resend
  const { data, error } = await resend.emails.send({
    from: `E-QOS Contact <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
    to: process.env.CONTACT_EMAIL || 'contact.eqos@gmail.com',
    replyTo: cleanData.email,
    subject: `[🔒 SÉCURISÉ] E-QOS: ${cleanData.subject}`,
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
Payload chiffré (AES-256-GCM + HMAC-SHA256):
${encryptedPayload}

---
Cet email a été généré automatiquement depuis le formulaire de contact sécurisé d'E-QOS.
    `.trim()
  });

  if (error) {
    throw new Error(`Erreur Resend: ${error.message}`);
  }

  return data;
}

/**
 * Route POST - Envoyer un message de contact
 */
router.post(
  '/send',
  rateLimitMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientIP = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;

      // Extraire et valider les données
      const { name, email, subject, message } = req.body;
      const validation = validateFormData({ name, email, subject, message });

      if (!validation.valid) {
        console.warn(`[CONTACT_VALIDATION_FAILED] IP: ${clientIP}`, validation.errors);
        res.status(400).json({
          error: 'Validation échouée',
          details: validation.errors
        });
        return;
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

      // Log de succès
      console.log(`[CONTACT_SUCCESS] Email envoyé - IP: ${clientIP} - Email: ${cleanData.email} - Timestamp: ${cleanData.timestamp}`);

      // Répondre au client
      res.status(200).json({
        success: true,
        message: 'Message envoyé avec succès et sécurisé',
        timestamp: new Date().toISOString()
      });

    } catch (error: any) {
      console.error('[CONTACT_ERROR]', {
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });

      next(error);
    }
  }
);

/**
 * Route GET - Health check pour contact API
 */
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'contact-api-ok',
    timestamp: new Date().toISOString()
  });
});

export default router;