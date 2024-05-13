// cipher.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CipherService {
  private readonly algorithm = 'aes-256-ctr';
  constructor(private readonly configService: ConfigService) {}
  async encrypt(data: any): Promise<string> {
    const iv = randomBytes(16);
    const password = this.configService.get<string>(
      'CIPHER_PASSWORD',
      'DefaultPassword',
    );
    const salt = this.configService.get<string>('CIPHER_SALT', 'DefaultSalt');
    const key = await this.deriveKey(password, salt);
    const cipher = createCipheriv(this.algorithm, key, iv);
    const encryptedText = Buffer.concat([
      iv,
      cipher.update(JSON.stringify(data)),
      cipher.final(),
    ]);
    return encryptedText.toString('base64');
  }

  async decrypt(encryptedText: string): Promise<any> {
    const buffer = Buffer.from(encryptedText, 'base64');
    const iv = buffer.subarray(0, 16);
    const password = this.configService.get<string>(
      'CIPHER_PASSWORD',
      'DefaultPassword',
    );
    const salt = this.configService.get<string>('CIPHER_SALT', 'DefaultSalt');
    const key = await this.deriveKey(password, salt);
    const decipher = createDecipheriv(this.algorithm, key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'base64').subarray(16)),
      decipher.final(),
    ]);
    return JSON.parse(decryptedText.toString());
  }

  private async deriveKey(password: string, salt: string): Promise<Buffer> {
    return promisify(scrypt)(password, salt, 32) as Promise<Buffer>;
  }
}
