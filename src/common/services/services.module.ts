import { Global, Module } from '@nestjs/common';
import { CentralBankService } from './CentralBank.service';
import { HttpCustomService } from './httpCustom.service';
import { HttpModule } from '@nestjs/axios';
import { LoggerService } from './logger.service';
import { CipherService } from './cipher.service';
import { JwtCustomService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { WebPayService } from './webpay.service';
import { TransactionController } from 'src/module/transaction/transaction.controller';

const SERVICES = [WebPayService, CentralBankService, HttpCustomService, LoggerService, CipherService, JwtCustomService];

@Global()
@Module({
  controllers: [TransactionController],
  imports: [ HttpModule, JwtModule ],
  providers: [ ...SERVICES ],
  exports: [ ... SERVICES ]
})
export class ServicesModule {}
