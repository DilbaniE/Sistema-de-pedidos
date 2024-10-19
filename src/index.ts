import * as readline from "readline"
import { ProductoController } from "./infrastructure/controllers/ProductoController";

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const leerDatos =(mensaje: string): Promise<string> =>
new  Promise((resolve) => rl.question(mensaje, (respuesta: string) => resolve(respuesta)))

const main = async () =>{

    const menu = ` 
    1. Listar productos
    2. Agregar productos
    3. Editar producto
    4. Eliminar producto
    5. Consultar producto
    0. salir `;

    let _opcion = await leerDatos(menu)
    let opcion = Number(_opcion)

    const productCtrl = new ProductoController();

    while(opcion !== 0){
        switch (opcion) {
            case 1:
                await productCtrl.obtener()
                break;
            case 2:
                const nombre = await leerDatos("Ingrese el nombre del producto")
                const descripcion = await leerDatos("Ingrese descripcion del producto")
                const _precio = await leerDatos("Ingrese el precio del producto")
                const precio = Number(_precio)
                const cantidad = await leerDatos("Ingrese la cantidad disponible")
                const _cantidad = Number(cantidad)
                //Json manera corta
                await productCtrl.gregar({
                    nombre,
                    descripcion,
                    precio,//se puede realizar abreviacion 
                    cantidad_disponible: _cantidad
                })
                break;
            case 3:
                await productCtrl.obtener
                break; 
            case 4:
                const eliminar = await leerDatos("Ingrese el ID a eliminar")
                const  _eliminar = Number(eliminar)
                await productCtrl.eliminar(_eliminar)
                break;
            case 5:
                const _id = await leerDatos("Ingresar el id a consultar");
                const id = Number(_id);
                await productCtrl.obtenerId(id)
                break;       
            default:
                console.log("Opcion no valida");                
                break;
        }
         _opcion = await leerDatos(menu);
         opcion = Number(_opcion);

    }
   
   rl.close();     
}
main();