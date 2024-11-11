import { IsNumber, IsString, Length, validate } from "class-validator";

export class CategoriaDto {
  @IsString()
  @Length(1, 10)
  id: string;

  @IsString()
  @Length(1, 10)
  nombre: string;

  @IsString()
  descripcion: string;

  constructor(body: { nombre: string; descripcion: string; id: string }) {
    this.nombre = body.nombre;
    this.descripcion = body.descripcion;
    this.id = body.id;
  }

  async validateDto() {
    // NOTA: Retorna un arrays de errores.
    // Si no hay errores, retorna un array vacio.
    return await validate(this, {
      validationError: { target: false, value: false },
    });
  }
}