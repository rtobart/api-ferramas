import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    port: parseInt(process.env.PORT) || 3000,
    jwt: {
      publicKey: Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString(),
      privateKey: Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64').toString(),
      expiresIn: process.env.JWT_EXPIRE_TIME|| '',
    },
    CIPHER_PASSWORD: process.env.CIPHER_PASSWORD || 'DefaultPassword',
    CIPHER_SALT: process.env.CIPHER_SALT || 'Default',
  };
});
