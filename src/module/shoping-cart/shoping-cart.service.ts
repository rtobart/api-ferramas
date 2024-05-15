import { Injectable } from '@nestjs/common';
import { ShoppingCartCollection } from 'src/database/firestore/collection/shopping_cart.collection';
import { CreateShoppingCartDTO } from './dto/create.dto';
import { CustomResponse } from 'src/common/response/response.map';
import { mapTool } from '../tool/map/tool.map';
import { CentralBankService } from 'src/common/services/CentralBank.service';

@Injectable()
export class ShopingCartService {
  constructor(
    private readonly shoppingCartCollection: ShoppingCartCollection,
    private readonly centralBankService: CentralBankService,
  ) {}
  async addShoppingCart(shoppingCart: {products: string[], user: string}) {
    const cart = {
      l_products: shoppingCart.products,
      s_user_mail: shoppingCart.user
    }
    try {
      const docRef = await this.shoppingCartCollection.addShoppingCart(cart);
      return new CustomResponse({ code: '200', message: 'OK' }, {shoppingCartId: docRef});
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new Error('Firebase Error: ' + JSON.stringify(e.message));
    }
  }
  async findId(id: string) {
    const dollarData = await this.centralBankService.getTodayDollarData();
    const todayDollarRate = parseInt(dollarData.Dolares[0].Valor);
    const data = ((await this.shoppingCartCollection.getShopingCartById2(id))['products']).map((element) => {
      return mapTool(element,todayDollarRate);
    });
    return new CustomResponse({ code: '200', message: 'OK' }, data);
  }
}
