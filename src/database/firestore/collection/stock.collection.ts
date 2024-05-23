import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { StockEntity } from '../entity/stock.entity';

@Injectable()
export class StockCollection {
  constructor(
    @Inject(StockEntity.collectionName)
    private stockEntity: CollectionReference<StockEntity>,
  ) {}
  async getStocks() {
    try {
      const snapshot = await this.stockEntity
      .get();

      if (snapshot.empty) {
        return;
      }

      return snapshot.docs.map((element) => {
        const data: StockEntity = {
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
  async getStockByTool(tool: string) {
    try {
      const snapshot = await this.stockEntity
      .where('c_tool', '==', tool)
      .get();

      if (snapshot.empty) {
        return;
      }

      return snapshot.docs.map((element) => {
        const data: StockEntity = {
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
