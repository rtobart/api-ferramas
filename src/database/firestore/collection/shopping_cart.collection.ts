import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { ShoppingCartEntity } from '../entity/shopping_cart.entity';
import { ToolEntity } from '../entity/tool.entity';

@Injectable()
export class ShoppingCartCollection {
  constructor(
    @Inject(ShoppingCartEntity.collectionName)
    private shoppingCartCollection: CollectionReference<ShoppingCartEntity>,
    @Inject(ToolEntity.collectionName)
    private toolCollection: CollectionReference<ToolEntity>,
  ) {}
  async addShoppingCart(shoppingCart: ShoppingCartEntity): Promise<any> {
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
  async getShopingCartById2(id: string): Promise<ShoppingCartEntity> {
    try {
      const snapshot = await this.shoppingCartCollection
      .doc(id)
      .get();
  
      if (!snapshot.exists) {
        return;
      }
  
      const shoppingCart: ShoppingCartEntity = {
        _id: snapshot.id,
        ...snapshot.data(),
      };
  
      // Obtén las referencias a las herramientas
      const toolRefs = shoppingCart.l_products.map(productId => this.toolCollection.doc(productId));
  
      // Obtén los documentos de las herramientas
      const toolSnapshots = await Promise.all(toolRefs.map(ref => ref.get()));
  
      // Añade los datos de las herramientas al carrito de compras
      shoppingCart['products'] = toolSnapshots.map(snapshot => ({
        _id: snapshot.id,
        ...snapshot.data(),
      }));
  
      return shoppingCart;
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new Error('Firebase Error: ' + JSON.stringify(e.message));
    }
  }

}
