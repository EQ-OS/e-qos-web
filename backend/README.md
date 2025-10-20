# Backend Sécurisé E-QOS

Backend Express.js pour le formulaire de contact sécurisé avec chiffrement double (AES-256-GCM + HMAC-SHA256).

## Structure du Projet

```
backend/
├── src/
│   ├── index.ts                    # Point d'entrée serveur
│   ├── routes/
│   │   └── contact.ts             # Route POST /api/contact/send
│   ├── lib/
│   │   └── encryption.utils.ts    # Service de chiffrement
│   └── middleware/
│       ├── rateLimit.ts           # Middleware rate limiting
│       └── errorHandler.ts        # Middleware gestion d'erreurs
├── dist/                          # Build TypeScript compilé (généré)
├── package.json                   # Dépendances NPM
├── tsconfig.json                  # Configuration TypeScript
├── .env.local                     # Variables d'environnement (local)
├── .env.production                # Variables d'environnement (production)
└── README.md                      # Ce fichier
```

## Installation et Démarrage

### 1. Prérequis

- Node.js v18+ 
- npm v10+
- Compte Gmail avec 2FA activé (pour SMTP)

### 2. Installation des dépendances

```bash
cd backend
npm install
```

### 3. Configuration

Copier `.env.local` et remplacer les valeurs:

```bash
# Générer les clés secrètes
openssl rand -hex 32
openssl rand -hex 32

# Créer .env.local
cp .env.local.example .env.local
# Éditer .env.local avec vos valeurs
```

### 4. Démarrage en développement

```bash
npm run dev
```

Serveur démarre sur `http://localhost:5000`

### 5. Build pour production

```bash
npm run build
npm start
```

## Configuration Gmail

1. Activer 2FA: https://myaccount.google.com/security
2. Créer mot de passe app: https://myaccount.google.com/apppasswords
3. Copier le mot de passe dans `SMTP_PASSWORD` dans `.env.local`

## Variables d'Environnement

### Développement (.env.local)

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

CONTACT_FORM_SECRET=your-32-char-hex-key
HMAC_SECRET=your-32-char-hex-key

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=3
```

### Production

```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://e-qos.com

# + Mêmes configs SMTP
```

## Endpoints API

### POST /api/contact/send

Envoyer un message de contact sécurisé.

**Request:**
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "subject": "information",
  "message": "Bonjour, j'aimerais en savoir plus sur vos services."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Message envoyé avec succès et sécurisé",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

**Response (400):**
```json
{
  "error": "Validation échouée",
  "details": [
    "Email invalide"
  ]
}
```

**Response (429):**
```json
{
  "error": "Trop de tentatives",
  "message": "Vous avez dépassé le nombre limite de requêtes. Réessayez dans 600 secondes.",
  "retryAfter": 600,
  "resetTime": "2025-01-15T10:45:00.000Z"
}
```

### GET /health

Vérifier que le serveur fonctionne.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "uptime": 1234.56
}
```

### GET /api/contact/health

Vérifier que l'API contact fonctionne.

**Response:**
```json
{
  "status": "contact-api-ok",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

## Sécurité

### Chiffrement Double

1. **AES-256-GCM** (Premier niveau)
   - Chiffrement symétrique
   - Authentification garantie
   - IV aléatoire 16 bytes
   - Auth tag 16 bytes

2. **HMAC-SHA256** (Deuxième niveau)
   - Signature des données chiffrées
   - Détection d'altération
   - Vérification temporelle sécurisée

### Rate Limiting

- 3 tentatives par 15 minutes par IP
- Headers informatifs: `X-RateLimit-*`
- Stockage en mémoire (Redis en production)

### Validation & Sanitization

- Validation stricte côté serveur
- Sanitization HTML avec isomorphic-dompurify
- Détection de spam patterns
- Timeout de sécurité (15s SMTP, 30s client)

### Headers de Sécurité

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

## Scripts NPM

```bash
npm run dev          # Démarrer en développement (watch mode)
npm run build        # Compiler TypeScript
npm start            # Démarrer production
npm run dev:watch    # Développement avec ts-node-dev
npm run lint         # Linter le code
npm test             # Lancer les tests
npm run test:watch   # Tests en watch mode
```

## Logging

Tous les logs sont affichés en console avec timestamps:

```
[2025-01-15T10:30:00.000Z] POST /api/contact/send - IP: 192.168.1.1
[CONTACT_SUCCESS] Email envoyé - IP: 192.168.1.1 - Email: jean@example.com
[RATE_LIMIT_CHECK] IP: 192.168.1.1 - Requests: 1/3
```

### Logs à Monitorer

- `[CONTACT_SUCCESS]` - Email envoyé avec succès
- `[CONTACT_ERROR]` - Erreur lors de l'envoi
- `[CONTACT_VALIDATION_FAILED]` - Validation échouée
- `[RATE_LIMIT_EXCEEDED]` - Limite atteinte
- `[SMTP_ERROR]` - Erreur SMTP
- `[ENCRYPTION_ERROR]` - Erreur chiffrement

## Dépannage

### Erreur: "SMTP connection failed"

```
Solution:
1. Vérifier SMTP_USER et SMTP_PASSWORD
2. Vérifier 2FA Gmail activé
3. Vérifier mot de passe d'app généré
4. Tester: telnet smtp.gmail.com 587
```

### Erreur: "Signature HMAC invalide"

```
Solution:
1. Vérifier CONTACT_FORM_SECRET identique
2. Vérifier HMAC_SECRET identique
3. Pas d'espaces ni retours à la ligne
```

### Erreur: "Trop de tentatives - 429"

```
Solution:
1. Attendre 15 minutes
2. Tester avec IP différente
3. Réduire RATE_LIMIT_MAX_REQUESTS en dev
```

## Déploiement

### Heroku

```bash
git push heroku main
```

Config vars:
```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://e-qos.com
SMTP_HOST=smtp.gmail.com
...
```

### Vercel

Créer `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## Monitoring Production

Utiliser:
- Sentry: Error tracking
- DataDog: Performance monitoring
- LogRocket: Session replay
- Uptime Robot: Health checks

## Support

Pour questions:
1. Vérifier les logs
2. Consulter le guide d'implémentation
3. Vérifier les erreurs TypeScript
4. Tester les endpoints avec curl/Postman

## License
##
## Savoir si le port est écouté
Test-NetConnection -ComputerName smtp.zoho.com -Port 587       
                                          
MIT