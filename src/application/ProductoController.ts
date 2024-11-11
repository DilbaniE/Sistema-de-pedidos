
import {QueryResult, ResultSetHeader } from "mysql2";
import { ProductoRepositorie } from "../infrastructure/repositorios/ProductoRepositorie";
import { Producto } from "../models/Producto";
import { ActualizarDto, ProductDto } from "../dto/productDto";
import { error } from "console";


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
            // validar el producto
            const dto = new ProductDto(payload);
            const errores = await dto.validadorDto();
            if (errores.length > 0) {
                return {ok:false, message: "El request tiene errores"}
            }
             // crear el producto
            const producto = new Producto(payload)
            if (producto.nombre === undefined) {
                return {ok: false, message: "El nombre del producto es obligatorio", error: errores}
            }
            //mguardar el producto
           const result = await this.productoRepo.agregarProducto(producto);
           //Manejando respuesta controllador
           if (result.affectedRows == 1) {
                return{ok: true, id: result.insertId}
           }else{
                return{ok: false, message: "no se agrego"}
            }           
        } catch (error: any) {
            throw {ok: false, message: "Ha ocurrido un error", error};
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
            const dto = new ActualizarDto(payload);
            const errores = await dto.validadorDto();
            if (errores.length > 0) {
                return {ok:false, message: "El request tiene errores"}
            }
            const producto = new Producto(payload);
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

    async actualizarCantidad(payload: { id: number; cantidad_disponible: number }) {
        try {
          if (!payload.id || !payload.cantidad_disponible) {
            return { ok: false, message: "Id y cantidad disponible son obligatorios." };
          }
          if (Number.isNaN(+payload.id) || Number.isNaN(+payload.cantidad_disponible)) {
            return { ok: false, message: "Id y cantidad deben ser números." };
          }
          const resultado = await this.productoRepo.modificarCantidadProducto(
            payload.id,
            payload.cantidad_disponible
          );
          if (resultado.affectedRows === 1) {
            return { ok: true, message: "Cantidad actualizada" };
          } else {
            return { ok: false, message: "No se pudo actualizar la cantidad" };
          }
        } catch (error) {
          throw { ok: false, message: "Ha ocurrido un error inesperado", error };
        }
      }
    

      async obtener() {
        try {
          const resultado = await this.productoRepo.obtenerProductos();
          if (resultado.length == 0) { 
            return { ok: true, message: "No hay productos" };
          } else {
            return { ok: true, info: resultado };
          }
        } catch (error) {
          throw { ok: false, message: "Ha ocurrido un error inesperado", error };
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