import { ProductoRepositorie } from "./infrastructure/repositorios/ProductoRepositorie"
import { Producto } from "./models/Producto";

const productoRepositorie = new ProductoRepositorie();
const producto1 = new Producto({
    id: null,
    nombre: "Televisor SONY",
    descripcion: "Tv de 500 pulgadas",
    precio: 2300000,
    cantidad_disponible: 3
});

const main = async () =>{
   const result = await productoRepositorie.agregarProducto(producto1);
   console.log(result);  

   const productos =await productoRepositorie.obtenerProductos();
   console.log(productos);
}
main();