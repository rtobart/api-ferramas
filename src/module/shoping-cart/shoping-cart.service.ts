import { Injectable } from '@nestjs/common';
import { ShoppingCartCollection } from 'src/database/firestore/collection/shopping_cart.collection';
import { CreateShoppingCartDTO } from './dto/create.dto';
import { CustomResponse } from 'src/common/response/response.map';
import { mapTool } from '../tool/map/tool.map';
import { CentralBankService } from 'src/common/services/CentralBank.service';
import { StockCollection } from 'src/database/firestore/collection/stock.collection';
import { ToolCollection } from 'src/database/firestore/collection/tool.collection';

@Injectable()
export class ShopingCartService {
  constructor(
    private readonly shoppingCartCollection: ShoppingCartCollection,
    private readonly centralBankService: CentralBankService,
    private readonly stockCollection: StockCollection,
    private readonly toolCollection: ToolCollection,
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
  async addToShoppingCart(item: {mail: string, tools: string[]}) {
    try {
      const shoppingCart = await this.shoppingCartCollection.getByMail(item.mail);
      shoppingCart.l_products = item.tools;
      await this.shoppingCartCollection.addToShoppingCart(shoppingCart);
      return new CustomResponse({ code: '200', message: 'OK' }, {shoppingCartId: shoppingCart._id});
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new Error('Firebase Error: ' + JSON.stringify(e.message));
    }
  }
  async findId(id: string) {
    const stocks = await this.stockCollection.getStocks();
    const dollarData = await this.centralBankService.getTodayDollarData();
    const todayDollarRate = parseInt(dollarData.Dolares[0].Valor);
    const shoppingCart = await this.shoppingCartCollection.getShopingCartById2(id);
    const products = await this.toolCollection.getTools();
    const data = shoppingCart['l_products'].map((product_id) => {
      const product = products.find((element) => element.s_sku === product_id);
      return mapTool(product, todayDollarRate, stocks);
    });
    return new CustomResponse({ code: '200', message: 'OK' }, data);
  }
  async findByMail(mail: string) {
    const shoppingCart = await this.shoppingCartCollection.getByMail(mail);
    return new CustomResponse({ code: '200', message: 'OK' }, shoppingCart);
  }
}
