import { ProductoController } from "../controllers/ProductoController";
import { leerDatos, rl } from "./input";


export const mainProduct = async () =>{
    const menu = ` 
    1. Listar productos
    2. Agregar productos
    3. Editar producto
    4. Eliminar producto
    5. Consultar producto
    6. Editar cantidad producto
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
                const _idActualizar = await leerDatos("Ingrese el id del producto a edditar")
                const nombreActualizar = await leerDatos("Ingrese el nombre a actualizar")
                const descripAtualizar = await leerDatos("Ingrese la descripcion a actualizar")
                const _precioActualizar = await leerDatos("Ingrese el precio a actualizar")
                const _cantidadActualizar = await leerDatos(" Ingrese la cantidad a actualizar")
                await productCtrl.actualizar({
                    id: +_idActualizar,
                    nombre: nombreActualizar,
                    descripcion: descripAtualizar,
                    precio: +_precioActualizar,
                    cantidad_disponible: +_cantidadActualizar,
                })
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
            case 6:
                // const _idActualizaCantidad = await leerDatos("Ingresar el id a actualizar");
                // const _cantidadActualizaCantidad = await leerDatos("Ingrese la nueva cantidad");
                // const idCantidad = Number(_idActualizaCantidad);
                // const cantidadActuali = Number(_cantidadActualizaCantidad);
                // if (isNaN(idCantidad) || isNaN(cantidadActuali)) {
                //     console.log("Por favor ingrese valores numéricos válidos");
                //     return;
                // }
                // await productCtrl.actualizarCantidad({
                //     id: idCantidad,
                //     cantidad_disponible: cantidadActuali,
                // });
            break;       
            default:
                console.log("Opcion no valida");                
                break;
        }
         _opcion = await leerDatos(menu);
         opcion = Number(_opcion);

    }
   
   rl.close();     
   return;    
}
