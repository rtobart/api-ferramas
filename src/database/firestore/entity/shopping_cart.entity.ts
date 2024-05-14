import { MetaDocument } from '../collection/meta/meta.collection,';

export class ShoppingCartEntity extends MetaDocument {
  public static readonly collectionName = 'CT_SHOPING_CART';
  l_products: string[];
  s_user_mail: string;
}
