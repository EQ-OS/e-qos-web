// backend/src/middleware/rateLimit.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Store pour rate limiting en mémoire
 * En production, utiliser Redis pour distributed rate limiting
 */
const requestStore = new Map<string, number[]>();

/**
 * Nettoyer les anciennes entrées (optimization mémoire)
 */
function cleanupOldEntries(): void {
  const now = Date.now();
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000');

  for (const [ip, timestamps] of requestStore.entries()) {
    const recentTimestamps = timestamps.filter(ts => now - ts < windowMs);
    
    if (recentTimestamps.length === 0) {
      requestStore.delete(ip);
    } else {
      requestStore.set(ip, recentTimestamps);
    }
  }
}

/**
 * Middleware pour Rate Limiting
 * Configuration: 
 * - RATE_LIMIT_WINDOW_MS: fenêtre de temps (défaut 15 minutes)
 * - RATE_LIMIT_MAX_REQUESTS: max tentatives (défaut 3)
 */
export function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    // Récupérer l'IP du client
    const clientIP = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() 
      || req.socket.remoteAddress 
      || 'unknown';

    // Récupérer les paramètres du rate limiting
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes par défaut
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '3'); // 3 tentatives par défaut
    const now = Date.now();

    // Récupérer ou initialiser la liste des timestamps pour cette IP
    let timestamps = requestStore.get(clientIP) || [];

    // Filtrer les requêtes en dehors de la fenêtre de temps
    const recentTimestamps = timestamps.filter(timestamp => now - timestamp < windowMs);

    // Vérifier si le nombre de requêtes a été dépassé
    if (recentTimestamps.length >= maxRequests) {
      const oldestTimestamp = recentTimestamps[0];
      const resetTime = new Date(oldestTimestamp + windowMs);
      const waitSeconds = Math.ceil((resetTime.getTime() - now) / 1000);

      console.warn(`[RATE_LIMIT_EXCEEDED] IP: ${clientIP} - Attempts: ${recentTimestamps.length}/${maxRequests} - Wait: ${waitSeconds}s`);

      res.setHeader('Retry-After', waitSeconds);
      res.setHeader('X-RateLimit-Limit', maxRequests.toString());
      res.setHeader('X-RateLimit-Remaining', '0');
      res.setHeader('X-RateLimit-Reset', resetTime.toISOString());

      res.status(429).json({
        error: 'Trop de tentatives',
        message: `Vous avez dépassé le nombre limite de requêtes. Réessayez dans ${waitSeconds} secondes.`,
        retryAfter: waitSeconds,
        resetTime: resetTime.toISOString()
      });

      return;
    }

    // Ajouter le timestamp actuel
    recentTimestamps.push(now);
    requestStore.set(clientIP, recentTimestamps);

    // Headers informatifs
    res.setHeader('X-RateLimit-Limit', maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', (maxRequests - recentTimestamps.length).toString());
    res.setHeader('X-RateLimit-Reset', new Date(now + windowMs).toISOString());

    console.log(`[RATE_LIMIT_CHECK] IP: ${clientIP} - Requests: ${recentTimestamps.length}/${maxRequests}`);

    // Nettoyer les vieilles entrées toutes les 100 requêtes
    if (Math.random() < 0.01) {
      cleanupOldEntries();
    }

    next();

  } catch (error) {
    console.error('[RATE_LIMIT_ERROR]', error);
    next();
  }
}

/**
 * Fonction pour réinitialiser le rate limit d'une IP (utile pour testing)
 */
export function resetRateLimit(clientIP: string): void {
  requestStore.delete(clientIP);
  console.log(`[RATE_LIMIT_RESET] IP: ${clientIP}`);
}

/**
 * Fonction pour obtenir le statut du rate limit
 */
export function getRateLimitStatus(clientIP: string): {
  attempts: number;
  limit: number;
  remaining: number;
} {
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '3');
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000');
  const now = Date.now();

  const timestamps = requestStore.get(clientIP) || [];
  const recentTimestamps = timestamps.filter(ts => now - ts < windowMs);

  return {
    attempts: recentTimestamps.length,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - recentTimestamps.length)
  };
}