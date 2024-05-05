import { Module } from '@nestjs/common';
import { CentralBankService } from './CentralBank.service';
import { HttpCustomService } from './httpCustom.service';
import { HttpModule } from '@nestjs/axios';

const SERVICES = [CentralBankService, HttpCustomService];

@Module({
  imports: [ HttpModule ],
  providers: [ ...SERVICES ],
  exports: [ ... SERVICES ]
})
export class ServicesModule {}
