import { Producto } from "../../models/Producto";
import { ProductoRepositorie } from "../repositorios/ProductoRepositorie";

export class ProductoController {
    private productoRepo: ProductoRepositorie
    constructor() {
        this.productoRepo = new ProductoRepositorie();
    }

    //agregar producto
    async gregar(payload:{
        nombre: string;
        descripcion: string;
        precio: number;
        cantidad_disponible: number;
    }) {
        const producto = new Producto({
            nombre: payload.nombre,
            descripcion: payload.descripcion,
            precio: payload.precio,
            cantidad_disponible: payload.cantidad_disponible
        });
    
       const result = await this.productoRepo.agregarProducto(producto);
       console.log("Producto agregado"); 
       return result;
    }

    async obtener(){
        const result =await this.productoRepo.obtenerProductos();
        console.log("Productos obtenidos");
        console.log(result);        
        return result;
    }

    async obtenerId(id: number){
        const result =await this.productoRepo.obtenerProducto(id);
        console.log("Producto obtenido");
        console.log(result);        
        return result;
    }

    async eliminar(id: number){
        const result = await this.productoRepo.eliminarProducto(id)
        console.log("Producto eliminado");
        return result;
    }
}