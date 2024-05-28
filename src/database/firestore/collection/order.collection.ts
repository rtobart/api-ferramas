import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { StockEntity } from '../entity/stock.entity';
import { OrderEntity } from '../entity/order.entity';

@Injectable()
export class OrderCollection {
  constructor(
    @Inject(OrderEntity.collectionName)
    private orderEntity: CollectionReference<StockEntity>,
  ) {}
  async createOrder(order) {
    try {
      const snapshot = await this.orderEntity.add(order);
      return snapshot.id;
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new Error('Firebase Error: ' + JSON.stringify(e.message));
    }
  }
  async updateOrderStatus(orderId: string) {
    try {
      const orderRef = this.orderEntity.doc(orderId);
      await orderRef.update({ status: 'done' });
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new Error('Firebase Error: ' + JSON.stringify(e.message));
    }
  }
  async getStocks() {
    try {
      const snapshot = await this.orderEntity
      .get();

      if (snapshot.empty) {
        return;
      }

      return snapshot.docs.map((element) => {
        const data: OrderEntity = {
          _id: element.id,
          ...element.data(),
        };
        return data;
      });
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new Error('Firebase Error: ' + JSON.stringify(e.message));
    }
  }
}
