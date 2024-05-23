import { MetaDocument } from '../collection/meta/meta.collection,';

export class StockEntity extends MetaDocument {
  public static readonly collectionName = 'CT_STOCK';
  c_tool: string;
  n_value: number;
}
