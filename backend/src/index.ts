// backend/src/index.ts
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import contactRouter from './routes/contact';
import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';

const app: Express = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://e-qos.netlify.app',           // Production Netlify
  'https://e-qos.com',   // Production custom domain
  'https://www.e-qos.com/', // Production custom domain www
  'http://localhost:3000',               // Développement
  'http://localhost:5173',               // Vite dev server
  'https://e-qos-web-backend.onrender.com' // Backend lui-même
];

// Charger les variables d'environnement
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// ✅ AJOUT: Diagnostic des variables d'environnement
console.log('=== ENV VARIABLES LOADED ===');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '***SET***' : 'MISSING');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('============================');

// Middleware - CORS

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Middleware - JSON parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware - Security headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Middleware - Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;
  const ip = req.ip || req.socket.remoteAddress;
  
  console.log(`[${timestamp}] ${method} ${path} - IP: ${ip}`);
  next();
});

// ===== ROUTES =====

// Route racine - Page d'accueil de l'API
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: '🚀 API E-QOS Backend - Service Opérationnel',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: '/health',
      contact: '/api/contact/send',
      documentation: '/docs'
    },
    status: 'active'
  });
});

// Documentation de l'API
app.get('/docs', (_req: Request, res: Response) => {
  res.status(200).json({
    name: 'E-QOS Backend API',
    description: 'Backend sécurisé pour la plateforme digitale E-QOS',
    version: '1.0.0',
    documentation: {
      'GET /': 'Page d\'accueil de l\'API',
      'GET /health': 'Health check du serveur',
      'GET /docs': 'Documentation de l\'API',
      'GET /api/contact/health': 'Health check du service contact',
      'POST /api/contact/send': 'Envoyer un message de contact sécurisé'
    },
    security: {
      encryption: 'AES-256-GCM + HMAC-SHA256',
      rate_limiting: 'Activé',
      sanitization: 'DOMPurify',
      cors: 'Configuré'
    }
  });
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/contact', contactRouter);

// 404 handler (doit être après toutes les routes)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint non trouvé',
    path: req.path,
    method: req.method,
    available_endpoints: [
      'GET /',
      'GET /health',
      'GET /docs',
      'GET /api/contact/health',
      'POST /api/contact/send'
    ],
    timestamp: new Date().toISOString()
  });
});

// Error handler middleware (doit être en dernier)
app.use(errorHandler);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║               E-QOS Backend Sécurisé Démarré        ║
╠══════════════════════════════════════════════════════╣
║  Port: ${PORT}${' '.repeat(43 - PORT.toString().length)}║
║  Environnement: ${process.env.NODE_ENV || 'development'}${' '.repeat(28 - (process.env.NODE_ENV || 'development').length)}║
║  CORS: ${allowedOrigins.length} origines autorisées${' '.repeat(28 - allowedOrigins.length.toString().length)}║
║                                                      ║
║  Frontends autorisés:                                ║
║  • https://e-qos.netlify.app                         ║
║  • http://e-qos.com                                  ║
║  • https://www.e-qos.com/                            ║
║  • +${allowedOrigins.length - 2} autres environnements║
╚══════════════════════════════════════════════════════╝
  `);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason: Error) => {
  console.error('[UNHANDLED_REJECTION]', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('[UNCAUGHT_EXCEPTION]', error);
  process.exit(1);
});

export default app;