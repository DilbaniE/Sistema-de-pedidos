
import {QueryResult, ResultSetHeader } from "mysql2";
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
            const producto = new Producto(payload)
            if (producto.nombre === undefined) {
                return {ok: false, message: "El nombre del producto es obligatorio"}
            }
           const result = await this.productoRepo.agregarProducto(producto);
           if (result.affectedRows == 1) {
                return{ok: true, id: result.insertId}
           }else{
                return{ok: false, message: "no se agrego"}
            }           
        } catch (error: any) {
            console.log("ha ocurrido un error al guardar");
            throw error;
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
            const resultado = await this.productoRepo.actualizarProducto(producto);
            if (resultado.affectedRows ===1) {
                return {ok: true, id: resultado.insertId, message: "producto actualizado"}
            }else{
                return {ok: false, message: "no se puedo actualizar"}
            }
             
        } catch (error) {
            console.log("ha ocurrido un error al actualizar");
            throw error;
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
                return result[0] 
            }else{
                return null
            }   
        } catch (error) {
            console.log("A ocurrido un error al consular producto");
            throw error;
        }
       
    }

    async eliminar(id: number){
        const resultado: ResultSetHeader = await this.productoRepo.eliminarProducto(id);
        if (resultado.affectedRows == 1) {
            console.log(`Producto eliminado`);
            return {ok: true, message: "producto eliminado"};
        } else {
            return {ok:false, message: "PRODUCTO NO ELIMINADO"};
        }
    }
        
        
}