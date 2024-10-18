import { Producto } from "../../models/Producto";
import { getPoolConnection } from "./DataSource";

export class ProductoRepositorie{
    
    async agregarProducto(producto: Producto){
        const connection = getPoolConnection();
        //muy importante el orden de los parametros
        const querySql = `INSERT INTO Product(nombre, descripcion, precio, cantidad_disponible) VALUES(?,?,?,?)`;
        const values = [producto.nombre, producto.descripcion, producto.precio, producto.cantidad_disponible];

        const result = await connection.query(querySql, values);
        return result;
    }

    async obtenerProductos(){
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM Product`;
        const result = await connection.query(querySql);
        return result;
    }
}