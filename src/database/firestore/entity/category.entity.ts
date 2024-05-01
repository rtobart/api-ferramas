import { MetaDocument } from '../collection/meta/meta.collection,';

export class CategoryEntity extends MetaDocument {
  public static readonly collectionName = 'CM_CATEGORY';
  c_name: string;
}
