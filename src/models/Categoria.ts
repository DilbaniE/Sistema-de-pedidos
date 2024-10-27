export class Categoria {
    id: string; 
    nombre: string;
    descripcion: string;
  
    constructor(infoProducto: {
      id: string;
      nombre: string;
      descripcion: string;
    }) {
      this.id = infoProducto.id;
      this.nombre = infoProducto.nombre;
      this.descripcion = infoProducto.descripcion;
    }
  }