import { Module } from '@nestjs/common';
import { ShopingCartService } from './shoping-cart.service';
import { ShopingCartController } from './shoping-cart.controller';

@Module({
  controllers: [ShopingCartController],
  providers: [ShopingCartService],
})
export class ShopingCartModule {}
