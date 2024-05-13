import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { ToolEntity } from '../entity/tool.entity';

@Injectable()
export class ToolCollection {
  constructor(
    @Inject(ToolEntity.collectionName)
    private toolEntity: CollectionReference<ToolEntity>,
  ) {}
  async getTools() {
    try {
      const snapshot = await this.toolEntity
      .get();

      if (snapshot.empty) {
        return;
      }

      return snapshot.docs.map((element) => {
        const data: ToolEntity = {
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
  async getByName(name: string){
    try {
      const snapshot = await this.toolEntity
      .where('s_name', '>=', name.toUpperCase())
      .where('s_name', '<=', name.toUpperCase() + '\uf8ff')
      .get();

      if (snapshot.empty) {
        throw new HttpException('NOT FOUND', 404);
      }

      return snapshot.docs.map((element) => {
        const data: ToolEntity = {
          _id: element.id,
          ...element.data(),
        };
        return data;
      });
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new HttpException('NOT FOUND', 404);
    }
  }
  async getByCategory(category: string){
    try {
      const snapshot = await this.toolEntity
      .where('a_category', 'array-contains', category)
      .get();

      if (snapshot.empty) {
        throw new HttpException('NOT FOUND', 404);
      }

      return snapshot.docs.map((element) => {
        const data: ToolEntity = {
          _id: element.id,
          ...element.data(),
        };
        return data;
      });
    } catch (e: any) {
      console.error(JSON.stringify(e));
      throw new HttpException('NOT FOUND', 404);
    }
  }
}
