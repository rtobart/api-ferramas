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
  async createTransaction(uyOrder, sessionId, amount, returnUrl, cartId) {
    const res = await this.getCart(cartId)
    const order = {
      shoppingCart: res._id,
      user: sessionId,
      amount: amount,
      products: res.l_products,
      date: new Date(),
      status: 'pending'
    }
    const orderId = await this.orderCollection.createOrder(order)
    const tx = new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration,
      ),
    );
    try {
      const response = await tx.create(uyOrder, sessionId, amount, `${returnUrl}${orderId}/${cartId}`);
      return new CustomResponse({ code: '200', message: 'OK' }, response);
    } catch(error) {
      console.log('🚀 ~ WebPayService ~ createTransaction ~ error', error)
      return new CustomResponse({ code: '500', message: '!' });
    }

  }
  async commitTransaction(token: string) {
    const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
    const response = await tx.commit(token);
    return new CustomResponse({ code: '200', message: 'OK' }, response);
  }
  async validateTransaction(order: string, cart: string) {
    await this.scheduleOrder(order)
    await this.clearShoppingCartProducts(cart)
    return new CustomResponse({ code: '200', message: 'OK' })
  }
  async scheduleOrder(order_Id: string) {
    await this.orderCollection.updateOrderStatus(order_Id)
  }
  async clearShoppingCartProducts(id: string) {
    await this.shoppingCartCollection.clearShoppingCartProducts(id);
  }
  async getCart(id: string) {
    const cart = await this.shoppingCartCollection.getShopingCartById(id);
    return cart
  }
}
