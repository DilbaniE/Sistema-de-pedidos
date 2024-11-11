import { FieldPacket, Pool, ResultSetHeader,RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./DataSource";
import { Categoria } from "../../models/Categoria";

export class CatetegoriaRepository{
    async agregar(categoria: Categoria): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const querySql: string = `INSERT INTO category (id, nombre, descripcion) VALUES (?,?,?)`;
        const values: Array<string | number> = [categoria.id, categoria.nombre, categoria.descripcion];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }

    async obtener() : Promise<RowDataPacket[]>{
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM category`;
        const result = await connection.query<RowDataPacket[]>(querySql);
        return result[0];
      }

    async obtenerUno(id: string): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM category WHERE id = ?`;
        const values = [id];
        const queryResult = await connection.query<RowDataPacket[]>(querySql, values);
        return queryResult[0];
    }

    async modificar(categoria: Categoria) {
        const connection = getPoolConnection();
        const querySql = `UPDATE category SET nombre = ?, descripcion = ? WHERE id = ?`;
        const values = [categoria.nombre, categoria.descripcion, categoria.id];
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async eliminar(id: string): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `DELETE FROM category WHERE id = ?`;
        const values = [id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(querySql, values);
        return result[0];
    }
}