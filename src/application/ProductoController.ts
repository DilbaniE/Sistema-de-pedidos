import { ProductoRepositorie } from "../infrastructure/repositorios/ProductoRepositorie";
import { Producto } from "../models/Producto";


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
        try {
            const producto = new Producto({
                //payload informacion que se ingresa por la terminal
                nombre: payload.nombre,
                descripcion: payload.descripcion,
                precio: payload.precio,
                cantidad_disponible: payload.cantidad_disponible
            });
        
           const result = await this.productoRepo.agregarProducto(producto);
           if (result.affectedRows == 1) {
                console.log("producto agregado")
           }else{
                console.log("no se agrego producto");
           }
           console.log("Producto agregado"); 
           return result;            
        } catch (error) {
            console.log("ha ocurrido un error al guardar");
            return error;
        }
       
    }

    async actualizar(payload:{
        id: number;
        nombre: string;
        descripcion: string;
        precio: number;
        cantidad_disponible: number;
    }){
        try {
            const producto = new Producto({
                id: payload.id,
                nombre:payload.nombre,
                descripcion: payload.descripcion,
                precio: payload.precio,
                cantidad_disponible: payload.cantidad_disponible
            });
            const result = await this.productoRepo.actualizarProducto(producto);
            if (result.affectedRows ===1) {
                console.log("Producto actualizado");
            }else{
                console.log("No se pudo actualizar");
            }
            return result;
        } catch (error) {
            console.log("ha ocurrido un error al actualizar");
            return error;
        }
    }

    // async actualizarCantidad(payload: { id: number; cantidad_disponible: number }) {
    //     try {
    //       const resultado = await this.productoRepo.actualizarCantidadProduct(
    //         payload.id,
    //         payload.cantidad_disponible
    //       );
    //       if (resultado.affectedRows === 1) {
    //         console.log("Cantidad actualizada");
    //       } else {
    //         console.log("No se pudo actualizar la cantidad");
    //       }
    //       return resultado;
    //     } catch (error) {
    //       console.log("Ha ocurrido un error actualizando la cantidad.");
    //       return error;
    //     }
    // }
    

    async obtener(){
        try {
            const result =await this.productoRepo.obtenerProductos();     
            return result;
        } catch (error) {
            //TODO: Logger del error
            throw error;
        }
        
    }

    async obtenerId(id: number){
        try {
            const result =await this.productoRepo.obtenerProducto(id);
            if (result.length == 1) {
                console.log("Producto obtenido");
                console.log(result);  
            }else{
                console.log("no se encontro producto");
            }   
            return result;
        } catch (error) {
            console.log("A ocurrido un error al consular producto");
            return error;
        }
       
    }

    async eliminar(id: number){
        try {
            const result = await this.productoRepo.eliminarProducto(id)
            console.log("Producto eliminado");
            return result;
        } catch (error) {
            console.log("Error al eliminar producto");
            return error 
        }
        
    }
}