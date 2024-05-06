import { Controller } from '@nestjs/common';
import { ShopingCartService } from './shoping-cart.service';

@Controller('shoping-cart')
export class ShopingCartController {
  constructor(private readonly shopingCartService: ShopingCartService) {}
}
