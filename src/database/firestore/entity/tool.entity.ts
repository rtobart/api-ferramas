import { MetaDocument } from '../collection/meta/meta.collection,';

export class ToolEntity extends MetaDocument {
  public static readonly collectionName = 'CT_TOOL';
  s_sku: string;
  b_active: boolean;
  a_price: Price[];
  s_cod_product: string;
  s_brand: string;
  s_name: string;
  s_image: string;
  s_description: string;
  d_create_date: string;
  a_category: string[];
}

class Price {
  b_current: boolean;
  d_add_price_date: string;
  i_value: number;
}
