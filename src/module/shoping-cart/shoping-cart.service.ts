import { Injectable } from '@nestjs/common';
import { ShoppingCartCollection } from 'src/database/firestore/collection/shopping_cart.collection';
import { CreateShoppingCartDTO } from './dto/create.dto';
import { CustomResponse } from 'src/common/response/response.map';

@Injectable()
export class ShopingCartService {
  constructor(private readonly shopingCartService: ShoppingCartCollection) {}
  async create(createShoppingCartDTO: CreateShoppingCartDTO) {
    const id = await this.shopingCartService.addShoppingCart(createShoppingCartDTO);
    return new CustomResponse({ code: '200', message: 'OK' }, id);
  }
}
