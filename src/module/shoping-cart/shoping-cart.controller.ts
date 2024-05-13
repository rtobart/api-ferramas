import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { ShopingCartService } from './shoping-cart.service';
import { CryptoInterceptor } from 'src/common/interceptor/crypto.interceptor';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@Controller('shoping-cart')
@UseGuards(JwtAuthGuard)
// @UseInterceptors(CryptoInterceptor)
export class ShopingCartController {
  constructor(private readonly shopingCartService: ShopingCartService) {}
}
