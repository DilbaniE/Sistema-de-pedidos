import { IsEmail, IsString, IsStrongPassword, Length, validate } from "class-validator";

export class ClienteDto{
    @IsString()
    @Length(1,11)
    dni: string;
    @IsString()
    @Length(1,10)
    nombre: string;
    @IsEmail()
    correo: string;
    @IsString()
    @IsStrongPassword()
    clave:string;

    constructor(body:{dni:string, nombre:string, correo:string, clave:string}){
        this.dni = body.dni;
        this.nombre = body.nombre;
        this.correo = body.correo;
        this.clave = body.clave;
    }

    async validateDto() {
        // NOTA: Retorna un arrays de errores.
        // Si no hay errores, retorna un array vacio.
        return await validate(this, {
          validationError: { target: false, value: false },
        });
      }
}