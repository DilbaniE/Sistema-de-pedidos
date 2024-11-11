import { Categoria } from "../models/Categoria";
import {  ResultSetHeader } from "mysql2";
import { CatetegoriaRepository } from "../infrastructure/repositorios/CategoriaRepositorie";
import { CategoriaDto } from "../dto/categoriaDto";

export class CategoriaController{
    private repository: CatetegoriaRepository;

    constructor(){
        this.repository = new CatetegoriaRepository();
    }

    async agregar(body: { nombre: string; descripcion: string; id: string }) {
      try {
        const dto = new CategoriaDto(body);
        const errores = await dto.validateDto();
        if (errores.length > 0) {
          return { ok: false, message: "El request tiene errores", error: errores };
        }
  
        const categoria = new Categoria(body);
        const resultado = await this.repository.agregar(categoria);
        if (resultado.affectedRows == 1) {
          return { ok: true, id: resultado.insertId };
        } else {
          return { ok: false, message: "La categoría no se agrego" };
        }
      } catch (error: any) {
        throw { ok: false, message: "Ha ocurrido un error inesperado", error };
      }
    }
  
    async actualizar(body: { id: string; nombre: string; descripcion: string }) {
      try {
        const dto = new CategoriaDto(body);
        const errores = await dto.validateDto();
        if (errores.length > 0) {
          return { ok: false, message: "El request tiene errores", error: errores };
        }
        const categoria = new Categoria(body);
        const resultado = await this.repository.modificar(categoria);
        if (resultado.affectedRows === 1) {
          return { ok: true, message: "Categoría actualizada" };
        } else {
          return { ok: false, message: "No se pudo actualizar la categoría" };
        }
      } catch (error) {
        throw { ok: false, message: "Ha ocurrido un error inesperado", error };
      }
    }
  
    async obtener() {
      try {
        const resultado = await this.repository.obtener();
        if (resultado.length == 0) {
          return { ok: true, message: "No hay categorías" };
        } else {
          return { ok: true, info: resultado };
        }
      } catch (error) {
        throw { ok: false, message: "Ha ocurrido un error inesperado", error };
      }
    }
  
    async obtenerPorId(id: string) {
      try {
        if (!id) {
          return { ok: false, message: "Id es obligtorio ." };
        }
        const resultado = await this.repository.obtenerUno(id);
        if (resultado.length == 1) {
          return { ok: true, info: resultado[0] };
        } else {
          return { ok: false, message: "No se encontro la categoría" };
        }
      } catch (error) {
        throw { ok: false, message: "Ha ocurrido un error inesperado", error };
      }
    }
  
    async eliminar(id: string) {
      try {
        if (!id) {
          return { ok: false, message: "Id es obligtorio ." };
        }
  
        const resultado = await this.repository.eliminar(id);
        if (resultado.affectedRows == 1) {
          return { ok: true, message: "Categoría eliminada" };
        } else {
          return { ok: false, message: "No se pudo eliminar la categoría" };
        }
      } catch (error) {
        throw { ok: false, message: "Ha ocurrido un error inesperado", error };
      }
    }
}