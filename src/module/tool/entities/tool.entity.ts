export class Tool {
    sku: string;
    activo: boolean;
    precio: Precio[];
    categoria: string[];
    codigo_producto: string;
    marca: string;
    nombre: string;
    imagen: string;
    descripcion: string;
    fecha_creacion: string;
    stock: number;
  }
  
  class Precio {
    actual: boolean;
    fecha_actualizacion_precio: string;
    CLP: number;
    USD: number;
  }
  