import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("customer")
export class ClienteEntity{
    @PrimaryColumn()
    dni: string;
    @Column()
    nombre: string;
    @Column()
    clave: string;
    @Column()
    correo: string;

    constructor(cliente: {dni: string, nombre: string, clave: string, correo: string}){
        this.dni = cliente?.dni;
        this.nombre = cliente?.nombre;
        this.clave = cliente?.clave;
        this.correo = cliente?.correo;
    }

}