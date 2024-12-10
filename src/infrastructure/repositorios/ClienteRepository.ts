import { Repository } from "typeorm";
import { ClienteEntity } from "../entities/ClienteEntity";
import { AppDataSource } from "./DataSourceOrm";

export class ClienteRepository{
    repository: Repository<ClienteEntity>;
    constructor(){
        this.repository = AppDataSource.getRepository(ClienteEntity);
    }

    agregar(cliente:any){
        return this.repository.save(cliente);
    }

    actualizar(cliente:ClienteEntity){
        return this.repository.update({dni: cliente.dni}, cliente);
    }
    consultar(){
        return this.repository.find();
    }

    obtenerPorId(id: string) {
        // SELECT dni, correo, nombre FROM CLIENTES WHERE dni=id
        return this.repository.findOne({
          select: {
            dni: true,
            correo: true,
            nombre: true
          },
          where: {
            dni: id
          }
        })
    }
}