import crypto from 'crypto';

/**

Provides methods for hashing password with various algorithms
*/
class HashPassword {
  /*
Hashes the given text using the provided hashing algorithm
@param algorithm - The algorithm to use for hashing
@param text - The text to hash
@returns The hashed text in hexadecimal format
*/
  private hash(algorithm: string, text: string): string {
    return crypto.createHash(algorithm).update(text).digest('hex');
  }
  /**
  
  Hashes the given text using the SHA-512 algorithm
  @param text - The text to hash
  @returns The hashed text in hexadecimal format
  */
  sha512(text: string): string {
    return this.hash('sha512', text);
  }
}

export default new HashPassword();
