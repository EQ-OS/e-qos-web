// backend/src/lib/encryption.utils.ts
import crypto from 'crypto';

/**
 * Classe pour gérer le chiffrement double (AES-256 + RSA)
 * Niveau de sécurité: Très haut
 */
export class EncryptionService {
  private static readonly ALGORITHM_AES = 'aes-256-gcm';
  private static readonly IV_LENGTH = 16;

  /**
   * Chiffrement AES-256-GCM (premier niveau)
   */
  static encryptAES(data: string, key: string): string {
    try {
      // Dériver une clé stable à partir de la clé secrète
      const derivedKey = crypto
        .createHash('sha256')
        .update(key)
        .digest();

      const iv = crypto.randomBytes(this.IV_LENGTH);
      const cipher = crypto.createCipheriv(
        this.ALGORITHM_AES,
        derivedKey,
        iv
      );

      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      const authTag = cipher.getAuthTag();

      // Format: iv + authTag + encrypted
      return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
    } catch (error) {
      throw new Error('Erreur chiffrement AES: ' + (error as Error).message);
    }
  }

  /**
   * Déchiffrement AES-256-GCM
   */
  static decryptAES(encryptedData: string, key: string): string {
    try {
      const derivedKey = crypto
        .createHash('sha256')
        .update(key)
        .digest();

      const parts = encryptedData.split(':');
      if (parts.length !== 3) {
        throw new Error('Format de données chiffré invalide');
      }

      const iv = Buffer.from(parts[0], 'hex');
      const authTag = Buffer.from(parts[1], 'hex');
      const encrypted = parts[2];

      const decipher = crypto.createDecipheriv(
        this.ALGORITHM_AES,
        derivedKey,
        iv
      );

      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      throw new Error('Erreur déchiffrement AES: ' + (error as Error).message);
    }
  }

  /**
   * Hachage HMAC-SHA256 (intégrité + authentification)
   */
  static generateHMAC(data: string, secret: string): string {
    return crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('hex');
  }

  /**
   * Vérification HMAC
   */
  static verifyHMAC(data: string, signature: string, secret: string): boolean {
    const expectedSignature = this.generateHMAC(data, secret);
    // Comparaison temporelle sécurisée
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Génération de salt sécurisé
   */
  static generateSalt(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Hachage bcrypt-like avec PBKDF2 (pour les données sensibles)
   */
  static hashSensitiveData(data: string, salt?: string): { hash: string; salt: string } {
    const usedSalt = salt || this.generateSalt();
    
    const hash = crypto
      .pbkdf2Sync(data, usedSalt, 100000, 64, 'sha256')
      .toString('hex');

    return { hash, salt: usedSalt };
  }

  /**
   * Vérification de données hachées
   */
  static verifySensitiveData(data: string, hash: string, salt: string): boolean {
    const { hash: computedHash } = this.hashSensitiveData(data, salt);
    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(computedHash)
    );
  }

  /**
   * Génération d'un token sécurisé
   */
  static generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Chiffrement double (AES puis HMAC)
   */
  static encryptDouble(data: string, aesKey: string, hmacSecret: string): string {
    // Premier chiffrement: AES-256
    const encrypted = this.encryptAES(data, aesKey);
    
    // Deuxième sécurité: HMAC sur les données chiffrées
    const signature = this.generateHMAC(encrypted, hmacSecret);
    
    return encrypted + '||' + signature;
  }

  /**
   * Déchiffrement double avec vérification d'intégrité
   */
  static decryptDouble(encryptedData: string, aesKey: string, hmacSecret: string): string {
    const parts = encryptedData.split('||');
    if (parts.length !== 2) {
      throw new Error('Format de données chiffré double invalide');
    }

    const encrypted = parts[0];
    const signature = parts[1];

    // Vérification HMAC
    if (!this.verifyHMAC(encrypted, signature, hmacSecret)) {
      throw new Error('Signature HMAC invalide - données corrompues ou altérées');
    }

    // Déchiffrement AES
    return this.decryptAES(encrypted, aesKey);
  }
}

/**
 * Service de gestion des clés de chiffrement
 */
export class KeyManagementService {
  /**
   * Dériver une clé à partir d'une clé maître
   */
  static deriveKey(masterKey: string, salt: string, iterations: number = 100000): string {
    return crypto
      .pbkdf2Sync(masterKey, salt, iterations, 32, 'sha256')
      .toString('hex');
  }

  /**
   * Générer une paire de clés pour chiffrement hybride
   */
  static generateKeyPair() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    return { privateKey, publicKey };
  }

  /**
   * Chiffrer avec clé publique RSA
   */
  static encryptRSA(publicKey: string, data: string): string {
    const buffer = Buffer.from(data);
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      buffer
    );
    return encrypted.toString('hex');
  }

  /**
   * Déchiffrer avec clé privée RSA
   */
  static decryptRSA(privateKey: string, encryptedData: string): string {
    const buffer = Buffer.from(encryptedData, 'hex');
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      buffer
    );
    return decrypted.toString('utf8');
  }
}