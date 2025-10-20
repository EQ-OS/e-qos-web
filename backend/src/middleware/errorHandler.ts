// backend/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Interface pour les erreurs personnalisées
 */
export interface AppError extends Error {
  statusCode?: number;
  details?: any;
}

/**
 * Classe pour les erreurs applicatives
 */
export class CustomError extends Error implements AppError {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode: number = 500, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

/**
 * Middleware de gestion des erreurs (doit être en dernier)
 */
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response): void {
  const timestamp = new Date().toISOString();
  const clientIP = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
  const method = req.method;
  const path = req.path;

  // Déterminer le statut HTTP
  const statusCode = err.statusCode || 500;
  
  // Logger l'erreur
  console.error(`[ERROR_HANDLER] ${timestamp}`, {
    statusCode,
    message: err.message,
    method,
    path,
    clientIP,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // Préparer la réponse d'erreur
  const errorResponse: any = {
    error: err.message || 'Erreur serveur interne',
    timestamp,
    statusCode
  };

  // Ajouter les détails en développement seulement
  if (process.env.NODE_ENV === 'development' && err.details) {
    errorResponse.details = err.details;
  }

  // Gérer les erreurs spécifiques
  if (err.message.includes('SMTP') || err.message.includes('mail')) {
    errorResponse.error = 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.';
    console.error('[SMTP_ERROR]', err.message);
  }

  if (err.message.includes('validate') || err.message.includes('validation')) {
    errorResponse.statusCode = 400;
    errorResponse.error = 'Erreur de validation des données';
  }

  if (err.message.includes('decrypt') || err.message.includes('encrypt')) {
    errorResponse.statusCode = 400;
    errorResponse.error = 'Erreur de chiffrement/déchiffrement';
    console.error('[ENCRYPTION_ERROR]', err.message);
  }

  if (err.message.includes('Timeout')) {
    errorResponse.statusCode = 408;
    errorResponse.error = 'Délai d\'attente dépassé. Veuillez réessayer.';
  }

  // Envoyer la réponse
  res.status(statusCode).json(errorResponse);
}

/**
 * Wrapper pour les routes async pour capturer les erreurs
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}