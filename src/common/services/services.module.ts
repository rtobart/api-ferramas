import { Global, Module } from '@nestjs/common';
import { CentralBankService } from './CentralBank.service';
import { HttpCustomService } from './httpCustom.service';
import { HttpModule } from '@nestjs/axios';

const SERVICES = [CentralBankService, HttpCustomService];

@Global()
@Module({
  imports: [ HttpModule ],
  providers: [ ...SERVICES ],
  exports: [ ... SERVICES ]
})
export class ServicesModule {}
