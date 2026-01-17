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
 * Template Email E-QOS - Design Minimaliste et Professionnel
 */
function generateEmailTemplate(
  cleanData: ContactData,
  clientIP: string | undefined
): string {
  return `
    <!DOCTYPE html>
    <html dir="ltr" lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #374151;
          background-color: #f3f4f6;
          padding: 40px 20px;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }
        
        .header {
          background: #ffffff;
          padding: 40px 40px 30px 40px;
          text-align: center;
          border-top: 4px solid #1e464a;
        }
        
        .logo {
          max-width: 180px;
          height: auto;
          margin-bottom: 5px;
        }
        
        .content {
          padding: 0 40px 40px 40px;
        }
        
        .title {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin: 30px 0 10px 0;
          text-align: center;
        }
        
        .subtitle {
          font-size: 15px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 35px;
        }
        
        .info-table {
          width: 100%;
          margin: 25px 0;
          border-collapse: collapse;
        }
        
        .info-table tr {
          border-bottom: 1px solid #e5e7eb;
        }
        
        .info-table tr:last-child {
          border-bottom: none;
        }
        
        .info-table td {
          padding: 14px 0;
          font-size: 14px;
        }
        
        .info-table td:first-child {
          font-weight: 600;
          color: #1e464a;
          width: 120px;
          vertical-align: top;
        }
        
        .info-table td:last-child {
          color: #4b5563;
        }
        
        .message-section {
          margin: 30px 0;
        }
        
        .message-label {
          font-weight: 600;
          color: #1e464a;
          font-size: 14px;
          margin-bottom: 12px;
          display: block;
        }
        
        .message-content {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 20px;
          font-size: 14px;
          line-height: 1.7;
          color: #374151;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        .button-container {
          text-align: center;
          margin: 35px 0;
        }
        
        .button {
          display: inline-block;
          background-color: #1e464a;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 32px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        
        .button:hover {
          background-color: #2d5559;
        }
        
        .footer {
          background: #f9fafb;
          padding: 30px 40px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        
        .footer-text {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.6;
          margin: 5px 0;
        }
        
        .footer-link {
          color: #1e464a;
          text-decoration: none;
          font-weight: 500;
        }
        
        .footer-meta {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }
        
        @media only screen and (max-width: 600px) {
          body { padding: 20px 10px; }
          .header { padding: 30px 25px 20px 25px; }
          .content { padding: 0 25px 30px 25px; }
          .footer { padding: 25px 25px; }
          .logo { max-width: 140px; }
          .title { font-size: 20px; }
          .info-table td:first-child { width: 100px; }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        
        <div class="header">
          <img src="https://e-qos.com/logo_eqos.png" alt="E-QOS" class="logo">
        </div>
        
        <div class="content">
          
          <h1 class="title">Nouveau message de contact</h1>
          <p class="subtitle">Vous avez reçu une nouvelle demande via votre formulaire de contact</p>
          
          <table class="info-table">
            <tr>
              <td>De</td>
              <td><strong>${cleanData.name}</strong></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><a href="mailto:${cleanData.email}" style="color: #1e464a; text-decoration: none;">${cleanData.email}</a></td>
            </tr>
            <tr>
              <td>Sujet</td>
              <td><strong>${cleanData.subject}</strong></td>
            </tr>
            <tr>
              <td>Date</td>
              <td>${new Date(cleanData.timestamp).toLocaleString('fr-FR', { 
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Africa/Kinshasa'
              })}</td>
            </tr>
            <tr>
              <td>IP</td>
              <td style="font-family: monospace; font-size: 13px;">${clientIP || 'N/A'}</td>
            </tr>
          </table>
          
          <div class="message-section">
            <span class="message-label">Message</span>
            <div class="message-content">${cleanData.message}</div>
          </div>
          
          <div class="button-container">
            <a href="mailto:${cleanData.email}?subject=Re: ${encodeURIComponent(cleanData.subject)}" class="button">
              Répondre
            </a>
          </div>
          
        </div>
        
        <div class="footer">
          <p class="footer-text">
            <strong>E-QOS</strong> – Révolution Digitale pour l'Afrique
          </p>
          <p class="footer-text">
            Wali · Wandi · Makiti
          </p>
          <p class="footer-text" style="margin-top: 15px;">
            <a href="https://www.e-qos.com" class="footer-link">www.e-qos.com</a>
          </p>
          
          <div class="footer-meta">
            Cet email a été généré automatiquement. Ne pas répondre à cette adresse.
          </div>
        </div>
        
      </div>
    </body>
    </html>
  `;
}

/**
 * Version texte simple pour les clients email qui ne supportent pas HTML
 */
function generateTextVersion(
  cleanData: ContactData,
  clientIP: string | undefined
): string {
  return `
E-QOS - NOUVEAU MESSAGE DE CONTACT
═══════════════════════════════════════

De: ${cleanData.name}
Email: ${cleanData.email}
Sujet: ${cleanData.subject}
Date: ${new Date(cleanData.timestamp).toLocaleString('fr-FR', { timeZone: 'Africa/Kinshasa' })}
IP: ${clientIP || 'N/A'}

MESSAGE
───────────────────────────────────────
${cleanData.message}

───────────────────────────────────────
Pour répondre, envoyez un email à: ${cleanData.email}

E-QOS – Révolution Digitale pour l'Afrique
Wali · Wandi · Makiti
www.e-qos.com
  `.trim();
}

/**
 * Envoyer l'email sécurisé avec Resend
 */
async function sendSecureEmail(
  cleanData: ContactData,
  encryptedPayload: string,
  clientIP: string | undefined
) {
  // Générer les templates (le chiffrement est déjà fait avant l'appel)
  const htmlContent = generateEmailTemplate(cleanData, clientIP);
  const textContent = generateTextVersion(cleanData, clientIP);

  // Log du payload chiffré pour traçabilité (GARDÉ pour la sécurité)
  console.log(`[CONTACT_ENCRYPTED] Payload sécurisé: ${encryptedPayload.substring(0, 50)}...`);

  const { data, error } = await resend.emails.send({
    from: `E-QOS <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
    to: process.env.CONTACT_EMAIL || 'contact.eqos@gmail.com',
    replyTo: cleanData.email,
    subject: `${cleanData.subject}`,
    html: htmlContent,
    text: textContent
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

      // ✅ CHIFFREMENT DOUBLE (AES-256 + HMAC) - GARDÉ POUR LA SÉCURITÉ
      const aesKey = process.env.CONTACT_FORM_SECRET || 'default-secret';
      const hmacSecret = process.env.HMAC_SECRET || process.env.CONTACT_FORM_SECRET || 'default-secret';

      const payloadJSON = JSON.stringify(cleanData);
      const encryptedPayload = EncryptionService.encryptDouble(
        payloadJSON,
        aesKey,
        hmacSecret
      );

      // Envoyer l'email sécurisé (le payload chiffré est loggé dans sendSecureEmail)
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