import { ClienteDto } from "../dto/clienteDto";
import { ClienteEntity } from "../infrastructure/entities/ClienteEntity";
import { ClienteRepository } from "../infrastructure/repositorios/ClienteRepository";
import { BcryptService } from 

export class ClienteController{
    private repository: ClienteRepository;

    constructor(){
        this.repository = new ClienteRepository();
    }

    private async validarBody(body: { dni: string; nombre: string; clave: string; correo: string }) {
      const dto = new ClienteDto(body);
      const errores = await dto.validateDto();
      if (errores.length > 0) {
        return { ok: false, message: "El request tiene errores", error: errores };
      }
      return { ok: true }
  
    }
  

    async agregar(body: { dni: string; nombre: string; clave: string; correo: string }) {
      try {
        const validBody = await this.validarBody(body)
        if (!validBody.ok) { return validBody }// validBody.ok === false
  
        // Verificar si existe antes el registro antes de guardar en base de datos
        const existClient = await this.obtenerPorId(body.dni)
        if (existClient.ok === true) {
          return { ok: false, message: 'El cliente ya existe' }
        }
  
        const entity = new ClienteEntity(body)
        // Hash de la contraseña
        entity.clave = await BcryptService.hashPassword(entity.clave)
        const resultado = await this.repository.agregar(entity);
        if (resultado) {
          //  eliminar la propiedad clave del json resultado
          // delete resultado.correo // Si estan en javascript
          return {
            ok: true, info: {
              dni: resultado.dni,
              correo: resultado.correo,
              nombre: resultado.nombre
            }
          };
        } else {
          return { ok: false, message: "El cliente no se ha agregado correctamente" };
        }
      } catch (error: any) {
        throw { ok: false, message: "Ha ocurrido un error inesperado", error };
      }
    }
  
    async obtenerPorId(id: string) {
      try {
        const resultado = await this.repository.obtenerPorId(id)
        if (resultado !== null) {
          return { ok: true, info: resultado };
        } else {
          return { ok: false, message: "No hay cliente" };
        }
      } catch (error) {
        throw { ok: false, message: "Ha ocurrido un error inesperado", error };
      }
    }
    // async agregar(body: { dni: string; nombre: string, clave: string; correo: string }) {
    //     try {
    //       const cliente = new ClienteEntity(body);
    //       const result = await this.repository.agregar(cliente);
    //       if (result) {
    //         return { ok: true, info: result};
    //       }else{
    //         return {ok: false, message: "El cliente no se agrego"}
    //       }
    //     } catch (error: any) {
    //       throw { ok: false, message: "Ha ocurrido un error inesperado", error };
    //     }
    // }

    async actualizar(body: { dni:string; nombre:string;  clave:string; correo:string }) {
        try {
          const cliente = new ClienteEntity(body);
          const result = await this.repository.actualizar(cliente);
          if (result) {
            return { ok: true, info:result};
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
}