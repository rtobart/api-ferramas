import { ToolEntity } from 'src/database/firestore/entity/tool.entity';
import { Tool } from '../entities/tool.entity';

export function mapTool(toolEntity: ToolEntity, dollarPrice: number): Tool {
  return {
    sku: toolEntity.s_sku,
    activo: toolEntity.b_active,
    precio: toolEntity.a_price.map((price) => ({
      actual: price.b_current,
      USD: Math.round(price.i_value / dollarPrice),
      fecha_actualizacion_precio: price.d_add_price_date,
      CLP: price.i_value,
    })),
    categoria: toolEntity.a_category,
    codigo_producto: toolEntity.s_cod_product,
    marca: toolEntity.s_brand,
    nombre: toolEntity.s_name,
    imagen: toolEntity.s_image,
    descripcion: toolEntity.s_description,
    fecha_creacion: toolEntity.d_create_date,
  };
}
