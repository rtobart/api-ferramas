import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { ToolEntity } from '../entity/tool.entity';

@Injectable()
export class ToolCollection {
  constructor(
    @Inject(ToolEntity.collectionName)
    private toolEntity: CollectionReference<ToolEntity>,
  ) {}
  async getTools2(){
    return this.toolEntity
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.debug(`Tools - not found`);
          return;
        }
        return snapshot.docs.map((doc) => {
          return {
            _id: doc.id,
            ...doc.data(),
          };
        });
      })
      .catch((e) => {
        console.error('Firebase Error: ' + JSON.stringify(e.message));
        return new Error('Firebase Error: ' + JSON.stringify(e.message));
      });
  }
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
}
