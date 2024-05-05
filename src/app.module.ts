import { Module } from '@nestjs/common';
import { FirestoreModule } from './database/firestore/firestore.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { googleServiceAccount } from './common/util/serviceAccount.map';
import { ToolModule } from './module/tool/tool.module';
import { AuthModule } from './module/auth/auth.module';
import { ServicesModule } from './common/services/services.module';
import config from './common/env/config.env';
import * as Joi from 'joi';


@Module({
  imports: [
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const base64ServiceAccount = configService.get<string>('FIRESTORE_S_A');
        const serviceAccount = googleServiceAccount(base64ServiceAccount)
        return ({
          ignoreUndefinedProperties: true,
          credentials: {
            client_email: serviceAccount.client_email,
            private_key: Buffer.from(serviceAccount.private_key).toString('base64'),
          },
          projectId: serviceAccount.project_id,
        })
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'staging', 'production'),
        TIME_OUT: Joi.number().default(60000),
      }),
    }),
    ServicesModule,
    ToolModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
