import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ShopingCartService } from './shoping-cart.service';
import { CryptoInterceptor } from 'src/common/interceptor/crypto.interceptor';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { CreateShoppingCartDTO } from './dto/create.dto';

@Controller('shoping-cart')
// @UseGuards(JwtAuthGuard)
// @UseInterceptors(CryptoInterceptor)
export class ShopingCartController {
  constructor(private readonly shopingCartService: ShopingCartService) {}
  @Post()
  addShoppingCart(@Body() createShopping :{products: string[], user: string}) {
    return this.shopingCartService.addShoppingCart(createShopping);
  }
  @Get(':id')
  findById(
    @Param('id') id: string,
  ) {
    return this.shopingCartService.findId(id);
  }
  @Get('/mail/:mail')
  findByMail(
    @Param('mail') mail: string,
  ) {
    return this.shopingCartService.findByMail(mail);
  }
  @Post('add')
  addToShoppingCart(@Body() item: {mail: string, tools: string[]} ) {
    return this.shopingCartService.addToShoppingCart(item);
  }
}
