import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { CategoryEntity } from '../entity/category.entity';

@Injectable()
export class CategoryCollection {
  constructor(
    @Inject(CategoryEntity.collectionName)
    private categoryEntity: CollectionReference<CategoryEntity>,
  ) {}
  async getCategories() {
    try {
      const snapshot = await this.categoryEntity
      .get();

      if (snapshot.empty) {
        return;
      }

      return snapshot.docs.map((element) => {
        const data: CategoryEntity = {
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
