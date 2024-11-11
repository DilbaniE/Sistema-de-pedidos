import { IsNumber, IsString, Length, validate} from "class-validator";

export class ProductDto {
   @IsString()
   @Length(3,20)
   nombre: string;
   @IsString()
   descripcion: string;
   @IsNumber()
   precio: number;
   @IsNumber()
   cantidad_disponible: number;

   constructor(payload: {nombre: string; descripcion: string, precio: number; cantidad_disponible: number}){
        this.nombre = payload.nombre,
        this.descripcion = payload.descripcion,
        this.precio = payload.precio,
        this.cantidad_disponible = payload.cantidad_disponible
   }

   async validadorDto(){
    //retorna un array de errores, Si no errores retorna un array vacio
    return await validate(this, {
        validationError: { target: false, value: false },
      });
   }
}

export class ActualizarDto extends ProductDto{
    @IsNumber()
    id: number;
 constructor(payload: {id: number; nombre: string; descripcion: string, precio: number; cantidad_disponible: number}){
    super(payload);
    this.id = payload.id
 }
}