import { WebpayPlus } from 'transbank-sdk'; // ES6 Modules
import {
  Options,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes,
} from 'transbank-sdk'; // ES6 Modules

import { Injectable } from '@nestjs/common';
import { HttpCustomService } from '../../common/services/httpCustom.service';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { ObjetoMoneda } from '../../common/interfaces/money.interface';
import { CustomResponse } from '../response/response.map';
import { ShoppingCartCollection } from 'src/database/firestore/collection/shopping_cart.collection';
import { OrderCollection } from 'src/database/firestore/collection/order.collection';

@Injectable()
export class WebPayService {
  URL: string = 'https://webpay3gint.transbank.cl';
  constructor(
    private httpService: HttpCustomService,
    private readonly configService: ConfigService,
    private readonly shoppingCartCollection: ShoppingCartCollection,
    private readonly orderCollection: OrderCollection,
  ) {}
  async onModuleInit() {
    const res = await this.getCart('I8zT7Q4xXW1oLtaThgPC')
    console.log('🚀 ~ WebPayService ~ onModuleInit ~ res:', res)
  }
  async createTransaction(uyOrder, sessionId, amount, returnUrl, cartId) {
    const res = await this.getCart('I8zT7Q4xXW1oLtaThgPC')
    const orderId = await this.orderCollection.createOrder(res)
    const tx = new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration,
      ),
    );
    const response = await tx.create(uyOrder, sessionId, amount, returnUrl);
    return new CustomResponse({ code: '200', message: 'OK' }, response);
  }
  async getCart(id: string) {
    const cart = await this.shoppingCartCollection.getShopingCartById(id);
    return cart
  }
  // async empntyCart(id:string){
  //   await this.shoppingCartCollection.addToShoppingCart(id)
  // }
}
