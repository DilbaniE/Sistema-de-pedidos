import { RowDataPacket } from "mysql2";
import { ProductoRepositorie } from "./infrastructure/repositorios/ProductoRepositorie"
import { Producto } from "./models/Producto";

const productoRepositorie = new ProductoRepositorie();

const main = async () =>{
    const producto1 = new Producto({
        id: null,
        nombre: "Televisor SONY",
        descripcion: "Tv de 500 pulgadas",
        precio: 2300000,
        cantidad_disponible: 3
    });

   const result = await productoRepositorie.agregarProducto(producto1);
   console.log(result); 
   
   const product3: RowDataPacket[] = await productoRepositorie.obtenerProducto(2)
   if (product3.length > 0){
    //capturando el producto
        const jsonProduct3 = product3[0]
        //forma 1 casteo clase
        const productoTres = jsonProduct3 as Producto;
        // forma 2 json
        // const productoTres = new Producto({
        //     id: jsonProduct3.id,
        //     nombre: jsonProduct3.nombre,
        //     descripcion: jsonProduct3.descripcion,
        //     precio: jsonProduct3.precio,
        //     cantidad_disponible: jsonProduct3.cantidad_disponible,
        // })
        console.log(productoTres.id);
        //actualizar producto
        productoTres.nombre = "TV smart "
        productoTres.descripcion = "TV inteligente para el mundo"
        const resulActual = await productoRepositorie.actualizarProducto(productoTres)
   }
   //const resulUpdate = await productoRepositorie.actualizarProducto()
   const productos =await productoRepositorie.obtenerProductos();
   console.log(productos);
}
main();