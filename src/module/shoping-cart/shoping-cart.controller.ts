import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ShopingCartService } from './shoping-cart.service';
import { CryptoInterceptor } from 'src/common/interceptor/crypto.interceptor';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { CreateShoppingCartDTO } from './dto/create.dto';

@Controller('shoping-cart')
@UseGuards(JwtAuthGuard)
@UseInterceptors(CryptoInterceptor)
export class ShopingCartController {
  constructor(private readonly shopingCartService: ShopingCartService) {}
  @Post()
  createToken(@Body() createShoppingCartDTO: CreateShoppingCartDTO) {
    return this.shopingCartService.create(createShoppingCartDTO);
  }
}
