import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Producto } from "../../models/Producto";
import { getPoolConnection } from "./DataSource";

export class ProductoRepositorie{
    //Este metodo es con los tipos de datos explicitos
    async agregarProducto(producto: Producto): Promise<ResultSetHeader>{
        const connection: Pool = getPoolConnection();
        //muy importante el orden de los parametros
        const querySql: string = `INSERT INTO Product(nombre, descripcion, precio, cantidad_disponible) VALUES(?,?,?,?)`;
        const values: Array<string | number> = [producto.nombre, producto.descripcion, producto.precio, producto.cantidad_disponible];

        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    //este metodo es con los datos implicitos
    async obtenerProductos(){
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM Product`;
        const result = await connection.query(querySql);
        return result;
    }

    async obtenerProducto(idProducto: number): Promise<RowDataPacket[]>{
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM Product WHERE id = ?`;
        const values = [idProducto];
        const queryResul = await connection.query<RowDataPacket[]>(querySql, values);
        return queryResul[0];
    }

    async actualizarProducto(producto: Producto){
        const connection = getPoolConnection();
        const querySql = `UPDATE Product SET nombre = ?, descripcion = ?, precio = ?, cantidad_disponible = ? WHERE id = ?`;
        const values = [ 
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.cantidad_disponible,
            producto.id,
        ];
        const resul = await connection.query<ResultSetHeader>(querySql, values);
        return resul[0];
    }

    // async actualizarCantidadProduct(id: number, cantidad: number){
    //     const connection = getPoolConnection();
    //     const querySql = `UPDATE Product SET cantidad_disponible = ? WHERE id=?`;
    //     const values = [cantidad, id];
    //     const result = await connection.query<ResultSetHeader>(querySql, values);
    //     return result[0];
    // }

    async eliminarProducto(idProducto: number){
        const connection = getPoolConnection();
        const querySql = `DELETE FROM Product WHERE id = ?`;
        const values = [idProducto];
        const result = await connection.query(querySql, values);
        return result;
    }
}