import { Categoria } from "../../models/Categoria";
import {  ResultSetHeader } from "mysql2";
import { CatetegoriaRepository } from "../repositorios/CategoriaRepositorie";

export class CategoriaController{
    private repository: CatetegoriaRepository;

    constructor(){
        this.repository = new CatetegoriaRepository();
    }

    async agregar(payload: {
        nombre: string;
        descripcion: string;
        id: string;
      }) {
        try {
          const categoria = new Categoria({
            id: payload.id,
            nombre: payload.nombre,
            descripcion: payload.descripcion,
          });
          const resultado = await this.repository.agregar(categoria);
          if (resultado.affectedRows == 1) {
            console.log(`Categoría agregada con el id: ${resultado.insertId}`);
          } else {
            console.log("La categoría no se agrego");
          }
          return resultado;
        } catch (error: any) {
          console.log("Ha ocurrido un error al guardar.", error?.message);
          return error;
        }
    }

    async actualizar(payload: {
        id: string;
        nombre: string;
        descripcion: string;
      }) {
        try {
          const categoria = new Categoria({
            id: payload.id,
            nombre: payload.nombre,
            descripcion: payload.descripcion,
          });
          const resultado = await this.repository.modificar(categoria);
          if (resultado.affectedRows === 1) {
            console.log("Categoría actualizada");
          } else {
            console.log("No se pudo actualizar la categoría");
          }
          return resultado;
        } catch (error) {
          console.log("Ha ocurrido un error actualizando");
          return error;
        }
    }

    async obtener() {
        try {
          const resultado = await this.repository.obtener();
          console.log("Categorías");
          console.log(resultado);
          return resultado;
        } catch (error) {
          console.log("Ha ocurrido un error al consultando.");
          return error;
        }
    }

    async obtenerPorId(id: string) {
        try {
          const resultado = await this.repository.obtenerUno(id);
          if (resultado.length == 1) {
            console.log("Categoría consultada");
            console.log(resultado[0]);
          } else {
            console.log("No se encontro la categoría");
          }
          return resultado;
        } catch (error) {
          console.log("Ha ocurrido un error al consultando.");
          return error;
        }
    }

    eliminar(id: string) {
        this.repository
          .eliminar(id)
          .then((resultado: ResultSetHeader) => {
            if (resultado.affectedRows == 1) {
              console.log(`Categoría eliminada`);
            } else {
              console.log("No se pudo eliminar la categoría");
            }
          })
          .catch((error) => {
            console.log("Ha ocurrido un error eliminando.");
            console.log(error);
          });
    }
}