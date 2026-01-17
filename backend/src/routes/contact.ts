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
 * Générer le template HTML d'email professionnel
 * À ajouter dans votre fichier contact.ts
 */
function generateEmailTemplate(
  cleanData: ContactData,
  encryptedPayload: string,
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
          color: #2d3748;
          background: linear-gradient(135deg, #1a3d41 0%, #1e464a 50%, #234a4f 100%);
          padding: 30px 20px;
        }
        .email-wrapper {
          max-width: 700px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        /* Header avec dégradé E-QOS */
        .header {
          background: linear-gradient(135deg, #1e464a 0%, #2d5559 50%, #3a6166 100%);
          padding: 50px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        /* Effet de réseau neuronal en arrière-plan */
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(96, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(96, 255, 255, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .logo-container {
          margin-bottom: 25px;
          position: relative;
          z-index: 1;
        }
        .logo {
          max-width: 200px;
          height: auto;
          filter: brightness(1.1);
        }
        
        .header h1 {
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .header .subtitle {
          color: #a0e4e8;
          font-size: 15px;
          font-weight: 400;
          font-style: italic;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        
        /* Badge de notification avec accent cyan */
        .notification-badge {
          display: inline-block;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 12px;
          font-weight: 700;
          margin-top: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          position: relative;
          z-index: 1;
        }
        
        /* Contenu principal */
        .content {
          padding: 45px 40px;
          background: #ffffff;
        }
        
        .section-title {
          color: #1e464a;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 3px solid #1e464a;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        /* Carte d'informations avec accent E-QOS */
        .info-card {
          background: linear-gradient(135deg, #f8feff 0%, #f0f9fa 100%);
          border: 2px solid #d1eaed;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 2px 8px rgba(30, 70, 74, 0.08);
        }
        .info-row {
          display: flex;
          padding: 12px 0;
          border-bottom: 1px solid #d1eaed;
          align-items: flex-start;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .info-label {
          font-weight: 700;
          color: #1e464a;
          min-width: 140px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .info-value {
          color: #2d5559;
          font-size: 14px;
          word-break: break-word;
          flex: 1;
        }
        
        /* Zone de message professionnelle */
        .message-container {
          margin: 30px 0;
        }
        .message-box {
          background: #ffffff;
          border: 2px solid #1e464a;
          border-radius: 10px;
          padding: 30px;
          font-size: 15px;
          line-height: 1.9;
          color: #2d3748;
          white-space: pre-wrap;
          word-wrap: break-word;
          min-height: 120px;
          box-shadow: 0 4px 12px rgba(30, 70, 74, 0.1);
        }
        
        /* Notice de sécurité avec accent vert */
        .security-notice {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border-left: 5px solid #10b981;
          padding: 20px 25px;
          border-radius: 8px;
          margin: 25px 0;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
        }
        .security-notice-title {
          color: #059669;
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .security-notice-text {
          color: #047857;
          font-size: 13px;
          line-height: 1.6;
        }
        
        /* Payload chiffré */
        .encrypted-payload {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border-left: 5px solid #f59e0b;
          padding: 20px 25px;
          border-radius: 8px;
          margin: 25px 0;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);
        }
        .encrypted-payload-title {
          color: #d97706;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 12px;
        }
        .payload-preview {
          background: rgba(245, 158, 11, 0.1);
          padding: 15px;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: #92400e;
          word-break: break-all;
          border: 1px dashed #f59e0b;
        }
        
        /* Bouton d'action avec couleurs E-QOS */
        .action-button {
          display: inline-block;
          background: linear-gradient(135deg, #1e464a 0%, #2d5559 100%);
          color: white;
          padding: 15px 35px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 15px;
          margin: 25px 0;
          box-shadow: 0 4px 12px rgba(30, 70, 74, 0.3);
          transition: transform 0.2s;
        }
        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(30, 70, 74, 0.4);
        }
        
        /* Footer avec dégradé E-QOS */
        .footer {
          background: linear-gradient(135deg, #1e464a 0%, #2d5559 100%);
          padding: 35px 40px;
          text-align: center;
          border-top: 3px solid #3a6166;
        }
        .footer-title {
          color: #ffffff;
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 12px;
        }
        .footer-tagline {
          color: #a0e4e8;
          font-size: 14px;
          font-style: italic;
          margin-bottom: 15px;
        }
        .footer-text {
          color: #d1eaed;
          font-size: 13px;
          line-height: 1.6;
          margin: 8px 0;
        }
        .footer-warning {
          color: #fca5a5;
          font-size: 13px;
          font-weight: 600;
          margin-top: 20px;
          padding: 12px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 6px;
        }
        .footer-website {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        .footer-link {
          color: #60ffff;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
          body { padding: 15px 10px; }
          .content { padding: 30px 25px; }
          .header { padding: 35px 25px; }
          .footer { padding: 25px 20px; }
          .info-row { 
            flex-direction: column; 
            gap: 5px;
          }
          .info-label { 
            margin-bottom: 5px;
            min-width: auto;
          }
          .message-box { padding: 20px; }
          .logo { max-width: 160px; }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        
        <!-- Header avec identité E-QOS -->
        <div class="header">
          <div class="logo-container">
            <!-- URL de votre logo - à héberger sur e-qos.com/logo-email.png -->
            <img src="https://e-qos.com/logo-email.png" alt="E-QOS Logo" class="logo">
          </div>
          <h1>📬 Nouveau Message de Contact</h1>
          <p class="subtitle">Révolution Digitale pour l'Afrique</p>
          <span class="notification-badge">🔒 Message Sécurisé</span>
        </div>
        
        <!-- Contenu principal -->
        <div class="content">
          
          <!-- Informations du contact -->
          <h2 class="section-title">
            <span>📋</span> Informations du Contact
          </h2>
          <div class="info-card">
            <div class="info-row">
              <span class="info-label">
                <span>👤</span> Nom complet
              </span>
              <span class="info-value">${cleanData.name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">
                <span>📧</span> Email
              </span>
              <span class="info-value">
                <a href="mailto:${cleanData.email}" style="color: #1e464a; font-weight: 600; text-decoration: none;">
                  ${cleanData.email}
                </a>
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">
                <span>📝</span> Sujet
              </span>
              <span class="info-value"><strong>${cleanData.subject}</strong></span>
            </div>
            <div class="info-row">
              <span class="info-label">
                <span>🕒</span> Date & Heure
              </span>
              <span class="info-value">${new Date(cleanData.timestamp).toLocaleString('fr-FR', { 
                dateStyle: 'full', 
                timeStyle: 'medium',
                timeZone: 'Africa/Kinshasa'
              })}</span>
            </div>
            <div class="info-row">
              <span class="info-label">
                <span>🌐</span> Adresse IP
              </span>
              <span class="info-value">${clientIP || 'Non disponible'}</span>
            </div>
          </div>
          
          <!-- Message -->
          <div class="message-container">
            <h2 class="section-title">
              <span>💬</span> Contenu du Message
            </h2>
            <div class="message-box">${cleanData.message}</div>
          </div>
          
          <!-- Bouton d'action -->
          <div style="text-align: center;">
            <a href="mailto:${cleanData.email}?subject=Re: ${encodeURIComponent(cleanData.subject)}" class="action-button">
              ✉️ Répondre au Contact
            </a>
          </div>
          
          <!-- Notice de sécurité -->
          <div class="security-notice">
            <div class="security-notice-title">
              <span>✓</span> Transmission Sécurisée
            </div>
            <p class="security-notice-text">
              Ce message a été transmis via un canal hautement sécurisé utilisant le chiffrement <strong>AES-256-GCM</strong> 
              avec authentification <strong>HMAC-SHA256</strong>. L'intégrité et la confidentialité des données ont été vérifiées.
            </p>
          </div>
          
          <!-- Payload chiffré (pour audit) -->
          <div class="encrypted-payload">
            <div class="encrypted-payload-title">
              🔐 Payload Chiffré (Audit & Traçabilité)
            </div>
            <div class="payload-preview">
              ${encryptedPayload.substring(0, 140)}...
            </div>
            <p style="margin-top: 10px; font-size: 12px; color: #92400e;">
              <em>Conservez cette empreinte pour la traçabilité et l'audit de sécurité.</em>
            </p>
          </div>
          
        </div>
        
        <!-- Footer E-QOS -->
        <div class="footer">
          <p class="footer-title">E-QOS</p>
          <p class="footer-tagline">Entreprise Qualifiée dans les Offres et Services</p>
          <p class="footer-text">
            <strong>Wali</strong> · <strong>Wandi</strong> · <strong>Makiti</strong>
          </p>
          <p class="footer-text">
            Solutions Digitales Innovantes pour l'Afrique
          </p>
          <p class="footer-text" style="margin-top: 15px;">
            Cet email a été généré automatiquement depuis le formulaire de contact sécurisé d'E-QOS.
          </p>
          <p class="footer-warning">
            ⚠️ Ne pas répondre à cet email automatique. Utilisez le bouton "Répondre au Contact" ci-dessus.
          </p>
          <div class="footer-website">
            <a href="https://www.e-qos.com" class="footer-link">
              🌐 www.e-qos.com
            </a>
          </div>
        </div>
        
      </div>
    </body>
    </html>
  `;
}

/**
 * Envoyer l'email sécurisé avec Resend
 */

async function sendSecureEmail(
  cleanData: ContactData,
  encryptedPayload: string,
  clientIP: string | undefined
) {
  const htmlContent = generateEmailTemplate(cleanData, encryptedPayload, clientIP);
  
  // Envoyer avec Resend
  const { data, error } = await resend.emails.send({
    from: `E-QOS Contact <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
    to: process.env.CONTACT_EMAIL || 'contact.eqos@gmail.com',
    replyTo: cleanData.email,
    subject: `[E-QOS] ${cleanData.subject}`,
    html: htmlContent,
    text: `
Nouveau message de contact E-QOS

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