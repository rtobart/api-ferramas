import { MetaDocument } from '../collection/meta/meta.collection,';

export class UserEntity extends MetaDocument {
  public static readonly collectionName = 'CT_USER';
  h_password: string;
  s_mail: string;
  s_shoping_cart: string;
}
