import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { ShoppingCartEntity } from '../entity/shopping_cart.entity';

@Injectable()
export class ShoppingCartCollection {
  constructor(
    @Inject(ShoppingCartEntity.collectionName)
    private shoppingCartCollection: CollectionReference<ShoppingCartEntity>,
  ) {}
  async addShoppingCart(shoppingCart: ShoppingCartEntity): Promise<string> {
    try {
      const docRef = await this.shoppingCartCollection.add(shoppingCart);
      return docRef.id;
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new Error('Firebase Error: ' + JSON.stringify(e.message));
    }
  }
  async getShopingCartById(id: string): Promise<ShoppingCartEntity> {
    try {
      const snapshot = await this.shoppingCartCollection
      .doc(id)
      .get();

      if (!snapshot.exists) {
        return;
      }
      return {
        _id: snapshot.id,
        ...snapshot.data(),
      };
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new Error('Firebase Error: ' + JSON.stringify(e.message));
    }
  }

}
