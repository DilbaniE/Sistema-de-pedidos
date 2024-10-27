import { leerDatos, rl } from "./infrastructure/entry-points/input";
import { mainProduct } from "./infrastructure/entry-points/ProductoInput";
import { mainCategory } from "./infrastructure/entry-points/categoriaInput";


const main = async () =>{
    const menu = `
    1. Productos
    2. Categorías
    0. Salir
    `;
    let _opcion = await leerDatos(menu);
    let opcion = Number(_opcion);
    while (opcion !== 0) {
    switch (opcion) {
        case 1:
        await mainProduct();
        break;
        case 2:
        await mainCategory();
        break;
        default:
        console.log("Opcion no reconocida");
        break;
    }
    _opcion = await leerDatos(menu);
    opcion = Number(_opcion);
    }

    rl.close();
    return;
    
}
main()
    .then(() => {
        console.log("Fin script");
    })
    .finally(() => {
        rl.close();
        process.exit(0);
    });